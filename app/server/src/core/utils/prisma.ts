import { PrismaClient } from '@app/prisma';

// Prisma client must be a singleton
let _prisma: PrismaClient | null = null;

export function getPrismaClient() {
    const prisma = _prisma ?? new PrismaClient();
    if (!prisma) _prisma = prisma;
    return prisma;
}
