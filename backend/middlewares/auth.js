// import admin from 'firebase-admin';
import admin from "../config/firebaseAdmin.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided.",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user from database
    const User = (await import('../models/User.js')).default;
    const user = await User.findOne({ uid: decodedToken.uid });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }
    
    req.user = user; // Set full user object
    req.userRole = user.role || 'student';
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Insufficient permissions.",
      });
    }
    next();
  };
};

export { authenticate, authorize };
