import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import admin from "../config/firebaseAdmin.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const updates = {};

  // Top-level fields
  if (req.body.name !== undefined) {
    updates.name = req.body.name;
  }

  if (req.body.phone !== undefined) {
    updates.phone = req.body.phone;
  }

  if (req.body.dateOfBirth !== undefined) {
    updates.dateOfBirth = req.body.dateOfBirth;
  }

  if (req.body.address !== undefined) {
    updates.address = req.body.address;
  }

  // Nested field
  if (req.body.bio !== undefined) {
    updates["profile.bio"] = req.body.bio;
  }

  const user = await User.findOneAndUpdate(
    { uid: req.user.uid },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      user: user,
    },
  });
});

// @desc    Get dashboard data
// @route   GET /api/users/dashboard
// @access  Private
const getDashboard = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  // Get real enrollment data
  const enrollments = await Enrollment.find({ userId: user._id })
    .populate({
      path: 'courseId',
      select: 'title thumbnail icon price category level',
      match: { _id: { $ne: null } } // Only populate non-null courses
    })
    .sort({ createdAt: -1 });

  // Filter out enrollments with null courseId
  const validEnrollments = enrollments.filter(e => e.courseId);

  // Get real payment data
  const payments = await Payment.find({ userId: user._id })
    .populate('courseId', 'title')
    .sort({ createdAt: -1 })
    .limit(5);

  // Calculate stats
  const enrolledCourses = validEnrollments.length;
  const completedCourses = validEnrollments.filter(e => e.progress?.percentage === 100).length;
  const totalProgress = validEnrollments.reduce((sum, e) => sum + (e.progress?.timeSpent || 0), 0);

  // Format courses data
  const courses = validEnrollments.map(enrollment => ({
    id: enrollment.courseId._id,
    title: enrollment.courseId.title,
    progress: enrollment.progress?.percentage || 0,
    thumbnail: enrollment.courseId.icon || '📚',
    totalLessons: 20, // Default for now
    completedLessons: Math.round((enrollment.progress?.percentage || 0) * 20 / 100),
    category: enrollment.courseId.category,
    level: enrollment.courseId.level
  }));

  // Format payments data
  const formattedPayments = payments.map(payment => ({
    id: payment._id,
    course: payment.courseId?.title || 'Unknown Course',
    amount: `₹${payment.amount}`,
    date: new Date(payment.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    status: payment.status === 'completed' ? 'Completed' : payment.status
  }));

  // Mock notifications for now
  const notifications = [
    {
      id: 1,
      text: "Welcome to Vaidya Vidyapeeth! Start your Ayurveda journey.",
      time: "1 day ago",
    },
    {
      id: 2,
      text: "Complete your profile to get personalized recommendations",
      time: "2 days ago",
    }
  ];

  const dashboardData = {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    stats: {
      enrolledCourses,
      completedCourses,
      totalProgress: Math.round(totalProgress / 60), // Convert minutes to hours
    },
    courses,
    notifications,
    payments: formattedPayments,
  };

  res.status(200).json({
    success: true,
    data: dashboardData,
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ uid: req.user.uid });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// @desc    Get enrolled courses
// @route   GET /api/users/enrolled-courses
// @access  Private
const getEnrolledCourses = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  const enrollments = await Enrollment.find({ 
    userId: user._id, 
    status: 'active' 
  }).populate({
    path: 'courseId',
    select: 'title thumbnail icon price category level',
    match: { _id: { $ne: null } }
  });

  // Filter out enrollments with null courseId
  const validEnrollments = enrollments.filter(e => e.courseId);
  const courses = validEnrollments.map(enrollment => enrollment.courseId);

  res.status(200).json({
    success: true,
    data: courses,
  });
});

// @desc    Update course progress
// @route   PUT /api/users/progress/:enrollmentId
// @access  Private
const updateProgress = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;
  const { lessonId, completed } = req.body;

  const enrollment = await Enrollment.findById(enrollmentId);
  
  if (!enrollment) {
    return res.status(404).json({
      success: false,
      error: 'Enrollment not found'
    });
  }

  // Update progress
  if (completed) {
    enrollment.progress.completedLessons += 1;
    const Course = (await import('../models/Course.js')).default;
    const course = await Course.findById(enrollment.courseId);
    const totalLessons = course.syllabus?.length || 1;
    enrollment.progress.percentage = Math.round((enrollment.progress.completedLessons / totalLessons) * 100);
  }

  await enrollment.save();
  
  res.status(200).json({
    success: true,
    data: enrollment
  });
});

export { getProfile, updateProfile, getDashboard, deleteAccount, getEnrolledCourses, updateProgress };
