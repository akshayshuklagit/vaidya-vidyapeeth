import express from "express";
import {
  getCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  getAdminCourses,
} from "../controllers/courseController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const courseRouter = express.Router();

// Admin routes - MUST be before /:id route
courseRouter.get("/admin", authenticate, authorize("admin"), getAdminCourses);
courseRouter.post(
  "/admin",
  authenticate,
  authorize("admin"),
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  createCourse
);
courseRouter.put(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  updateCourse
);
// courseRouter.post("/admin", authenticate, authorize("admin"), createCourse);
// courseRouter.put("/admin/:id", authenticate, authorize("admin"), updateCourse);
courseRouter.delete(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  deleteCourse
);

// Public routes
courseRouter.get("/", getCourses);
courseRouter.get("/slug/:slug", getCourseBySlug);
courseRouter.get("/:id", getCourseById);

export default courseRouter;
