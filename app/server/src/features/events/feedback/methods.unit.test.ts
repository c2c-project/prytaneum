import type { PrismaClient, ReasoningType } from '@local/__generated__/prisma';
import type { CreateFeedbackPromptResponse } from '@local/graphql-types';
import { createFeedbackPromptResponse } from './methods';

const USER_ID = '531be5ae-6df9-47e2-a86d-8ee44062ab79';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';

function makeInput(response: string): CreateFeedbackPromptResponse {
    return {
        eventId: 'unused-event-id',
        promptId: 'unused-prompt-id',
        response,
        vote: '',
        multipleChoiceResponse: 'Option A',
    };
}

function makePrisma(reasoningType: ReasoningType) {
    const findUnique = jest.fn().mockResolvedValue({
        isOpenEnded: false,
        isVote: false,
        isMultipleChoice: true,
        reasoningType,
    });
    const create = jest.fn().mockResolvedValue({ id: 'response-id' });
    const prisma = {
        eventLiveFeedbackPrompt: { findUnique },
        eventLiveFeedbackPromptResponse: { create },
    } as unknown as PrismaClient;

    return { prisma, findUnique, create };
}

describe('createFeedbackPromptResponse reasoning validation', () => {
    test.each(['', '   \t\n'])('rejects REQUIRED multiple-choice reasoning containing only %p', async (response) => {
        const { prisma, findUnique, create } = makePrisma('REQUIRED');

        await expect(
            createFeedbackPromptResponse(USER_ID, PROMPT_ID, prisma, makeInput(response))
        ).rejects.toMatchObject({
            userMessage: 'Reasoning is required for this prompt.',
        });
        expect(findUnique).toHaveBeenCalledWith({
            where: { id: PROMPT_ID },
            select: { isOpenEnded: true, isVote: true, isMultipleChoice: true, reasoningType: true },
        });
        expect(create).not.toHaveBeenCalled();
    });

    test.each([
        ['REQUIRED', 'A substantive reason.'],
        ['OPTIONAL', ''],
        ['DISABLED', ''],
    ] as const)('accepts %s multiple-choice reasoning value %p', async (reasoningType, response) => {
        const { prisma, create } = makePrisma(reasoningType);

        await expect(createFeedbackPromptResponse(USER_ID, PROMPT_ID, prisma, makeInput(response))).resolves.toEqual({
            id: 'response-id',
        });
        expect(create).toHaveBeenCalledWith({
            data: {
                promptId: PROMPT_ID,
                createdById: USER_ID,
                isOpenEnded: false,
                response,
                isVote: false,
                vote: 'CONFLICTED',
                isMultipleChoice: true,
                multipleChoiceResponse: 'Option A',
            },
        });
    });
});
