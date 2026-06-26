// Path: apps/api/src/app.ts

import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import { corsOptions } from './middleware/cors';
import { globalRateLimiter } from './middleware/rateLimiter';
import { errorHandler, notFound } from './middleware/errorHandler';

// ── Route imports (add as you build each) ──────────────────────────
import carsRouter from './routes/cars';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
// import bookingsRouter from './routes/bookings'; // Phase 2
// import paymentsRouter from './routes/payments'; // Phase 2

const app: Express = express();

// ── Security headers ────────────────────────────────────────────────
// helmet sets ~15 HTTP headers that protect against common attacks
// e.g. XSS, clickjacking, MIME sniffing
app.use(helmet());

// ── CORS ────────────────────────────────────────────────────────────
// Controls which frontends (origins) can call this API.
// Config lives in middleware/cors.ts
app.use(cors(corsOptions));

// ── Body parsing ────────────────────────────────────────────────────
// Parse incoming JSON request bodies (max 10kb — prevents abuse)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Cookie parsing ────────────────────────────────────────────────────
// Auth reads req.cookies
app.use(cookieParser());

// ── Compression ─────────────────────────────────────────────────────
// Gzip responses — reduces payload size by ~70% for JSON
app.use(compression());

// ── Request logging ─────────────────────────────────────────────────
// 'dev' format: GET /api/cars 200 12ms
// 'combined' format for production: full Apache-style logs
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Rate limiting ───────────────────────────────────────────────────
// Prevents API abuse — 100 requests per 15 minutes per IP
app.use('/api', globalRateLimiter);

// ── Health check ────────────────────────────────────────────────────
// Railway and monitoring tools ping this to check if API is alive
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'yaana-transit-api',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? 'development',
  });
});

// ── API routes ──────────────────────────────────────────────────────
app.use('/api/cars', carsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
// app.use('/api/bookings', bookingsRouter);
// app.use('/api/payments', paymentsRouter);

// ── 404 — route not found ───────────────────────────────────────────
app.use(notFound);

// ── Global error handler ────────────────────────────────────────────
// Must be LAST and must have 4 params (err, req, res, next)
// Catches errors thrown anywhere in the app
app.use(errorHandler);

// ── Start server ────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────────┐
  │   🚗  YAANA Transit API                         │
  │   Port     : ${PORT}                               │
  │   Env      : ${
    process.env.NODE_ENV ?? 'development'
  }                        │
  │   Health   : http://localhost:${PORT}/health       │
  └─────────────────────────────────────────────────┘
  `);
});

export default app;
