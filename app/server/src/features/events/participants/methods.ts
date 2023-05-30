import type { PrismaClient, User } from '@local/__generated__/prisma';
import { ProtectedError } from '../../../lib/ProtectedError';

export async function getByEvent(prisma: PrismaClient, eventId: string): Promise<{ user: User; isMuted: boolean }[]> {
    const SIXTY_SECONDS = 1000 * 60;
    const result = await prisma.eventParticipant.findMany({
        where: { eventId, lastPingTime: { gte: new Date(Date.now() - SIXTY_SECONDS) } },
        select: { user: true, isMuted: true },
        orderBy: { user: { firstName: 'asc' } },
    });
    return result;
}

export async function joinOrPingEvent(prisma: PrismaClient, eventId: string, userId: string): Promise<void> {
    try {
        // Check if user is already in event
        const result = await prisma.eventParticipant.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
        });
        if (result) {
            // Already in event, update ping time
            await prisma.eventParticipant.update({
                where: {
                    eventId_userId: {
                        eventId,
                        userId,
                    },
                },
                data: {
                    lastPingTime: new Date(),
                },
            });
            return;
        }
        // Not yet in event
        await prisma.eventParticipant.create({
            data: {
                eventId,
                userId,
                lastPingTime: new Date(),
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({ userMessage: 'Already Joined Event' });
    }
}

// TODO: Add purge messages option
export async function muteParticipant(
    prisma: PrismaClient,
    eventId: string,
    userId: string,
    viewerId: string
    // purgeMessages: boolean
): Promise<void> {
    try {
        // Validate that the viewer has permission to mute
        const isModerator = await prisma.eventModerator.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId: viewerId,
                },
            },
        });
        if (!isModerator) throw new ProtectedError({ userMessage: 'Insufficient permissions to mute users.' });
        await prisma.eventParticipant.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
            data: {
                isMuted: true,
            },
        });
        // Hide all of the user's messages
        await prisma.eventQuestion.updateMany({
            where: {
                eventId,
                createdById: userId,
            },
            data: {
                isVisible: false,
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({
            userMessage: 'An unexpected error occured while attempting to mute. Please try again later.',
        });
    }
}

export async function unmuteParticipant(
    prisma: PrismaClient,
    eventId: string,
    userId: string,
    viewerId: string
): Promise<void> {
    try {
        // Validate that the viewer has permission to mute
        const isModerator = await prisma.eventModerator.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId: viewerId,
                },
            },
        });
        if (!isModerator) throw new ProtectedError({ userMessage: 'Insufficient permissions to unmute users.' });
        await prisma.eventParticipant.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
            data: {
                isMuted: false,
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({
            userMessage: 'An unexpected error occured while attempting to unmute. Please try again later.',
        });
    }
}
