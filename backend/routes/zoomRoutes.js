import express from "express";
import {
  createMeeting,
  getCourseMeetings,
  startMeeting,
  joinMeeting,
} from "../controllers/zoomController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const zoomRouter = express.Router();

// Apply authentication to all routes
zoomRouter.use(authenticate);

// Admin / Host
zoomRouter.post("/meetings", authorize("admin"), createMeeting);
zoomRouter.post("/meetings/:id/start", startMeeting);

// Student / Common
zoomRouter.get("/courses/:courseId/meetings", getCourseMeetings);

// 🔥 JOIN → POST ONLY
zoomRouter.post("/meetings/:id/join", joinMeeting);

export default zoomRouter;
