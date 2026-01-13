import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select("-__v")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

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

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// @desc    Change user role
// @route   POST /api/admin/users/:id/role
// @access  Private (Admin only)
const changeUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!["student", "admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      error: "Invalid role",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
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
    data: user,
  });
});

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

  const dashboardData = {
    stats: {
      totalUsers,
      totalStudents,
      totalAdmins,
      totalCourses: 12,
      totalRevenue: 125000,
      activeEnrollments: 45,
    },
    recentUsers,
    recentActivity: [
      {
        id: 1,
        action: "New user registered",
        user: "adi",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Course completed",
        user: "Jane Smith",
        time: "4 hours ago",
      },
      {
        id: 3,
        action: "Payment received",
        user: "Mike Johnson",
        time: "6 hours ago",
      },
      { id: 4, action: "New course created", user: "Admin", time: "1 day ago" },
      {
        id: 5,
        action: "User profile updated",
        user: "Sarah Wilson",
        time: "2 days ago",
      },
    ],
    monthlyStats: {
      newUsers: 28,
      courseCompletions: 15,
      revenue: 45000,
    },
  };

  res.status(200).json({
    success: true,
    data: dashboardData,
  });
});

// @desc    Enroll user in course for free
// @route   POST /api/admin/enroll-user
// @access  Private (Admin only)
const enrollUserInCourse = asyncHandler(async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({
      success: false,
      error: 'User ID and Course ID are required'
    });
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Check if course exists
  const Course = (await import('../models/Course.js')).default;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Check if already enrolled
  const Enrollment = (await import('../models/Enrollment.js')).default;
  const existingEnrollment = await Enrollment.findOne({ userId, courseId });
  if (existingEnrollment) {
    return res.status(400).json({
      success: false,
      error: 'User already enrolled in this course'
    });
  }

  // Create enrollment
  const enrollment = new Enrollment({
    userId,
    courseId,
    enrollmentDate: new Date(),
    status: 'active',
    progress: {
      completedLessons: 0,
      totalLessons: course.resources?.length || 0,
      percentage: 0,
      timeSpent: 0
    },
    paymentId: 'ADMIN_ENROLLED' // Mark as admin enrolled
  });

  await enrollment.save();
  
  res.status(201).json({
    success: true,
    message: 'User enrolled successfully',
    data: enrollment
  });
});

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  getAdminDashboard,
  enrollUserInCourse,
};
