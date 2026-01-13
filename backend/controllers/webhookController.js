import crypto from "crypto";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import mongoose from "mongoose";
import { auditLogger, paymentLogger } from "../utils/logger.js";

// @desc    Handle Razorpay webhook
// @route   POST /api/webhooks/razorpay
// @access  Public (but verified)
const handleRazorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const body = req.body;

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    paymentLogger.security("Webhook signature verification failed", {
      receivedSignature: signature,
      expectedLength: expectedSignature.length,
      bodyLength: body.length,
    });
    return res.status(400).json({ error: "Invalid signature" });
  }

  const event = JSON.parse(body);

  try {
    switch (event.event) {
      case "payment.captured":
        await processPaymentSuccess(event.payload.payment.entity);
        break;
      case "payment.failed":
        await processPaymentFailure(event.payload.payment.entity);
        break;
      case "order.paid":
        await processOrderPaid(event.payload.order.entity);
        break;
      default:
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }

  res.status(200).send("OK");
});

// Process successful payment
const processPaymentSuccess = async (paymentEntity) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find payment record by order ID
    const payment = await Payment.findOne({
      transactionId: paymentEntity.order_id,
    }).session(session);

    if (!payment) {
      console.error(
        "Payment record not found for order:",
        paymentEntity.order_id
      );
      await session.abortTransaction();
      return;
    }

    // Prevent duplicate processing
    if (payment.status === "completed") {
      await session.commitTransaction();
      return;
    }

    // Update payment record
    payment.status = "completed";
    payment.razorpayPaymentId = paymentEntity.id;
    payment.paymentMethod = paymentEntity.method;
    await payment.save({ session });

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      userId: payment.userId,
      courseId: payment.courseId,
    }).session(session);

    if (!existingEnrollment) {
      // Create enrollment
      await Enrollment.create(
        [
          {
            userId: payment.userId,
            courseId: payment.courseId,
            paymentId: payment._id,
            status: "active",
          },
        ],
        { session }
      );

      // Update course student count
      await Course.findByIdAndUpdate(
        payment.courseId,
        { $inc: { students: 1 } },
        { session }
      );
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error("Error processing payment success:", error);
    throw error;
  } finally {
    session.endSession();
  }
};

// Process failed payment
const processPaymentFailure = async (paymentEntity) => {
  try {
    const payment = await Payment.findOne({
      transactionId: paymentEntity.order_id,
    });

    if (payment && payment.status !== "failed") {
      payment.status = "failed";
      payment.razorpayPaymentId = paymentEntity.id;
      await payment.save();
    }
  } catch (error) {
    console.error("Error processing payment failure:", error);
    throw error;
  }
};

// Process order paid (backup handler)
const processOrderPaid = async (orderEntity) => {
  // This is a backup in case payment.captured is missed
  // Implementation similar to processPaymentSuccess
};

export { handleRazorpayWebhook };
