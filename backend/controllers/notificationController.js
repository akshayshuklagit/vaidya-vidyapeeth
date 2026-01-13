import Notification from "../models/Notification.js";
import User from "../models/User.js";

// Get all notifications for a user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { userId: req.user.uid },
        { userId: null }, // Broadcast notifications
      ],
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error("Error in getNotifications:", error);
    res.status(500).json({ message: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Create notification
const createNotification = async (req, res) => {
  try {
    const { title, message, type, category, userId, data } = req.body;

    const notification = new Notification({
      userId: userId || null, // null for broadcast
      title,
      message,
      type: type || "info",
      category: category || "system",
      data: data || {},
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Send broadcast notification
const sendBroadcast = async (req, res) => {
  try {
    const { title, message, type, category } = req.body;

    if (!title || !message) {
      return res
        .status(400)
        .json({ message: "Title and message are required" });
    }

    const notification = new Notification({
      userId: null, // Broadcast to all users
      title,
      message,
      type: type || "info",
      category: category || "announcement",
      data: {},
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error sending broadcast:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
  getAllNotifications,
  sendBroadcast,
};
