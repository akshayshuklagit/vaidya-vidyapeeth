import Blog from "../models/Blog.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const filter = { status: "published" };

  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(filter).sort({ publishedAt: -1 });

  res.status(200).json({
    success: true,
    data: blogs,
  });
});

// @desc    Get blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: "Blog not found",
    });
  }

  blog.views += 1;
  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Get all blogs (Admin)
// @route   GET /api/admin/blogs
// @access  Private (Admin)
const getAdminBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: blogs,
  });
});

// @desc    Create blog
// @route   POST /api/admin/blogs
// @access  Private (Admin)
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags, status } = req.body;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const readTime = Math.ceil(content.split(" ").length / 200);

  const blogData = {
    title,
    slug,
    excerpt,
    content,
    category,
    tags: tags ? JSON.parse(tags) : [],
    readTime,
    status: status || "draft",
    author: {
      id: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
    },
  };

  if (req.file) {
    blogData.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  if (status === "published") {
    blogData.publishedAt = new Date();
  }

  const blog = await Blog.create(blogData);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// @desc    Update blog
// @route   PUT /api/admin/blogs/:id
// @access  Private (Admin)
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: "Blog not found",
    });
  }

  const { title, excerpt, content, category, tags, status } = req.body;

  if (title) {
    blog.title = title;
    blog.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (excerpt) blog.excerpt = excerpt;
  if (content) {
    blog.content = content;
    blog.readTime = Math.ceil(content.split(" ").length / 200);
  }
  if (category) blog.category = category;
  if (tags) blog.tags = JSON.parse(tags);

  if (status && status !== blog.status) {
    blog.status = status;
    if (status === "published" && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
  }

  if (req.file) {
    if (blog.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(blog.thumbnail.public_id);
    }
    blog.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Delete blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private (Admin)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      error: "Blog not found",
    });
  }

  if (blog.thumbnail?.public_id) {
    await cloudinary.uploader.destroy(blog.thumbnail.public_id);
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

export {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
