import type { PrismaClient } from '@local/__generated__/prisma';
import { isRound1PromptUnpublished } from './round1PromptEligibility';

type JsonRecord = Record<string, unknown>;

export type Round1Response = {
    participantKey: string;
    userId: string;
    standpointNum: number;
    selectedOption: string;
    reasoning: string;
};

export type Round1Output = {
    schemaVersion: 1;
    runId: string;
    eventId: string;
    promptId: string;
    model: string;
    generatedAt: string;
    options: string[];
    responses: Round1Response[];
};

export type Round1ImportSummary = {
    runId: string;
    promptId: string;
    insertedCount: number;
    participantKeys: string[];
};

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

function parseOptions(value: unknown): string[] {
    if (!Array.isArray(value) || value.length === 0) {
        throw new Round1ImportError('options must be a nonempty ordered array.');
    }
    const options = value.map((option, index) => requireNonemptyString(option, `options[${index}]`));
    if (new Set(options).size !== options.length) {
        throw new Round1ImportError('options must not contain duplicate values.');
    }
    return options;
}

function parseResponse(value: unknown, index: number, options: string[]): Round1Response {
    const response = requireRecord(value, `responses[${index}]`);
    const participantKey = requireNonemptyString(response.participantKey, `responses[${index}].participantKey`);
    const userId = requireUuid(response.userId, `responses[${index}].userId`);
    const standpointNum = response.standpointNum;
    if (!Number.isInteger(standpointNum)) {
        throw new Round1ImportError(`responses[${index}].standpointNum must be an integer.`);
    }
    const standpoint = standpointNum as number;
    if (standpoint < 1 || standpoint > options.length) {
        throw new Round1ImportError(`responses[${index}].standpointNum must be between 1 and ${options.length}.`);
    }

    const selectedOption = requireNonemptyString(response.selectedOption, `responses[${index}].selectedOption`);
    if (selectedOption !== options[standpoint - 1]) {
        throw new Round1ImportError(`responses[${index}].selectedOption does not match options[standpointNum - 1].`);
    }

    const reasoning = requireNonemptyString(response.reasoning, `responses[${index}].reasoning`);
    if (Array.from(reasoning).length > 500) {
        throw new Round1ImportError(`responses[${index}].reasoning must be at most 500 characters.`);
    }

    return { participantKey, userId, standpointNum: standpoint, selectedOption, reasoning };
}

/** Parse and validate an FGDT Round 1 output without accessing the database. */
export function parseRound1Output(json: unknown): Round1Output {
    const output = requireRecord(json, 'FGDT Round 1 output');
    if (output.schemaVersion !== 1) throw new Round1ImportError('schemaVersion must equal 1.');

    const runId = requireNonemptyString(output.runId, 'runId');
    const eventId = requireUuid(output.eventId, 'eventId');
    const promptId = requireUuid(output.promptId, 'promptId');
    const model = requireNonemptyString(output.model, 'model');
    if (model !== 'gemini-3.5-flash') throw new Round1ImportError('model must be gemini-3.5-flash.');
    const generatedAt = requireNonemptyString(output.generatedAt, 'generatedAt');
    const options = parseOptions(output.options);

    if (!Array.isArray(output.responses) || output.responses.length < 1 || output.responses.length > 20) {
        throw new Round1ImportError('responses must contain between 1 and 20 responses.');
    }
    const responses = output.responses.map((response, index) => parseResponse(response, index, options));

    const participantKeys = responses.map(({ participantKey }) => participantKey);
    if (new Set(participantKeys).size !== participantKeys.length) {
        throw new Round1ImportError('responses contain a duplicate participantKey.');
    }
    const userIds = responses.map(({ userId }) => userId);
    if (new Set(userIds).size !== userIds.length) {
        throw new Round1ImportError('responses contain a duplicate userId.');
    }

    return { schemaVersion: 1, runId, eventId, promptId, model, generatedAt, options, responses };
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
            flows: { select: { feedbackFlow: { select: { isDraft: true } } } },
        },
    });
    if (!prompt) throw new Round1ImportError(`Prompt ${output.promptId} does not exist.`);
    if (prompt.eventId !== output.eventId) {
        throw new Round1ImportError(`Prompt ${output.promptId} does not belong to event ${output.eventId}.`);
    }
    if (!prompt.isMultipleChoice) throw new Round1ImportError(`Prompt ${output.promptId} is not multiple choice.`);
    if (prompt.isVote) throw new Round1ImportError(`Prompt ${output.promptId} must not be a vote prompt.`);
    if (prompt.isOpenEnded) throw new Round1ImportError(`Prompt ${output.promptId} must not be open-ended.`);
    if (!isRound1PromptUnpublished(prompt)) {
        throw new Round1ImportError('Simulation is only available for draft/unpublished surveys.');
    }
    if (!arraysEqual(prompt.multipleChoiceOptions, output.options)) {
        throw new Round1ImportError('Prompt options do not exactly match the ordered FGDT output options.');
    }

    const userIds = output.responses.map(({ userId }) => userId);
    const users = await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true } });
    const existingUserIds = new Set(users.map(({ id }) => id));
    const missingUserIds = userIds.filter((userId) => !existingUserIds.has(userId));
    if (missingUserIds.length > 0) {
        throw new Round1ImportError(`User(s) do not exist: ${missingUserIds.join(', ')}.`);
    }

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

/** Transactionally persist FGDT Round 1 responses that have already been parsed and preflighted. */
export async function persistRound1Responses(prisma: PrismaClient, output: Round1Output): Promise<Round1ImportSummary> {
    await prisma.$transaction(async (tx) => {
        for (const response of output.responses) {
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
    });

    return {
        runId: output.runId,
        promptId: output.promptId,
        insertedCount: output.responses.length,
        participantKeys: output.responses.map(({ participantKey }) => participantKey),
    };
}

/** Parse, preflight, and transactionally import all FGDT Round 1 responses. */
export async function importRound1Responses(prisma: PrismaClient, json: unknown): Promise<Round1ImportSummary> {
    const output = parseRound1Output(json);
    await preflightRound1Import(prisma, output);
    return persistRound1Responses(prisma, output);
}
