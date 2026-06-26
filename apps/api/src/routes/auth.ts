// Path: apps/api/src/routes/auth.ts

import { Router } from 'express';
import { validate } from '../middleware/validate';
import { authRateLimiter } from '../middleware/rateLimiter';
import {
  loginSchema,
  activateAccountSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';
import {
  login,
  refresh,
  logout,
  activateAccount,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';

const router = Router();

// Strict rate limit on all auth routes (5 req / 15 min per IP)
router.use(authRateLimiter);

router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh); // reads httpOnly cookie, no body
router.post('/logout', logout); // reads httpOnly cookie, no body
router.post('/activate', validate(activateAccountSchema), activateAccount);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
