import { CreateBroadcastMessage } from '@local/graphql-types';
import { PrismaClient } from '@local/__generated__/prisma';

/**
 * submit a broadcast message
 */
export async function createBroadcastMessage(userId: string, prisma: PrismaClient, input: CreateBroadcastMessage) {
    const { eventId, broadcastMessage } = input;

    return prisma.eventBroadcastMessage.create({
        data: {
            eventId,
            broadcastMessage: broadcastMessage,
            createdById: userId,
            isVisible: true,
            lang: 'EN',
        },
    });
}

/**
 * edit a broadcast message
 */
export async function editBroadcastMessage(broadcastMessageId: string, broadcastMessage: string, prisma: PrismaClient) {
    return prisma.eventBroadcastMessage.update({
        where: { id: broadcastMessageId },
        data: {
            broadcastMessage: broadcastMessage,
        },
    });
}

/**
 *  Remove a broadcastMessage from an event
 */
export async function updateBroadcastMessageVisibility(
    broadcastMessageId: string,
    isVisible: boolean,
    prisma: PrismaClient
) {
    return prisma.eventBroadcastMessage.update({
        where: { id: broadcastMessageId },
        data: {
            isVisible,
        },
    });
}

/**
 * find the submitter of a particular broadcast message
 */
export async function findSubmitterByBroadcastMessageId(broadcastMessageId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventBroadcastMessage.findUnique({
        where: { id: broadcastMessageId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}

/**
 * find broadcastMessages by event id
 */
export async function findBroadcastMessagesByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventBroadcastMessage.findMany({
        where: { eventId, isVisible: true },
        orderBy: { createdAt: 'asc' },
    });
}
