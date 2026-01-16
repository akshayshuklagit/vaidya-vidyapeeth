import User from "../models/User.js";
import admin from "../config/firebaseAdmin.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import crypto from "crypto";

// @desc    Sync user with Firebase
// @route   POST /api/auth/sync-user
// @access  Public
const syncUser = asyncHandler(async (req, res) => {
  const { token, name } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    });
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, picture } = decodedToken;

    // Check by uid first, then by email
    let user = await User.findOne({ uid });
    
    if (!user) {
      // Check if user exists with same email but different uid
      user = await User.findOne({ email });
      
      if (user) {
        // Update existing user's uid
        user.uid = uid;
      } else {
        // Create new user
        user = await User.create({
          uid,
          email,
          name: name || decodedToken.name || "User",
          role: "student",
          avatar: picture || null,
        });
      }
    }

    // 🔐 CREATE NEW SESSION (IMPORTANT)
    const sessionId = crypto.randomUUID();
    user.sessionId = sessionId;

    // Sync avatar if missing
    if (!user.avatar && picture) {
      user.avatar = picture;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
        token,
        sessionId,
      },
    });
  } catch (error) {
    console.error('❌ Sync user error:', error);
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to sync user",
    });
  }
});

// @desc    Verify token
// @route   POST /api/auth/verify-token
// @access  Public
const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    });
  }

  const decodedToken = await admin.auth().verifyIdToken(token);
  const user = await User.findOne({ uid: decodedToken.uid });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    },
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.user.uid });

  if (user) {
    user.sessionId = null;
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export { syncUser, verifyToken, logout };
