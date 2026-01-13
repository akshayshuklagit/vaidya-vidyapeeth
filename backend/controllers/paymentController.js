import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { auditLogger, paymentLogger } from "../utils/logger.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order with idempotency and transaction safety
// @route   POST /api/payments/create
// @access  Private
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }

  const user = await User.findOne({ uid: req.user.uid });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  // Start database transaction for atomicity
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check for existing pending payment (idempotency)
    const existingPendingPayment = await Payment.findOne({
      userId: user._id,
      courseId: course._id,
      status: { $in: ["pending", "processing"] },
    }).session(session);

    if (existingPendingPayment) {
      await session.abortTransaction();
      auditLogger.duplicateAttempt(
        user._id,
        course._id,
        "Pending payment exists"
      );
      return res.status(400).json({
        success: false,
        error: "Payment already in progress for this course",
      });
    }

    // Check if already enrolled (prevent duplicate enrollments)
    const existingEnrollment = await Enrollment.findOne({
      userId: user._id,
      courseId: course._id,
    }).session(session);

    if (existingEnrollment) {
      await session.abortTransaction();
      auditLogger.duplicateAttempt(user._id, course._id, "Already enrolled");
      return res.status(400).json({
        success: false,
        error: "Already enrolled in this course",
      });
    }

    // Create unique receipt ID
    const receiptId = `rcpt_${Date.now()}`;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: course.price * 100, // Amount in paise
      currency: "INR",
      receipt: receiptId,
      notes: {
        courseId: course._id.toString(),
        userId: user._id.toString(),
        courseName: course.title,
        userEmail: user.email,
      },
    });

    // Create payment record in database
    const payment = await Payment.create(
      [
        {
          userId: user._id,
          courseId: course._id,
          amount: course.price,
          currency: "INR",
          paymentMethod: "upi",
          transactionId: razorpayOrder.id,
          razorpayOrderId: razorpayOrder.id,
          status: "pending",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    // Log successful payment order creation
    auditLogger.paymentCreated(
      user._id,
      course._id,
      course.price,
      razorpayOrder.id
    );

    res.status(201).json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        course: {
          id: course._id,
          title: course.title,
          price: course.price,
        },
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    paymentLogger.error("Payment order creation failed", error, {
      userId: user._id,
      courseId: course._id,
      userEmail: user.email,
    });

    // Handle Razorpay API errors
    if (error.statusCode) {
      return res.status(400).json({
        success: false,
        error: `Payment gateway error: ${
          error.error?.description || "Unknown error"
        }`,
      });
    }

    throw error;
  } finally {
    session.endSession();
  }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Verify signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      error: "Payment verification failed",
    });
  }

  // Find payment record
  const payment = await Payment.findOne({ transactionId: razorpay_order_id });
  if (!payment) {
    return res.status(404).json({
      success: false,
      error: "Payment record not found",
    });
  }

  // Update payment status
  payment.status = "completed";
  payment.gatewayResponse = {
    ...payment.gatewayResponse,
    razorpay_payment_id,
    razorpay_signature,
  };
  await payment.save();

  // Create enrollment
  const enrollment = await Enrollment.create({
    userId: payment.userId,
    courseId: payment.courseId,
    paymentId: payment._id,
  });

  // Update course student count
  await Course.findByIdAndUpdate(payment.courseId, {
    $inc: { students: 1 },
  });

  // Populate course details for response
  const course = await Course.findById(payment.courseId);

  res.status(200).json({
    success: true,
    message: "Payment verified and enrollment completed",
    data: {
      payment,
      enrollment,
      course: {
        id: course._id,
        title: course.title,
        price: course.price,
      },
    },
  });
});

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  const payments = await Payment.find({ userId: user._id })
    .populate("courseId", "title thumbnail")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: payments,
  });
});

// @desc    Get all payments (Admin)
// @route   GET /api/admin/payments
// @access  Private (Admin)
const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .populate("userId", "name email")
    .populate("courseId", "title price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: payments,
  });
});

// @desc    Get user enrollments
// @route   GET /api/payments/enrollments
// @access  Private
const getUserEnrollments = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  const enrollments = await Enrollment.find({ userId: user._id })
    .populate("courseId", "title thumbnail price category level")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: enrollments,
  });
});

export {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getAllPayments,
  getUserEnrollments,
};
