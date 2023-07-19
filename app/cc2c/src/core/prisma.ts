import { PrismaClient } from '@local/__generated__/prisma';
export * from '@local/__generated__/prisma';

const globalForPrisma = global as unknown as {
    prisma?: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
