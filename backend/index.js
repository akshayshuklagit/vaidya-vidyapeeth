import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import "./config/firebaseAdmin.js";
import { generalRateLimit } from "./middlewares/rateLimiter.js";
import { validateEnvironment } from "./middlewares/envValidation.js";

// Validate environment variables at startup
validateEnvironment();

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aboutRotes from "./routes/aboutRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import zoomRoutes from "./routes/zoomRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Webhook routes MUST come before express.json() middleware
// Razorpay webhooks need raw body
app.use("/api/webhooks", webhookRoutes);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(morgan("combined"));

// Apply general rate limiting to all routes
app.use(generalRateLimit);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/about", aboutRotes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/zoom", zoomRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Vaidya Vidyapeeth API is running!" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
