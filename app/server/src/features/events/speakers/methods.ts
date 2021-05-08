import { PrismaClient } from '@app/prisma';

export function speakerById(prisma: PrismaClient) {}

export function speakerAccount(userId: string, prisma: PrismaClient) {
    return prisma.user.findUnique({ where: { userId } });
}
