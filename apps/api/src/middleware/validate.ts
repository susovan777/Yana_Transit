// Path: apps/api/src/middleware/validate.ts
//
// Request validation using Zod schemas.
//
// Zod lets you define the exact shape a request body
// must have. If it doesn't match, we reject it with
// a clear 400 error before it ever reaches the route.
//
// Usage in a route:
//   import { validate } from '../middleware/validate';
//   import { z } from 'zod';
//
//   const createBookingSchema = z.object({
//     carId: z.string().uuid(),
//     startDate: z.string().datetime(),
//   });
//
//   router.post('/', validate(createBookingSchema), createBooking);

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Format Zod errors into human-readable messages
      const errors = (result.error as ZodError).errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          fields: errors,
        },
      });
      return;
    }

    // Attach parsed (type-safe) body to request
    req.body = result.data;
    next();
  };
