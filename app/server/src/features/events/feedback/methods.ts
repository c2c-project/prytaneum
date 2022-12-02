import { PrismaClient } from '@local/__generated__/prisma';
import type { CreateFeedback, CreateFeedbackPrompt, CreateFeedbackPromptResponse } from '@local/graphql-types';
import { fromGlobalId } from 'graphql-relay';
import { isModerator } from '../moderation/methods';
import { ProtectedError } from '../../../lib/ProtectedError';
import { Vote } from '@local/graphql-types';

export async function myFeedback(userId: string, eventId: string, prisma: PrismaClient) {
    const result = await prisma.eventLiveFeedback.findMany({
        where: { createdById: userId, eventId },
    });
    return result;
}

export async function promptResponses(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId },
    });
}

export async function findPromptByPromptId(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPrompt.findUnique({ where: { id: promptId } });
}

export async function findPromptsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPrompt.findMany({ where: { eventId } });
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
            refFeedbackId,
        },
        include: {
            refFeedback: true,
        },
    });
}

export async function createFeedbackPrompt(
    userId: string,
    eventId: string,
    prisma: PrismaClient,
    input: CreateFeedbackPrompt
) {
    const { prompt, feedbackType } = input;
    // Moderator only action
    if ((await isModerator(userId, eventId, prisma)) === false) {
        throw new ProtectedError({
            userMessage: 'Only moderators can create feedback prompts',
            internalMessage: 'createFeedbackPrompt: user is not a moderator',
        });
    }

    return prisma.eventLiveFeedbackPrompt.create({
        data: {
            eventId,
            prompt,
            isVote: feedbackType === 'vote',
            isOpenEnded: feedbackType === 'open-ended',
        },
    });
}

export async function createFeedbackPromptResponse(
    userId: string,
    promptId: string,
    prisma: PrismaClient,
    input: CreateFeedbackPromptResponse
) {
    const { response, vote } = input;

    const promptData = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: { isOpenEnded: true, isVote: true },
    });

    if (!promptData) {
        throw new ProtectedError({
            userMessage: 'Prompt not found',
            internalMessage: `Prompt with id ${promptId} not found`,
        });
    }

    return prisma.eventLiveFeedbackPromptResponse.create({
        data: {
            promptId,
            createdById: userId,
            isOpenEnded: promptData.isOpenEnded,
            response,
            isVote: promptData.isVote,
            vote: vote in Vote ? (vote as Vote) : 'CONFLICTED',
        },
    });
}

export async function findResponsesByPromptId(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId },
    });
}

export async function doesEventMatchFeedback(eventId: string, feedbackId: string, prisma: PrismaClient) {
    const found = await prisma.eventLiveFeedback.findFirst({
        where: { eventId, id: feedbackId },
        select: { id: true },
    });

    return Boolean(found);
}

export async function doesEventMatchFeedbackPrompt(eventId: string, feedbackPromptId: string, prisma: PrismaClient) {
    const found = await prisma.eventLiveFeedbackPrompt.findFirst({
        where: { eventId, id: feedbackPromptId },
        select: { id: true },
    });

    return Boolean(found);
}

export async function findSubmitterByFeedbackId(feedbackId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedback.findUnique({
        where: { id: feedbackId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}

export async function findRefFeedback(feedbackId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedback.findUnique({
        where: { id: feedbackId },
        select: { refFeedback: true },
    });
    if (!queryResult || !queryResult.refFeedback) return null;
    return queryResult.refFeedback;
}

export async function findSubmitterByResponseId(responseId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedbackPromptResponse.findUnique({
        where: { id: responseId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}
