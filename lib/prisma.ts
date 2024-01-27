import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton
 * @see https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    globalThis['prisma'] = globalThis['prisma'] || new PrismaClient();
    prisma = globalThis['prisma'];
}

export default prisma;