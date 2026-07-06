import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';

// Prevent multiple instances of Prisma Client in development
// (which can exhaust database connections when using Next.js / serverless auto-reloading)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
