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
import { authenticate } from '../middleware/authenticate';

const router: Router = Router();

// Strict rate limit on all auth routes (5 req / 15 min per IP)
router.use(authRateLimiter);

router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh); // reads httpOnly cookie, no body
router.post('/logout', logout); // reads httpOnly cookie, no body
router.post('/activate', validate(activateAccountSchema), activateAccount);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
