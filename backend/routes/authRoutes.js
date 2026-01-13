import express from 'express';
import {
  syncUser,
  verifyToken
} from '../controllers/authController.js';

const router = express.Router();

router.post('/sync-user', syncUser);
router.post('/verify-token', verifyToken);

export default router;