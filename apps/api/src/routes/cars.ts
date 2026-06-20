// Path: apps/api/src/routes/cars.ts
//
// Cars REST API — public endpoints (no auth required).
//
// Endpoints:
//   GET  /api/cars          — list all cars (with optional filters)
//   GET  /api/cars/:id      — single car detail

import { z } from 'zod';
import prisma from '../lib/prisma';
import { Router, Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler';
import { catchAsync } from '../middleware/errorHandler';

const router: Router = Router();

// ── Query params schema for GET /api/cars ───────────────────────────
const carsQuerySchema = z.object({
  category: z.enum(['economy', 'sedan', 'suv', 'luxury']).optional(),
  city: z.string().optional(),
  available: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('12'),
});

// ── GET /api/cars ────────────────────────────────────────────────────
// Returns paginated list of cars with optional filters.
// Public — no authentication needed.
router.get(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    // Validate + parse query params
    const query = carsQuerySchema.parse(req.query);
    const skip = (query.page - 1) * query.limit;

    // Build Prisma where clause dynamically
    const where = {
      ...(query.category && { category: query.category }),
      ...(query.available !== undefined && { available: query.available }),
    };

    // Run count + data queries in parallel for performance
    const [total, cars] = await Promise.all([
      prisma.car.count({ where }),
      prisma.car.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { pricePerDay: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          typeLabel: true,
          seats: true,
          transmission: true,
          fuel: true,
          pricePerDay: true,
          pricePerKm: true,
          selfDrivePrice: true,
          badge: true,
          badgeStyle: true,
          features: true,
          images: true,
          available: true,
        },
      }),
    ]);

    res.json({
      success: true,
      data: cars,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  })
);

// ── GET /api/cars/:id ────────────────────────────────────────────────
// Returns single car by slug (e.g. "innova-crysta").
// Used for car detail pages and booking flow.
router.get(
  '/:slug',
  catchAsync(async (req: Request, res: Response) => {
    const car = await prisma.car.findUnique({
      where: { slug: req.params.slug },
    });

    if (!car) {
      throw new AppError(`Car '${req.params.slug}' not found`, 404);
    }

    res.json({
      success: true,
      data: car,
    });
  })
);

export default router;
