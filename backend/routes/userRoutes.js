import express from "express";
import {
  getProfile,
  updateProfile,
  getDashboard,
  deleteAccount,
  getEnrolledCourses,
  updateProgress,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";

const userRouter = express.Router();

// All routes require authentication
userRouter.use(authenticate);

userRouter.route("/profile").get(getProfile).put(updateProfile);

userRouter.get("/dashboard", getDashboard);
userRouter.get("/enrolled-courses", getEnrolledCourses);
userRouter.put("/progress/:enrollmentId", updateProgress);
userRouter.delete("/account", deleteAccount);

export default userRouter;
