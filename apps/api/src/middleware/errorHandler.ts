// Path: apps/api/src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

// ── Custom error class ──────────────────────────────────────────────
// Extends native Error with an HTTP status code.
// Usage: throw new AppError('Car not found', 404)
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true // operational = expected error (404, 400 etc)
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// ── 404 handler — must be AFTER all routes ──────────────────────────
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route '${req.originalUrl}' not found`, 404));
};

// ── Global error handler ────────────────────────────────────────────
// Must have 4 parameters — Express identifies it as error middleware
export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default to 500 if no status code set
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError ? err.isOperational : false;

  // Log stack trace in development only
  if (process.env.NODE_ENV === 'development') {
    console.error('🔴 Error:', err);
  } else if (!isOperational) {
    // Log unexpected errors in production (these need investigation)
    console.error('🔴 Unexpected error:', err.message);
  }

  // Consistent error response shape — frontend always knows what to expect
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      // Only include stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

// ── Async wrapper ───────────────────────────────────────────────────
// Wraps async route handlers so you don't need try/catch in every route.
//
// Instead of:
//   router.get('/', async (req, res, next) => {
//     try { ... } catch(e) { next(e) }
//   })
//
// You write:
//   router.get('/', catchAsync(async (req, res) => { ... }))
//
// Any thrown error automatically goes to errorHandler above.
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
