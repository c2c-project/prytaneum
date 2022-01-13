import { PrismaClient } from '@app/prisma';
import { CreateFeedback } from '@local/graphql-types';

export async function myFeedback(userId: string, eventId: string, prisma: PrismaClient) {
    const result = await prisma.eventLiveFeedback.findMany({
        where: { createdById: userId, eventId }
    });
    return result;
}

export async function createFeedback(userId: string, eventId: string, prisma: PrismaClient, input: CreateFeedback) {

    return prisma.eventLiveFeedback.create({
        data: {
            createdById: userId,
            eventId,
            message: input.message
        }
    });
}

export async function doesEventMatch(eventId: string, feedbackId: string, prisma: PrismaClient) {
    // see if the event id matches the liked question
    const found = await prisma.eventLiveFeedback.findFirst({
        where: { eventId, id: feedbackId },
        select: { id: true },
    });

    return Boolean(found);
}

export async function findSubmitterByFeedbackId(feedbackId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedback.findUnique({
        where: { id: feedbackId },
        select: { createdByUser: true }
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}
