// Path: apps/api/src/middleware/rateLimiter.ts

import rateLimit from 'express-rate-limit';

// ── Global limiter ──────────────────────────────────────────────────
// 100 requests per 15 minutes per IP
// Enough for normal users, blocks bots
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again after 15 minutes.',
  },
});

// ── Auth limiter ────────────────────────────────────────────────────
// 5 requests per 15 minutes per IP on all /api/auth/* routes.
// Prevents brute-force login attempts and invitation token probing.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only count failed/errored requests
  message: {
    success: false,
    error: 'Too many attempts. Please wait 15 minutes before trying again.',
  },
});