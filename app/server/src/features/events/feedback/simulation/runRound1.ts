import type { PrismaClient } from '@local/__generated__/prisma';
import { parseRound1Output, persistRound1Responses, preflightRound1Import, Round1Output } from './importRound1';
import { prepareRound1Input, Round1Input } from './prepareRound1';
import { simulateRound1 } from './simulateRound1';

export type RunRound1Options = {
    eventId: string;
    promptId: string;
    participantCount: number;
    topic: string;
    background: string;
    force: boolean;
    dryRun: boolean;
};

export type RunRound1Summary = {
    runId: string;
    eventId: string;
    promptId: string;
    participantCount: number;
    insertedCount: number;
    dryRun: boolean;
};

export class Round1RunError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1RunError';
    }
}

type Dependencies = {
    prepare: typeof prepareRound1Input;
    simulate: typeof simulateRound1;
    parse: typeof parseRound1Output;
    preflight: typeof preflightRound1Import;
    persistResponses: typeof persistRound1Responses;
};

const defaultDependencies: Dependencies = {
    prepare: prepareRound1Input,
    simulate: simulateRound1,
    parse: parseRound1Output,
    preflight: preflightRound1Import,
    persistResponses: persistRound1Responses,
};

function assertEqual(actual: string, expected: string, fieldName: string): void {
    if (actual !== expected) {
        throw new Round1RunError(`Simulator output ${fieldName} does not match prepared input.`);
    }
}

/** Ensure simulator output belongs to the exact input prepared for this run. */
export function validateRound1OutputCorrelation(input: Round1Input, output: Round1Output): void {
    assertEqual(output.runId, input.runId, 'runId');
    assertEqual(output.eventId, input.eventId, 'eventId');
    assertEqual(output.promptId, input.promptId, 'promptId');
    assertEqual(output.reasoningType, input.reasoningType, 'reasoningType');

    if (
        output.options.length !== input.options.length ||
        output.options.some((option, index) => option !== input.options[index])
    ) {
        throw new Round1RunError('Simulator output options do not match prepared input in value and order.');
    }

    if (output.responses.length !== input.participants.length) {
        throw new Round1RunError('Simulator output participant count does not match prepared input.');
    }

    const expectedUserByParticipantKey = new Map(
        input.participants.map(({ participantKey, userId }) => [participantKey, userId])
    );
    for (const response of output.responses) {
        const expectedUserId = expectedUserByParticipantKey.get(response.participantKey);
        if (expectedUserId === undefined) {
            throw new Round1RunError(
                `Simulator output participantKey "${response.participantKey}" does not match prepared input.`
            );
        }
        if (response.userId !== expectedUserId) {
            throw new Round1RunError(
                `Simulator output userId for participantKey "${response.participantKey}" does not match prepared input.`
            );
        }
    }
}

/** Prepare, simulate, validate, and transactionally import an internal Round 1 run. */
export async function runRound1(
    prisma: PrismaClient,
    options: RunRound1Options,
    dependencyOverrides: Partial<Dependencies> = {}
): Promise<RunRound1Summary> {
    const dependencies = { ...defaultDependencies, ...dependencyOverrides };
    const input = await dependencies.prepare(prisma, options);
    const rawOutput = await dependencies.simulate(input);
    const output = dependencies.parse(rawOutput);
    validateRound1OutputCorrelation(input, output);
    const preflight = await dependencies.preflight(prisma, output);

    let insertedCount = 0;
    if (!options.dryRun) {
        const importSummary = await dependencies.persistResponses(prisma, output);
        insertedCount = importSummary.insertedCount;
    }

    return {
        runId: preflight.runId,
        eventId: preflight.eventId,
        promptId: preflight.promptId,
        participantCount: preflight.responseCount,
        insertedCount,
        dryRun: options.dryRun,
    };
}
