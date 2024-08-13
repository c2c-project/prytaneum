import { PrismaClient } from '@local/__generated__/prisma';
import axios, { AxiosResponse } from 'axios';
import type {
    CreateFeedback,
    CreateFeedbackDM,
    CreateFeedbackPrompt,
    CreateFeedbackPromptResponse,
} from '@local/graphql-types';
import { fromGlobalId } from 'graphql-relay';
import { isModerator } from '../moderation/methods';
import { ProtectedError } from '../../../lib/ProtectedError';
import { Vote } from '@local/graphql-types';
import Redis, { Cluster } from 'ioredis';

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

export async function summarizePromptResponses(
    promptId: string,
    eventId: string,
    redis: Redis | Cluster,
    prisma: PrismaClient
) {
    const moderationIssueEventKey = `moderation_issue_${eventId}}`;
    const eventIssue = await redis.get(moderationIssueEventKey);
    if (!eventIssue) {
        const event = await prisma.event.findUnique({ where: { id: eventId }, select: { issue: true } });
        if (!event) {
            throw new ProtectedError({ userMessage: 'Event not found' });
        }
        const { issue } = event;
        redis.set(moderationIssueEventKey, issue);
    }
    const _responses = await prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId },
        select: { response: true },
    });

    const responses = _responses.map((response) => response.response);

    type ExpectedResponse = string[];
    let response: AxiosResponse<ExpectedResponse> | null = null;
    try {
        const url = process.env.MODERATION_URL + 'promptsummary';
        response = await axios.post(
            url,
            {
                prompt_responses: responses,
                eventId,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (!response) throw new Error('Could not summarize responses, No response from moderation service.');
    } catch (error) {
        console.error(error);
    }
    const viewpoints = response?.data || [];

    return prisma.eventLiveFeedbackPrompt.update({
        where: { id: promptId },
        data: { viewpoints },
    });
}

export function findPromptByPromptId(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPrompt.findUnique({ where: { id: promptId } });
}

export function shareFeedbackPromptDraft(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPrompt.update({
        where: { id: promptId },
        data: { isDraft: false },
    });
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

export function createFeedbackDM(
    userId: string,
    eventId: string,
    recipientId: string,
    prisma: PrismaClient,
    input: CreateFeedbackDM
) {
    return prisma.eventLiveFeedback.create({
        data: {
            createdById: userId,
            eventId,
            message: input.message,
            isReply: false,
            isDM: true,
            dmRecipientId: recipientId,
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
            isMultipleChoice: feedbackType === 'multiple-choice',
            multipleChoiceOptions: input.choices,
            isDraft: input.isDraft,
        },
    });
}

export async function createFeedbackPromptResponse(
    userId: string,
    promptId: string,
    prisma: PrismaClient,
    input: CreateFeedbackPromptResponse
) {
    const { response, vote, multipleChoiceResponse } = input;

    const promptData = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: { isOpenEnded: true, isVote: true, isMultipleChoice: true },
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
            isMultipleChoice: promptData.isMultipleChoice,
            multipleChoiceResponse: multipleChoiceResponse,
        },
    });
}

export async function findResponsesByPromptId(promptId: string, prisma: PrismaClient) {
    return prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId },
    });
}

export async function findViewpointsByPromptId(promptId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: { viewpoints: true },
    });
    if (!queryResult) return null;
    return queryResult.viewpoints;
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

export async function countPromptResponseVotes(promptId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: { responses: true, isVote: true, isMultipleChoice: true },
    });

    if (!queryResult) throw new ProtectedError({ userMessage: 'Prompt not found' });

    const votes = { for: 0, against: 0, conflicted: 0 };
    queryResult.responses.forEach((response) => {
        switch (response.vote) {
            case 'FOR':
                votes.for++;
                break;
            case 'AGAINST':
                votes.against++;
                break;
            case 'CONFLICTED':
                votes.conflicted++;
                break;
            default:
                break;
        }
    });

    return votes;
}

export async function submitPostEventFeedback(
    feedback: string,
    eventId: string,
    viewerId: string | null,
    prisma: PrismaClient
) {
    return prisma.postEventFeedback.create({
        data: {
            eventId,
            createdById: viewerId,
            feedback,
            isAnonymous: viewerId === null,
        },
    });
}
