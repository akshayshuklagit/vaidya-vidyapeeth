import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getUserEnrollments
} from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/auth.js';
import { paymentRateLimit, paymentSpeedLimit } from '../middlewares/rateLimiter.js';

const paymentRouter = express.Router();

// Apply authentication to all routes
paymentRouter.use(authenticate);

// Apply rate limiting to payment creation and verification
paymentRouter.post('/create', paymentRateLimit, paymentSpeedLimit, createPaymentOrder);
paymentRouter.post('/verify', paymentRateLimit, verifyPayment);

// Regular routes without strict rate limiting
paymentRouter.get('/history', getPaymentHistory);
paymentRouter.get('/enrollments', getUserEnrollments);

export default paymentRouter;