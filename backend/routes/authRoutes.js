import express from 'express';
import {
  syncUser,
  verifyToken,
  logout
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/sync-user', syncUser);
router.post('/verify-token', verifyToken);
router.post('/logout', authenticate, logout);

export default router;