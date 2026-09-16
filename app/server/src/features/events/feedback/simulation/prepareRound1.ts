import type { PrismaClient } from '@local/__generated__/prisma';
import { FGDT_DUMMY_USER_COUNT, getFgdtDummyUserIdentity } from './dummyUsers';

export type Round1PersonaCovariates = {
    gender: string;
    education: string;
    politics: string;
};

export type Round1InputParticipant = {
    participantKey: string;
    userId: string;
    persona: { covariates: Round1PersonaCovariates };
};

export type Round1Input = {
    schemaVersion: 1;
    runId: string;
    eventId: string;
    promptId: string;
    question: string;
    topic: string;
    background: string;
    options: string[];
    generation: {
        force: boolean;
    };
    participants: Round1InputParticipant[];
};

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

const PERSONAS: Round1PersonaCovariates[] = [
    { gender: 'female', education: 'Bachelor\'s degree', politics: 'liberal' },
    { gender: 'male', education: 'High school', politics: 'conservative' },
    { gender: 'female', education: 'Graduate degree', politics: 'moderate' },
    { gender: 'male', education: 'Some college', politics: 'liberal' },
    { gender: 'female', education: 'High school', politics: 'moderate' },
    { gender: 'male', education: 'Bachelor\'s degree', politics: 'conservative' },
    { gender: 'female', education: 'Some college', politics: 'liberal' },
    { gender: 'male', education: 'Graduate degree', politics: 'moderate' },
    { gender: 'female', education: 'Bachelor\'s degree', politics: 'conservative' },
    { gender: 'male', education: 'High school', politics: 'liberal' },
    { gender: 'female', education: 'Graduate degree', politics: 'moderate' },
    { gender: 'male', education: 'Some college', politics: 'conservative' },
    { gender: 'female', education: 'High school', politics: 'liberal' },
    { gender: 'male', education: 'Bachelor\'s degree', politics: 'moderate' },
    { gender: 'female', education: 'Some college', politics: 'conservative' },
    { gender: 'male', education: 'Graduate degree', politics: 'liberal' },
    { gender: 'female', education: 'Bachelor\'s degree', politics: 'moderate' },
    { gender: 'male', education: 'High school', politics: 'conservative' },
    { gender: 'female', education: 'Graduate degree', politics: 'liberal' },
    { gender: 'male', education: 'Some college', politics: 'moderate' },
];

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
    return `fgdt-${promptId.slice(0, 8)}-${Date.now()}`;
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
export async function prepareRound1Input(prisma: PrismaClient, params: PrepareRound1InputParams): Promise<Round1Input> {
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

    const event = await prisma.event.findUnique({ where: { id: eventId }, select: { id: true } });
    if (!event) throw new Round1PrepareError(`Event ${eventId} does not exist.`);

    const prompt = await prisma.eventLiveFeedbackPrompt.findUnique({
        where: { id: promptId },
        select: {
            eventId: true,
            prompt: true,
            isMultipleChoice: true,
            isOpenEnded: true,
            isVote: true,
            multipleChoiceOptions: true,
        },
    });
    if (!prompt) throw new Round1PrepareError(`Prompt ${promptId} does not exist.`);
    if (prompt.eventId !== eventId) {
        throw new Round1PrepareError(`Prompt ${promptId} does not belong to event ${eventId}.`);
    }
    if (!prompt.isMultipleChoice || prompt.isOpenEnded || prompt.isVote) {
        throw new Round1PrepareError(`Prompt ${promptId} must be a non-vote, non-open-ended multiple-choice prompt.`);
    }
    const question = requireNonemptyString(prompt.prompt, 'Prompt question');
    validateOptions(prompt.multipleChoiceOptions);

    const expectedIdentities = Array.from({ length: params.participantCount }, (_, index) =>
        getFgdtDummyUserIdentity(index + 1)
    );
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

    const participants = expectedIdentities.map(({ participantKey, email }, index) => ({
        participantKey,
        userId: userByEmail.get(email)!.id,
        persona: { covariates: { ...PERSONAS[index] } },
    }));

    return {
        schemaVersion: 1,
        runId,
        eventId,
        promptId,
        question,
        topic,
        background,
        options: [...prompt.multipleChoiceOptions],
        generation: { force: params.force ?? false },
        participants,
    };
}
