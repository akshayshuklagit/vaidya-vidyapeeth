import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);

// Admin routes
blogRouter.get("/admin/all", authenticate, authorize("admin"), getAdminBlogs);
blogRouter.post(
  "/admin",
  authenticate,
  authorize("admin"),
  upload.single("thumbnail"),
  createBlog
);
blogRouter.put(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  upload.single("thumbnail"),
  updateBlog
);
blogRouter.delete("/admin/:id", authenticate, authorize("admin"), deleteBlog);

export default blogRouter;
