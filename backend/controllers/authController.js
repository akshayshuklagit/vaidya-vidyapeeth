import User from "../models/User.js";
import admin from "../config/firebaseAdmin.js";
import asyncHandler from "../middlewares/asyncHandler.js";

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

  // Verify Firebase token
  const decodedToken = await admin.auth().verifyIdToken(token);
  const { uid, email, picture, name: firebaseName } = decodedToken;

  // Check if user exists
  let user = await User.findOne({ uid });

  if (!user) {
    // Create new user
    user = await User.create({
      uid,
      email,
      name: name || decodedToken.name || "User",
      role: "student",
      avatar: picture || null,
    });
  }
  if (!user.avatar && picture) {
    user.avatar = picture;
    await user.save();
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

export { syncUser, verifyToken };
