/* eslint-disable @typescript-eslint/indent */
import { PrismaClient, ReasoningType, Vote } from '@local/__generated__/prisma';
import { fromGlobalId } from 'graphql-relay';
import { ProtectedError } from '@local/lib/ProtectedError';
import { isModerator } from '../moderation/methods';
import type {
    CreateFeedbackFlowInput,
    CreateFeedbackPromptFlowResponseInput,
    FeedbackFlow,
    FeedbackFlowPrompt,
} from '@local/graphql-types';
import { getOrCreateServer } from '@local/core/server';

const server = getOrCreateServer();

const determineReasoningType = (reasoningType: string): ReasoningType => {
    let reasoningTypeValue: ReasoningType = 'OPTIONAL';
    switch (reasoningType) {
        case 'required':
            reasoningTypeValue = 'REQUIRED';
            break;
        case 'disabled':
            reasoningTypeValue = 'DISABLED';
            break;
        default:
            reasoningTypeValue = 'OPTIONAL';
            break;
    }
    return reasoningTypeValue;
};

/**
 * Creates a new FeedbackFlow and, if provided, new EventLiveFeedbackPrompts
 * associated with it, all within a single database transaction.
 * @param userId The ID of the user performing the action.
 * @param prisma The Prisma client instance.
 * @param input The GraphQL input for creating the feedback flow.
 * @returns The created FeedbackFlow with its prompts.
 */
export async function createFeedbackFlow(
    userId: string,
    prisma: PrismaClient,
    input: CreateFeedbackFlowInput // Updated input type
) {
    server.log.debug(`Creating feedback flow for user ${userId} with input: ${JSON.stringify(input)}`);
    const { eventId, flowName, flowDescription, prompts: newPromptInputs, isDraft } = input;
    const { id: globalEventId } = fromGlobalId(eventId);

    // Authorization: Check if the user is a moderator for the event.
    if (!(await isModerator(userId, globalEventId, prisma))) {
        throw new ProtectedError({
            userMessage: 'User is not authorized to create a feedback flow for this event.',
            internalMessage: `User ${userId} attempted to create feedback flow for event ${globalEventId} without moderator privileges.`,
        });
    }

    // Use a transaction to ensure atomicity.
    // If any part of this process fails, the entire transaction is rolled back.
    return prisma.$transaction(async (tx) => {
        const createdPromptsData: { id: string; order: number }[] = [];

        // Step 1: Create each new EventLiveFeedbackPrompt if provided.
        if (newPromptInputs && newPromptInputs.length > 0) {
            for (let i = 0; i < newPromptInputs.length; i++) {
                const newPromptDetail = newPromptInputs[i];
                const promptOrder = i; // Use array index as the order for the prompt within the flow.

                // Map the GraphQL input to the data structure Prisma expects for prompt creation.
                // const feedbackPromptCreateData = mapNewPromptInputToPrismaData(newPromptDetail, eventId);
                const feedbackPromptCreateData = {
                    event: {
                        connect: {
                            id: globalEventId,
                        },
                    },
                    prompt: newPromptDetail.prompt,
                    isVote: newPromptDetail.feedbackType === 'vote',
                    isOpenEnded: newPromptDetail.feedbackType === 'open-ended',
                    isMultipleChoice: newPromptDetail.feedbackType === 'multiple-choice',
                    multipleChoiceOptions: newPromptDetail.choices,
                    isDraft: newPromptDetail.isDraft ?? false,
                    reasoningType: determineReasoningType(newPromptDetail.reasoningType),
                };

                const createdPrompt = await tx.eventLiveFeedbackPrompt.create({
                    data: feedbackPromptCreateData,
                });
                createdPromptsData.push({ id: createdPrompt.id, order: promptOrder });
            }
        }

        // Step 2: Create the FeedbackFlow.
        const feedbackFlow = await tx.feedbackFlow.create({
            data: {
                eventId: globalEventId,
                name: flowName,
                description: flowDescription || '',
                isDraft,
                prompts:
                    createdPromptsData.length > 0
                        ? {
                              create: createdPromptsData.map((promptData) => ({
                                  promptId: promptData.id, // ID of the EventLiveFeedbackPrompt created above
                                  order: promptData.order, // Order of this prompt in the flow
                              })),
                          }
                        : undefined, // No prompts to create if newPromptInputs was empty or null
            },
            include: {
                // Ensure prompts are included in the returned object for the resolver.
                prompts: {
                    include: {
                        prompt: true, // Include the full EventLiveFeedbackPrompt data
                    },
                    orderBy: {
                        order: 'asc', // Order them correctly
                    },
                },
            },
        });

        const feedbackFlowPrompts: FeedbackFlowPrompt[] = feedbackFlow.prompts.map((feedbackFlowPrompt) => ({
            id: feedbackFlowPrompt.id,
            prompt: feedbackFlowPrompt.prompt,
            order: feedbackFlowPrompt.order,
        }));

        const formattedFeedbackFlow: FeedbackFlow = {
            id: feedbackFlow.id,
            eventId: feedbackFlow.eventId,
            flowName: feedbackFlow.name,
            flowDescription: feedbackFlow.description,
            isDraft: feedbackFlow.isDraft,
            prompts: feedbackFlowPrompts,
        };

        return formattedFeedbackFlow;
    });
}

export async function createFeedbackPromptFlowResponse(
    userId: string,
    prisma: PrismaClient,
    input: CreateFeedbackPromptFlowResponseInput
) {
    const { responses } = input;
    const promises = responses.map(async (response) => {
        const { id: promptId } = fromGlobalId(response.promptId);
        if (!promptId) {
            throw new ProtectedError({
                userMessage: 'Prompt ID is required for each response',
                internalMessage: 'createFeedbackPromptFlowResponse: promptId is missing in response',
            });
        }
        const flowPrompt = await prisma.feedbackFlowPrompt.findUnique({
            where: { id: promptId },
            select: { prompt: true },
        });

        if (!flowPrompt) {
            throw new ProtectedError({
                userMessage: 'Flow Prompt not found',
                internalMessage: `Flow Prompt with id ${promptId} not found`,
            });
        }
        const promptData = flowPrompt.prompt;
        await prisma.eventLiveFeedbackPromptResponse.create({
            data: {
                promptId: promptData.id,
                createdById: userId,
                isOpenEnded: promptData.isOpenEnded,
                response: response.response,
                isVote: promptData.isVote,
                vote: response.vote in Vote ? (response.vote as Vote) : 'CONFLICTED',
                isMultipleChoice: promptData.isMultipleChoice,
                multipleChoiceResponse: response.multipleChoiceResponse,
            },
        });
    });
    const results = await Promise.allSettled(promises);
    for (const result of results) {
        if (result.status === 'rejected') {
            server.log.error(`Error creating feedback prompt flow response: ${result.reason}`);
        }
    }
    const errors = results.filter((res) => res.status === 'rejected');
    if (errors.length > 0) {
        throw new ProtectedError({
            userMessage: 'Error creating feedback prompt flow response',
            internalMessage: `Failed to create feedback prompt flow response: ${errors.map((error) => {
                if (error.status === 'rejected') {
                    return error.reason;
                }
            })}`,
        });
    }
    server.log.debug(`Successfully created feedback prompt flow responses for user ${userId}`);
}

export async function findPromptsByFlowId(
    globalFeedbackFlowId: string,
    prisma: PrismaClient
): Promise<FeedbackFlowPrompt[]> {
    server.log.debug(`Finding prompts for feedback flow with ID: ${globalFeedbackFlowId}`);
    const feedbackFlow = await prisma.feedbackFlow.findUnique({
        where: { id: globalFeedbackFlowId },
        include: {
            prompts: {
                include: {
                    prompt: true,
                },
                orderBy: {
                    order: 'asc',
                },
            },
        },
    });

    if (!feedbackFlow) {
        throw new ProtectedError({
            userMessage: 'Feedback flow not found',
            internalMessage: `Feedback flow with id ${globalFeedbackFlowId} not found`,
        });
    }

    return feedbackFlow.prompts;
}

export async function findFeedbackFlowPromptById(
    globalFeedbackFlowPromptId: string,
    prisma: PrismaClient
): Promise<FeedbackFlowPrompt> {
    server.log.debug(`Finding feedback flow prompt with ID: ${globalFeedbackFlowPromptId}`);
    const feedbackFlowPrompt = await prisma.feedbackFlowPrompt.findUnique({
        where: { id: globalFeedbackFlowPromptId },
        include: {
            prompt: true,
        },
    });

    if (!feedbackFlowPrompt) {
        throw new ProtectedError({
            userMessage: 'Feedback flow prompt not found',
            internalMessage: `Feedback flow prompt with id ${globalFeedbackFlowPromptId} not found`,
        });
    }

    return feedbackFlowPrompt;
}

export async function findFeedbackFlowByFlowId(
    globalFeedbackFlowId: string,
    prisma: PrismaClient
): Promise<FeedbackFlow> {
    server.log.debug(`Finding feedback flow with ID: ${globalFeedbackFlowId}`);
    const feedbackFlow = await prisma.feedbackFlow.findUnique({
        where: { id: globalFeedbackFlowId },
        include: {
            prompts: {
                include: {
                    prompt: true,
                },
                orderBy: {
                    order: 'asc',
                },
            },
        },
    });

    if (!feedbackFlow) {
        throw new ProtectedError({
            userMessage: 'Feedback flow not found',
            internalMessage: `Feedback flow with id ${globalFeedbackFlowId} not found`,
        });
    }

    const feedbackFlowPrompts: FeedbackFlowPrompt[] = feedbackFlow.prompts.map((feedbackFlowPrompt) => ({
        id: feedbackFlowPrompt.id,
        prompt: feedbackFlowPrompt.prompt,
        order: feedbackFlowPrompt.order,
    }));

    const formattedFeedbackFlow: FeedbackFlow = {
        id: feedbackFlow.id,
        eventId: feedbackFlow.eventId,
        flowName: feedbackFlow.name,
        flowDescription: feedbackFlow.description,
        isDraft: feedbackFlow.isDraft,
        prompts: feedbackFlowPrompts,
    };

    return formattedFeedbackFlow;
}

export async function promptFlowResponses(globalFlowPromptId: string, prisma: PrismaClient) {
    server.log.debug(`Fetching prompt flow responses for prompt ID: ${globalFlowPromptId}`);
    const feedbackPrompt = await prisma.feedbackFlowPrompt.findUnique({
        where: { id: globalFlowPromptId },
        select: {
            promptId: true, // Get the ID of the EventLiveFeedbackPrompt
        },
    });
    if (!feedbackPrompt) {
        throw new ProtectedError({
            userMessage: 'Prompt not found',
            internalMessage: `Prompt with id ${globalFlowPromptId} not found`,
        });
    }
    return prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId: feedbackPrompt.promptId },
    });
}
