import { PrismaClient } from '@app/prisma';
import { CreateFeedback } from '@local/graphql-types';
import { fromGlobalId } from 'graphql-relay';

export async function myFeedback(userId: string, eventId: string, prisma: PrismaClient) {
    const result = await prisma.eventLiveFeedback.findMany({
        where: { createdById: userId, eventId }
    });
    return result;
}

export async function createFeedback(userId: string, eventId: string, prisma: PrismaClient, input: CreateFeedback) {
    const { isReply, refFeedbackId: globalRefId } = input;
    const refFeedbackId = globalRefId ? fromGlobalId(globalRefId).id : null;


    return prisma.eventLiveFeedback.create({
        data: {
            createdById: userId,
            eventId,
            message: input.message,
            isReply: isReply || false,
            refFeedbackId
        },
        include: {
            refFeedback: true
        }
    });
}

export async function doesEventMatch(eventId: string, feedbackId: string, prisma: PrismaClient) {
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

export async function findRefFeedback(feedbackId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedback.findUnique({
        where: { id: feedbackId },
        select: { refFeedback: true }
    });
    if (!queryResult || !queryResult.refFeedback) return null;
    return queryResult.refFeedback;
}
