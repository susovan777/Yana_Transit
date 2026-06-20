// Path: apps/api/src/middleware/rateLimiter.ts

import rateLimit from 'express-rate-limit';

// ── Global limiter ──────────────────────────────────────────────────
// 100 requests per 15 minutes per IP
// Enough for normal users, blocks bots
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true, // Return RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again after 15 minutes.',
  },
});

// ── Auth limiter ────────────────────────────────────────────────────
// 5 OTP requests per 10 minutes per IP
// Prevents SMS bombing (each OTP costs money via MSG91)
export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many OTP requests. Please wait 10 minutes before trying again.',
  },
});
