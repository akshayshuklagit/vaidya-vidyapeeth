import express from 'express';
import { handleRazorpayWebhook } from '../controllers/webhookController.js';

const webhookRouter = express.Router();

// Razorpay webhook - must be raw body
webhookRouter.post('/razorpay', express.raw({ type: 'application/json' }), handleRazorpayWebhook);

export default webhookRouter;