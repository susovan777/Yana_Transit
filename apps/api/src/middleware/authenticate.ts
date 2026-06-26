// Path: apps/api/src/middleware/authenticate.ts
//
// Verifies the JWT access token on every protected route.
// Attaches the decoded user payload to req.user so controllers
// can use req.user.userId, req.user.role, req.user.companyId
// without hitting the database on every request.
//
// Usage:
//   import { authenticate } from '../middleware/authenticate';
//   router.get('/profile', authenticate, getProfile);

import { Request, Response, NextFunction } from 'express';
import {
  verifyAccessToken,
  AccessTokenPayload,
} from '../services/token.service';
import { AppError } from './errorHandler';

// ── Extend Express Request type ───────────────────────────────────────
// This tells TypeScript that req.user exists after authenticate runs.
// Without this, TypeScript would complain about req.user being unknown.
declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

// ── authenticate middleware ───────────────────────────────────────────

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    // Token must arrive as: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Please log in.', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError('Authentication token is missing.', 401);
    }

    // verifyAccessToken throws if token is expired or invalid
    const payload = verifyAccessToken(token);
    req.user = payload;

    next();
  } catch (err) {
    // Convert JWT errors into friendly AppErrors
    if (err instanceof Error) {
      if (err.name === 'TokenExpiredError') {
        return next(new AppError('Session expired. Please log in again.', 401));
      }
      if (err.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid authentication token.', 401));
      }
    }
    next(err);
  }
}
