import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import slowDown from "express-slow-down";

/**
 * Generate rate-limit key:
 * - Logged-in users → user UID
 * - Anonymous / webhooks → IPv6-safe IP key
 */
const userOrIpKey = (req) => {
  if (req.user?.uid) {
    return `user:${req.user.uid}`;
  }
  return `ip:${ipKeyGenerator(req)}`;
};

// 🔐 Rate limiter for payment creation
export const paymentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    error: "Too many payment attempts. Please try again later.",
  },
  keyGenerator: userOrIpKey,
});

// 🐢 Progressive slowdown for payment abuse
export const paymentSpeedLimit = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 2,
  delayMs: () => 500,
  maxDelayMs: 20000,
  keyGenerator: userOrIpKey,
});

// 🌐 General API rate limiter
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
  keyGenerator: (req) => ipKeyGenerator(req),
});

// 🔔 Razorpay webhook rate limiter
export const webhookRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: false,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Webhook rate limit exceeded",
  },
  keyGenerator: (req) => ipKeyGenerator(req),
});
