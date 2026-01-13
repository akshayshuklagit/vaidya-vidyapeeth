import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
  getAllNotifications,
  sendBroadcast,
} from "../controllers/notificationController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

// User routes
router.get("/", authenticate, getNotifications);
router.put("/:id/read", authenticate, markAsRead);
router.delete("/:id", authenticate, deleteNotification);

// Admin routes
router.post("/", authenticate, authorize('admin'), createNotification);
router.get("/admin/all", authenticate, authorize('admin'), getAllNotifications);
router.post("/broadcast", authenticate, authorize('admin'), sendBroadcast);

export default router; // ✅ ES Module export
