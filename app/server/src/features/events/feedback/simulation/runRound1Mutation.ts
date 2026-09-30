import type { PrismaClient } from '@local/__generated__/prisma';
import { errors } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import { canUserModify } from '../../methods';
import { Round1ImportError } from './importRound1';
import { Round1PrepareError } from './prepareRound1';
import { normalizeRound1CovariateKeys } from './round1Covariates';
import { runRound1, RunRound1Summary } from './runRound1';

export type RunRound1MutationInput = {
    eventId: string;
    promptId: string;
    force?: boolean;
};

type EventSimulationSettings = {
    simulationEnabled: boolean;
    simulationParticipantCount: number;
    simulationTopic: string;
    simulationBackground: string;
    simulationCovariates: string[];
};

async function loadEventSimulationSettings(
    prisma: PrismaClient,
    eventId: string
): Promise<EventSimulationSettings | null> {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: {
            simulationEnabled: true,
            simulationParticipantCount: true,
            simulationTopic: true,
            simulationBackground: true,
            simulationCovariates: true,
        },
    });
}

type Dependencies = {
    canModify: typeof canUserModify;
    loadSettings: typeof loadEventSimulationSettings;
    run: typeof runRound1;
};

const defaultDependencies: Dependencies = {
    canModify: canUserModify,
    loadSettings: loadEventSimulationSettings,
    run: runRound1,
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateInput(input: RunRound1MutationInput): void {
    if (!UUID_PATTERN.test(input.eventId)) throw new ProtectedError({ userMessage: 'eventId must be a valid UUID.' });
    if (!UUID_PATTERN.test(input.promptId)) throw new ProtectedError({ userMessage: 'promptId must be a valid UUID.' });
}

function validatePersistedSettings(settings: EventSimulationSettings): void {
    if (!settings.simulationEnabled) {
        throw new ProtectedError({ userMessage: 'Simulation is disabled for this event.' });
    }
    if (
        !Number.isInteger(settings.simulationParticipantCount) ||
        settings.simulationParticipantCount < 1 ||
        settings.simulationParticipantCount > 20
    ) {
        throw new ProtectedError({
            userMessage: 'Simulation configuration is incomplete: participant count must be between 1 and 20.',
        });
    }
    if (settings.simulationTopic.trim().length === 0) {
        throw new ProtectedError({ userMessage: 'Simulation configuration is incomplete: topic is required.' });
    }
    if (settings.simulationBackground.trim().length === 0) {
        throw new ProtectedError({ userMessage: 'Simulation configuration is incomplete: background is required.' });
    }
    try {
        normalizeRound1CovariateKeys(settings.simulationCovariates);
    } catch (error) {
        throw new ProtectedError({
            userMessage: `Simulation configuration is incomplete: ${
                error instanceof Error ? error.message : String(error)
            }`,
        });
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

    const settings = await dependencies.loadSettings(prisma, input.eventId);
    if (!settings) throw new ProtectedError({ userMessage: 'Event not found.' });
    validatePersistedSettings(settings);

    try {
        return await dependencies.run(prisma, {
            eventId: input.eventId,
            promptId: input.promptId,
            participantCount: settings.simulationParticipantCount,
            topic: settings.simulationTopic,
            background: settings.simulationBackground,
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
