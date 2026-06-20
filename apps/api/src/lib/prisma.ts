// Path: apps/api/src/lib/prisma.ts
//
// Singleton Prisma client.
//
// Why singleton? In development, Next.js/tsx hot-reloads
// the module on every file save. Without this pattern,
// you'd create a NEW database connection on every reload
// and quickly exhaust Postgres's connection pool (default: 100).
//
// This pattern creates ONE client and reuses it. 

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn'] // log all SQL in dev
        : ['error'], // only errors in production
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
