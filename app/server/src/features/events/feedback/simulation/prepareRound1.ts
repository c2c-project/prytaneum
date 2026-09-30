import { randomUUID } from 'crypto';
import type { PrismaClient } from '@local/__generated__/prisma';
import { FGDT_DUMMY_USER_COUNT, getFgdtDummyUserIdentity } from './dummyUsers';
import { isRound1PromptUnpublished } from './round1PromptEligibility';
import { sampleRound1Participants } from './sampleRound1Participants';
import type { Round1Random } from './sampleRound1Participants';
import { normalizeRound1CovariateKeys, Round1CovariateKey, selectRound1Covariates } from './round1Covariates';
import { ROUND1_PERSONAS } from './round1Personas';
import { deriveRound1QuestionType, Round1Input, Round1Question, Round1QuestionTypeError } from './round1Types';

export type { Round1PersonaCovariates } from './round1Covariates';
export type { Round1Input, Round1InputParticipant } from './round1Types';

export type PrepareRound1InputParams = {
    eventId: string;
    promptId: string;
    participantCount: number;
    topic: string;
    background: string;
    force?: boolean;
    runId?: string;
};

export class Round1PrepareError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1PrepareError';
    }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function requireNonemptyString(value: string, fieldName: string): string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Round1PrepareError(`${fieldName} must be a nonempty string.`);
    }
    return value;
}

function requireRawUuid(value: string, fieldName: string): string {
    const uuid = requireNonemptyString(value, fieldName);
    if (!UUID_PATTERN.test(uuid)) throw new Round1PrepareError(`${fieldName} must be a raw Prisma UUID.`);
    return uuid;
}

function makeRunId(promptId: string): string {
    return `fgdt-${promptId.slice(0, 8)}-${randomUUID()}`;
}

function validateOptions(options: string[]): void {
    if (options.length < 2 || options.length > 20) {
        throw new Round1PrepareError('Prompt must have between 2 and 20 multiple-choice options.');
    }
    options.forEach((option, index) => {
        requireNonemptyString(option, `Prompt option ${index + 1}`);
        if (Array.from(option).length > 250)
            throw new Round1PrepareError(`Prompt option ${index + 1} must be at most 250 characters.`);
    });
    if (new Set(options).size !== options.length) {
        throw new Round1PrepareError('Prompt options must be unique.');
    }
}

/** Build an FGDT Round 1 input from authoritative Prytaneum data without writing to the database. */
export async function prepareRound1Input(
    prisma: PrismaClient,
    params: PrepareRound1InputParams,
    random: Round1Random = Math.random
): Promise<Round1Input> {
    const eventId = requireRawUuid(params.eventId, 'eventId');
    const promptId = requireRawUuid(params.promptId, 'promptId');
    const topic = requireNonemptyString(params.topic, 'topic');
    const background = requireNonemptyString(params.background, 'background');

    if (!Number.isInteger(params.participantCount)) {
        throw new Round1PrepareError('participantCount must be an integer.');
    }
    if (params.participantCount < 1 || params.participantCount > FGDT_DUMMY_USER_COUNT) {
        throw new Round1PrepareError(`participantCount must be between 1 and ${FGDT_DUMMY_USER_COUNT}.`);
    }

    const runId = params.runId === undefined ? makeRunId(promptId) : requireNonemptyString(params.runId, 'runId');

    const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { id: true, simulationCovariates: true },
    });
    if (!event) throw new Round1PrepareError(`Event ${eventId} does not exist.`);
    let selectedCovariates: Round1CovariateKey[];
    try {
        selectedCovariates = normalizeRound1CovariateKeys(event.simulationCovariates);
    } catch (error) {
        throw new Round1PrepareError(error instanceof Error ? error.message : String(error));
    }

    const prompt = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: {
            eventId: true,
            prompt: true,
            isMultipleChoice: true,
            isOpenEnded: true,
            isVote: true,
            isDraft: true,
            multipleChoiceOptions: true,
            reasoningType: true,
            flows: { select: { feedbackFlow: { select: { isDraft: true } } } },
        },
    });
    if (!prompt) throw new Round1PrepareError(`Prompt ${promptId} does not exist.`);
    if (prompt.eventId !== eventId) {
        throw new Round1PrepareError(`Prompt ${promptId} does not belong to event ${eventId}.`);
    }
    let questionType: Round1Question['questionType'];
    try {
        questionType = deriveRound1QuestionType(prompt);
    } catch (error) {
        if (error instanceof Round1QuestionTypeError) throw new Round1PrepareError(error.message);
        throw error;
    }
    if (!isRound1PromptUnpublished(prompt)) {
        throw new Round1PrepareError('Simulation is only available for draft/unpublished surveys.');
    }
    const question = requireNonemptyString(prompt.prompt, 'Prompt question');
    if (questionType === 'MULTIPLE_CHOICE') validateOptions(prompt.multipleChoiceOptions);

    const expectedIdentities = Array.from({ length: FGDT_DUMMY_USER_COUNT }, (_, index) => ({
        ...getFgdtDummyUserIdentity(index + 1),
        personaIndex: index,
    }));
    const users = await prisma.user.findMany({
        where: { email: { in: expectedIdentities.map(({ email }) => email) } },
        select: { id: true, email: true },
    });
    const userByEmail = new Map(users.map((user) => [user.email, user]));
    const missingUsers = expectedIdentities.filter(({ email }) => !userByEmail.has(email));
    if (missingUsers.length > 0) {
        throw new Round1PrepareError(
            `Missing FGDT dummy user(s): ${missingUsers.map(({ participantKey }) => participantKey).join(', ')}. ` +
                'Run the seed-fgdt-users command first.'
        );
    }

    const existingResponses = await prisma.eventLiveFeedbackPromptResponse.findMany({
        where: { promptId, createdById: { in: users.map(({ id }) => id) } },
        select: { createdById: true },
    });
    const usedUserIds = new Set(existingResponses.map(({ createdById }) => createdById));
    const eligibleIdentities = expectedIdentities.filter(({ email }) => !usedUserIds.has(userByEmail.get(email)!.id));
    if (params.participantCount > eligibleIdentities.length) {
        throw new Round1PrepareError(
            `Only ${eligibleIdentities.length} unused simulated participants remain for this survey, ` +
                `but ${params.participantCount} were requested.`
        );
    }

    const selectedIdentities = sampleRound1Participants(eligibleIdentities, params.participantCount, random);
    const participants = selectedIdentities.map(({ participantKey, email, personaIndex }) => ({
        participantKey,
        userId: userByEmail.get(email)!.id,
        persona: { covariates: selectRound1Covariates(ROUND1_PERSONAS[personaIndex], selectedCovariates) },
    }));

    const commonInput = {
        schemaVersion: 2 as const,
        runId,
        eventId,
        promptId,
        question,
        topic,
        background,
        generation: { force: params.force ?? false },
        participants,
    };
    if (questionType === 'MULTIPLE_CHOICE') {
        return {
            ...commonInput,
            questionType,
            options: [...prompt.multipleChoiceOptions],
            reasoningType: prompt.reasoningType,
        };
    }
    if (questionType === 'VOTE') return { ...commonInput, questionType, reasoningType: prompt.reasoningType };
    return { ...commonInput, questionType };
}
