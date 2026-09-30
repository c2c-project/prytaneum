import type { PrismaClient, ReasoningType } from '@local/__generated__/prisma';
import { isRound1PromptUnpublished } from './round1PromptEligibility';
import {
    deriveRound1QuestionType,
    getRound1OutputQuestionType,
    Round1Output,
    Round1OutputV1,
    Round1OutputV2,
    Round1QuestionTypeError,
} from './round1Types';

export type { Round1Output, Round1Response } from './round1Types';

type JsonRecord = Record<string, unknown>;

export type Round1ImportSummary = { runId: string; promptId: string; insertedCount: number; participantKeys: string[] };
export type Round1ImportPreflight = {
    runId: string;
    eventId: string;
    promptId: string;
    responseCount: number;
    participantKeys: string[];
};

export class Round1ImportError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1ImportError';
    }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function requireRecord(value: unknown, fieldName: string): JsonRecord {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new Round1ImportError(`${fieldName} must be an object.`);
    }
    return value as JsonRecord;
}

function requireNonemptyString(value: unknown, fieldName: string): string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Round1ImportError(`${fieldName} must be a nonempty string.`);
    }
    return value;
}

function requireUuid(value: unknown, fieldName: string): string {
    const uuid = requireNonemptyString(value, fieldName);
    if (!UUID_PATTERN.test(uuid)) throw new Round1ImportError(`${fieldName} must be a UUID.`);
    return uuid;
}

function parseReasoningType(value: unknown): ReasoningType {
    if (value !== 'DISABLED' && value !== 'OPTIONAL' && value !== 'REQUIRED') {
        throw new Round1ImportError('reasoningType must be DISABLED, OPTIONAL, or REQUIRED.');
    }
    return value;
}

function parseOptions(value: unknown): string[] {
    if (!Array.isArray(value) || value.length === 0) {
        throw new Round1ImportError('options must be a nonempty ordered array.');
    }
    const options = value.map((option, index) => requireNonemptyString(option, `options[${index}]`));
    if (new Set(options).size !== options.length)
        throw new Round1ImportError('options must not contain duplicate values.');
    return options;
}

function parseReasoning(value: unknown, fieldName: string, reasoningType: ReasoningType): string {
    if (typeof value !== 'string') throw new Round1ImportError(`${fieldName} must be a string.`);
    const reasoning = value.trim();
    if (reasoningType === 'REQUIRED' && reasoning.length === 0) {
        throw new Round1ImportError(`${fieldName} must be a nonempty string.`);
    }
    if (reasoningType === 'DISABLED' && reasoning.length > 0) {
        throw new Round1ImportError(`${fieldName} must be empty when reasoning is disabled.`);
    }
    if (Array.from(reasoning).length > 500) {
        throw new Round1ImportError(`${fieldName} must be at most 500 characters.`);
    }
    return reasoning;
}

function parseResponseIdentity(response: JsonRecord, index: number) {
    return {
        participantKey: requireNonemptyString(response.participantKey, `responses[${index}].participantKey`),
        userId: requireUuid(response.userId, `responses[${index}].userId`),
    };
}

function parseMultipleChoiceResponse(
    value: unknown,
    index: number,
    options: string[],
    reasoningType: ReasoningType,
    version: 1 | 2
) {
    const response = requireRecord(value, `responses[${index}]`);
    if (version === 2 && response.questionType !== 'MULTIPLE_CHOICE') {
        throw new Round1ImportError(`responses[${index}].questionType must be MULTIPLE_CHOICE.`);
    }
    const identity = parseResponseIdentity(response, index);
    if (!Number.isInteger(response.standpointNum)) {
        throw new Round1ImportError(`responses[${index}].standpointNum must be an integer.`);
    }
    const standpointNum = response.standpointNum as number;
    if (standpointNum < 1 || standpointNum > options.length) {
        throw new Round1ImportError(`responses[${index}].standpointNum must be between 1 and ${options.length}.`);
    }
    const selectedOption = requireNonemptyString(response.selectedOption, `responses[${index}].selectedOption`);
    if (selectedOption !== options[standpointNum - 1]) {
        throw new Round1ImportError(`responses[${index}].selectedOption does not match options[standpointNum - 1].`);
    }
    const reasoning = parseReasoning(response.reasoning, `responses[${index}].reasoning`, reasoningType);
    return {
        ...identity,
        questionType: 'MULTIPLE_CHOICE' as const,
        standpointNum,
        selectedOption,
        reasoning,
    };
}

function parseCommonOutput(output: JsonRecord) {
    const model = requireNonemptyString(output.model, 'model');
    if (model !== 'gemini-3.5-flash') throw new Round1ImportError('model must be gemini-3.5-flash.');
    return {
        runId: requireNonemptyString(output.runId, 'runId'),
        eventId: requireUuid(output.eventId, 'eventId'),
        promptId: requireUuid(output.promptId, 'promptId'),
        model,
        generatedAt: requireNonemptyString(output.generatedAt, 'generatedAt'),
    };
}

function requireResponses(value: unknown): unknown[] {
    if (!Array.isArray(value) || value.length < 1 || value.length > 20) {
        throw new Round1ImportError('responses must contain between 1 and 20 responses.');
    }
    return value;
}

function validateUniqueParticipants(responses: { participantKey: string; userId: string }[]): void {
    const participantKeys = responses.map(({ participantKey }) => participantKey);
    if (new Set(participantKeys).size !== participantKeys.length) {
        throw new Round1ImportError('responses contain a duplicate participantKey.');
    }
    const userIds = responses.map(({ userId }) => userId);
    if (new Set(userIds).size !== userIds.length) throw new Round1ImportError('responses contain a duplicate userId.');
}

function parseVersion1(output: JsonRecord): Round1OutputV1 {
    const common = parseCommonOutput(output);
    const options = parseOptions(output.options);
    const reasoningType = parseReasoningType(output.reasoningType);
    const responses = requireResponses(output.responses).map((response, index) => {
        const { questionType: _questionType, ...parsed } = parseMultipleChoiceResponse(
            response,
            index,
            options,
            reasoningType,
            1
        );
        return parsed;
    });
    validateUniqueParticipants(responses);
    return { schemaVersion: 1, ...common, options, reasoningType, responses };
}

function parseVersion2(output: JsonRecord): Round1OutputV2 {
    const common = parseCommonOutput(output);
    const rawResponses = requireResponses(output.responses);
    if (output.questionType === 'MULTIPLE_CHOICE') {
        const options = parseOptions(output.options);
        const reasoningType = parseReasoningType(output.reasoningType);
        const responses = rawResponses.map((response, index) =>
            parseMultipleChoiceResponse(response, index, options, reasoningType, 2)
        );
        validateUniqueParticipants(responses);
        return { schemaVersion: 2, ...common, questionType: 'MULTIPLE_CHOICE', options, reasoningType, responses };
    }
    if (output.questionType === 'VOTE') {
        const reasoningType = parseReasoningType(output.reasoningType);
        const responses = rawResponses.map((value, index) => {
            const response = requireRecord(value, `responses[${index}]`);
            if (response.questionType !== 'VOTE') {
                throw new Round1ImportError(`responses[${index}].questionType must be VOTE.`);
            }
            if (response.vote !== 'FOR' && response.vote !== 'AGAINST' && response.vote !== 'CONFLICTED') {
                throw new Round1ImportError(`responses[${index}].vote must be FOR, AGAINST, or CONFLICTED.`);
            }
            const vote = response.vote as 'FOR' | 'AGAINST' | 'CONFLICTED';
            return {
                ...parseResponseIdentity(response, index),
                questionType: 'VOTE' as const,
                vote,
                reasoning: parseReasoning(response.reasoning, `responses[${index}].reasoning`, reasoningType),
            };
        });
        validateUniqueParticipants(responses);
        return { schemaVersion: 2, ...common, questionType: 'VOTE', reasoningType, responses };
    }
    if (output.questionType === 'OPEN_ENDED') {
        const responses = rawResponses.map((value, index) => {
            const response = requireRecord(value, `responses[${index}]`);
            if (response.questionType !== 'OPEN_ENDED') {
                throw new Round1ImportError(`responses[${index}].questionType must be OPEN_ENDED.`);
            }
            const answer = requireNonemptyString(response.response, `responses[${index}].response`).trim();
            if (Array.from(answer).length > 500) {
                throw new Round1ImportError(`responses[${index}].response must be at most 500 characters.`);
            }
            return { ...parseResponseIdentity(response, index), questionType: 'OPEN_ENDED' as const, response: answer };
        });
        validateUniqueParticipants(responses);
        return { schemaVersion: 2, ...common, questionType: 'OPEN_ENDED', responses };
    }
    throw new Round1ImportError('questionType must be MULTIPLE_CHOICE, VOTE, or OPEN_ENDED.');
}

/** Parse and validate an FGDT Round 1 output without accessing the database. */
export function parseRound1Output(json: unknown): Round1Output {
    const output = requireRecord(json, 'FGDT Round 1 output');
    if (output.schemaVersion === 1) return parseVersion1(output);
    if (output.schemaVersion === 2) return parseVersion2(output);
    throw new Round1ImportError('schemaVersion must equal 1 or 2.');
}

function arraysEqual(left: string[], right: string[]): boolean {
    return left.length === right.length && left.every((value, index) => value === right[index]);
}

/** Validate an import against current Prytaneum database state without writing. */
export async function preflightRound1Import(
    prisma: PrismaClient,
    output: Round1Output
): Promise<Round1ImportPreflight> {
    const event = await prisma.event.findUnique({ where: { id: output.eventId }, select: { id: true } });
    if (!event) throw new Round1ImportError(`Event ${output.eventId} does not exist.`);
    const prompt = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: output.promptId },
        select: {
            eventId: true,
            isMultipleChoice: true,
            isVote: true,
            isOpenEnded: true,
            isDraft: true,
            multipleChoiceOptions: true,
            reasoningType: true,
            flows: { select: { feedbackFlow: { select: { isDraft: true } } } },
        },
    });
    if (!prompt) throw new Round1ImportError(`Prompt ${output.promptId} does not exist.`);
    if (prompt.eventId !== output.eventId) {
        throw new Round1ImportError(`Prompt ${output.promptId} does not belong to event ${output.eventId}.`);
    }
    let promptQuestionType;
    try {
        promptQuestionType = deriveRound1QuestionType(prompt);
    } catch (error) {
        if (error instanceof Round1QuestionTypeError) throw new Round1ImportError(error.message);
        throw error;
    }
    const outputQuestionType = getRound1OutputQuestionType(output);
    if (promptQuestionType !== outputQuestionType) {
        throw new Round1ImportError('Prompt question type does not match the Round 1 output question type.');
    }
    if (!isRound1PromptUnpublished(prompt)) {
        throw new Round1ImportError('Simulation is only available for draft/unpublished surveys.');
    }
    if (output.schemaVersion === 1 || output.questionType === 'MULTIPLE_CHOICE') {
        if (!arraysEqual(prompt.multipleChoiceOptions, output.options)) {
            throw new Round1ImportError('Prompt options do not exactly match the ordered FGDT output options.');
        }
        if (prompt.reasoningType !== output.reasoningType) {
            throw new Round1ImportError('Prompt reasoning type does not match the FGDT output reasoning type.');
        }
    } else if (output.questionType === 'VOTE') {
        if (prompt.reasoningType !== output.reasoningType) {
            throw new Round1ImportError('Prompt reasoning type does not match the FGDT output reasoning type.');
        }
    }

    const userIds = output.responses.map(({ userId }) => userId);
    const users = await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true } });
    const existingUserIds = new Set(users.map(({ id }) => id));
    const missingUserIds = userIds.filter((userId) => !existingUserIds.has(userId));
    if (missingUserIds.length > 0) throw new Round1ImportError(`User(s) do not exist: ${missingUserIds.join(', ')}.`);
    const existingResponses = await prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId: output.promptId, createdById: { in: userIds } },
        select: { createdById: true },
    });
    if (existingResponses.length > 0) {
        const conflictingUserIds = existingResponses.map(({ createdById }) => createdById);
        throw new Round1ImportError(
            `Response(s) already exist for prompt ${output.promptId} and user(s): ${conflictingUserIds.join(', ')}.`
        );
    }
    return {
        runId: output.runId,
        eventId: output.eventId,
        promptId: output.promptId,
        responseCount: output.responses.length,
        participantKeys: output.responses.map(({ participantKey }) => participantKey),
    };
}

/** Transactionally persist Round 1 responses that have already been parsed and preflighted. */
export async function persistRound1Responses(prisma: PrismaClient, output: Round1Output): Promise<Round1ImportSummary> {
    await prisma.$transaction(async (tx) => {
        if (getRound1OutputQuestionType(output) === 'MULTIPLE_CHOICE') {
            for (const response of output.responses) {
                if ('vote' in response || 'response' in response) throw new Round1ImportError('Invalid response type.');
                await tx.eventLiveFeedbackPromptResponse.create({
                    data: {
                        promptId: output.promptId,
                        createdById: response.userId,
                        response: response.reasoning,
                        multipleChoiceResponse: response.selectedOption,
                        isMultipleChoice: true,
                        isOpenEnded: false,
                        isVote: false,
                        vote: 'CONFLICTED',
                    },
                });
            }
        } else if (output.schemaVersion === 2 && output.questionType === 'VOTE') {
            for (const response of output.responses) {
                await tx.eventLiveFeedbackPromptResponse.create({
                    data: {
                        promptId: output.promptId,
                        createdById: response.userId,
                        response: response.reasoning,
                        multipleChoiceResponse: '',
                        isMultipleChoice: false,
                        isOpenEnded: false,
                        isVote: true,
                        vote: response.vote,
                    },
                });
            }
        } else if (output.schemaVersion === 2 && output.questionType === 'OPEN_ENDED') {
            for (const response of output.responses) {
                await tx.eventLiveFeedbackPromptResponse.create({
                    data: {
                        promptId: output.promptId,
                        createdById: response.userId,
                        response: response.response,
                        multipleChoiceResponse: '',
                        isMultipleChoice: false,
                        isOpenEnded: true,
                        isVote: false,
                        vote: 'CONFLICTED',
                    },
                });
            }
        }
    });
    return {
        runId: output.runId,
        promptId: output.promptId,
        insertedCount: output.responses.length,
        participantKeys: output.responses.map(({ participantKey }) => participantKey),
    };
}

/** Parse, preflight, and transactionally import all Round 1 responses. */
export async function importRound1Responses(prisma: PrismaClient, json: unknown): Promise<Round1ImportSummary> {
    const output = parseRound1Output(json);
    await preflightRound1Import(prisma, output);
    return persistRound1Responses(prisma, output);
}
