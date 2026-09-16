import type { PrismaClient } from '@local/__generated__/prisma';
import { errors } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import { canUserModify } from '../../methods';
import { Round1ImportError } from './importRound1';
import { Round1PrepareError } from './prepareRound1';
import { runRound1, RunRound1Summary } from './runRound1';

export type RunRound1MutationInput = {
    eventId: string;
    promptId: string;
    participantCount: number;
    topic: string;
    background: string;
    force?: boolean;
};

type Dependencies = {
    canModify: typeof canUserModify;
    run: typeof runRound1;
};

const defaultDependencies: Dependencies = {
    canModify: canUserModify,
    run: runRound1,
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateInput(input: RunRound1MutationInput): void {
    if (!UUID_PATTERN.test(input.eventId)) throw new ProtectedError({ userMessage: 'eventId must be a valid UUID.' });
    if (!UUID_PATTERN.test(input.promptId))
        throw new ProtectedError({ userMessage: 'promptId must be a valid UUID.' });
    if (!Number.isInteger(input.participantCount) || input.participantCount < 1 || input.participantCount > 20) {
        throw new ProtectedError({ userMessage: 'participantCount must be an integer between 1 and 20.' });
    }
    if (typeof input.topic !== 'string' || input.topic.trim().length === 0) {
        throw new ProtectedError({ userMessage: 'topic must be a nonempty string.' });
    }
    if (typeof input.background !== 'string' || input.background.trim().length === 0) {
        throw new ProtectedError({ userMessage: 'background must be a nonempty string.' });
    }
}

/** Authorize and invoke the existing Round 1 orchestration for the GraphQL mutation. */
export async function runAuthorizedRound1(
    viewerId: string,
    prisma: PrismaClient,
    input: RunRound1MutationInput,
    dependencyOverrides: Partial<Dependencies> = {}
): Promise<RunRound1Summary> {
    validateInput(input);
    const dependencies = { ...defaultDependencies, ...dependencyOverrides };
    if (!(await dependencies.canModify(viewerId, input.eventId, prisma))) {
        throw new ProtectedError({
            userMessage: errors.permissions,
            internalMessage: `User ${viewerId} attempted to run Round 1 for event ${input.eventId} without permission.`,
        });
    }

    try {
        return await dependencies.run(prisma, {
            eventId: input.eventId,
            promptId: input.promptId,
            participantCount: input.participantCount,
            topic: input.topic,
            background: input.background,
            force: input.force ?? false,
            dryRun: false,
        });
    } catch (error) {
        if (error instanceof Round1PrepareError || error instanceof Round1ImportError) {
            throw new ProtectedError({ userMessage: error.message });
        }
        throw error;
    }
}
