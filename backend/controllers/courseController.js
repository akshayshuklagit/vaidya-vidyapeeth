import Course from "../models/Course.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const { category, level, search } = req.query;
  const filter = { status: "published" };

  if (category) filter.category = category;
  if (level) filter.level = level;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const courses = await Course.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: courses,
  });
});

// @desc    Get course by slug
// @route   GET /api/courses/slug/:slug
// @access  Public
const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  // Check if ID is valid ObjectId
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid course ID format",
    });
  }

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Process syllabus to extract video IDs
const processSyllabus = (syllabus) => {
  if (!Array.isArray(syllabus)) return syllabus;

  return syllabus.map((module) => {
    let videoId = null;

    // Case 1: direct videoUrl
    if (module.videoUrl) {
      videoId = extractYouTubeId(module.videoUrl);
      delete module.videoUrl;
    }

    // Case 2: video inside topics[]
    if (!videoId && Array.isArray(module.topics)) {
      const yt = module.topics.find(
        (t) => typeof t === "string" && t.includes("youtube")
      );

      if (yt) {
        videoId = extractYouTubeId(yt);
        module.topics = module.topics.filter((t) => t !== yt);
      }
    }

    if (videoId) {
      module.videoId = videoId;
    }

    return module;
  });
};

// @desc    Create course (Admin only)
// @route   POST /api/admin/courses
// @access  Private (Admin)
const createCourse = asyncHandler(async (req, res) => {
  // 🔴 REQUIRED: Parse FormData JSON fields
  if (req.body.features) {
    req.body.features = JSON.parse(req.body.features);
  }

  if (req.body.syllabus) {
    req.body.syllabus = JSON.parse(req.body.syllabus);
    req.body.syllabus = processSyllabus(req.body.syllabus); // Process video URLs
  }

  if (req.body.tags) {
    req.body.tags = JSON.parse(req.body.tags);
  }

  // 🔴 Remove empty syllabus modules
  if (Array.isArray(req.body.syllabus)) {
    req.body.syllabus = req.body.syllabus.filter(
      (m) => m.module && m.module.trim()
    );
  }

  // Auto-generate slug
  if (!req.body.slug && req.body.title) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Thumbnail upload
  if (req.files?.thumbnail) {
    req.body.thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  } else {
    delete req.body.thumbnail; // prevent string overwrite
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});
// @desc    Update course (Admin only)
// @route   PUT /api/admin/courses/:id
// @access  Private (Admin)
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }

  // 🔴 REQUIRED: Parse FormData JSON fields
  if (req.body.features) {
    req.body.features = JSON.parse(req.body.features);
  }

  if (req.body.syllabus) {
    req.body.syllabus = JSON.parse(req.body.syllabus);
    req.body.syllabus = processSyllabus(req.body.syllabus); // Process video URLs
  }

  if (req.body.tags) {
    req.body.tags = JSON.parse(req.body.tags);
  }

  // 🔴 Remove empty syllabus modules
  if (Array.isArray(req.body.syllabus)) {
    req.body.syllabus = req.body.syllabus.filter(
      (m) => m.module && m.module.trim()
    );
  }

  // Replace thumbnail
  if (req.files?.thumbnail) {
    if (course.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(course.thumbnail.public_id);
    }

    req.body.thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  } else {
    delete req.body.thumbnail;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedCourse,
  });
});

// @desc    Delete course (Admin only)
// @route   DELETE /api/admin/courses/:id
// @access  Private (Admin)
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

// @desc    Get admin courses
// @route   GET /api/admin/courses
// @access  Private (Admin)
const getAdminCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: courses,
  });
});

export {
  getCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  getAdminCourses,
};
