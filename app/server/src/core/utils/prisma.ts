import type { FastifyBaseLogger } from 'fastify';

import { PrismaClient } from '@local/__generated__/prisma';

// Prisma client must be a singleton
let _prisma: PrismaClient | null = null;

export function getPrismaClient(logger: FastifyBaseLogger) {
    const prisma = _prisma ?? new PrismaClient();
    if (!_prisma) {
        logger.debug('Instantiating new prisma client.');
        _prisma = prisma;
    }
    return prisma;
}
