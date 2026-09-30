import type { PrismaClient } from '@local/__generated__/prisma';
import { Round1PrepareError } from './prepareRound1';
import { runAuthorizedRound1, RunRound1MutationInput } from './runRound1Mutation';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';
const VIEWER_ID = '531be5ae-6df9-47e2-a86d-8ee44062ab79';
const prisma = {} as PrismaClient;

function makeInput(overrides: Partial<RunRound1MutationInput> = {}): RunRound1MutationInput {
    return {
        eventId: EVENT_ID,
        promptId: PROMPT_ID,
        force: false,
        ...overrides,
    };
}

function makeDependencies() {
    return {
        canModify: jest.fn().mockResolvedValue(true),
        loadSettings: jest.fn().mockResolvedValue({
            simulationEnabled: true,
            simulationParticipantCount: 3,
            simulationTopic: 'persisted topic',
            simulationBackground: 'Persisted background.',
            simulationCovariates: ['gender', 'education', 'politics'],
        }),
        run: jest.fn().mockResolvedValue({
            runId: 'fgdt-test-run',
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 3,
            insertedCount: 3,
            dryRun: false,
        }),
    };
}

describe('runAuthorizedRound1', () => {
    test('invokes the existing Round 1 orchestration exactly once for an authorized user', async () => {
        const dependencies = makeDependencies();

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).resolves.toMatchObject({
            runId: 'fgdt-test-run',
            participantCount: 3,
            insertedCount: 3,
        });

        expect(dependencies.canModify).toHaveBeenCalledWith(VIEWER_ID, EVENT_ID, prisma);
        expect(dependencies.run).toHaveBeenCalledTimes(1);
        expect(dependencies.run).toHaveBeenCalledWith(prisma, {
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 3,
            topic: 'persisted topic',
            background: 'Persisted background.',
            force: false,
            dryRun: false,
        });
    });

    test('ignores untrusted client copies and uses persisted event settings', async () => {
        const dependencies = makeDependencies();
        const input = {
            ...makeInput(),
            participantCount: 20,
            topic: 'client topic',
            background: 'client background',
        } as RunRound1MutationInput;

        await runAuthorizedRound1(VIEWER_ID, prisma, input, dependencies);

        expect(dependencies.run).toHaveBeenCalledWith(
            prisma,
            expect.objectContaining({
                participantCount: 3,
                topic: 'persisted topic',
                background: 'Persisted background.',
            })
        );
    });

    test('rejects an event with simulation disabled', async () => {
        const dependencies = makeDependencies();
        dependencies.loadSettings.mockResolvedValue({
            simulationEnabled: false,
            simulationParticipantCount: 3,
            simulationTopic: 'persisted topic',
            simulationBackground: 'Persisted background.',
            simulationCovariates: ['gender', 'education', 'politics'],
        });

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: 'Simulation is disabled for this event.',
        });
        expect(dependencies.run).not.toHaveBeenCalled();
    });

    test.each([
        [{ simulationParticipantCount: 0 }, 'participant count'],
        [{ simulationTopic: '' }, 'topic is required'],
        [{ simulationBackground: '' }, 'background is required'],
        [{ simulationCovariates: [] }, 'At least one simulation covariate'],
    ])('rejects incomplete persisted settings: %j', async (override, expectedMessage) => {
        const dependencies = makeDependencies();
        dependencies.loadSettings.mockResolvedValue({
            simulationEnabled: true,
            simulationParticipantCount: 3,
            simulationTopic: 'persisted topic',
            simulationBackground: 'Persisted background.',
            simulationCovariates: ['gender', 'education', 'politics'],
            ...override,
        });

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: expect.stringContaining(expectedMessage),
        });
        expect(dependencies.run).not.toHaveBeenCalled();
    });

    test('rejects an unauthorized user without invoking Round 1', async () => {
        const dependencies = makeDependencies();
        dependencies.canModify.mockResolvedValue(false);

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: 'Insufficient permissions',
        });
        expect(dependencies.run).not.toHaveBeenCalled();
    });

    test('returns a clear error when the prompt does not belong to the event', async () => {
        const dependencies = makeDependencies();
        dependencies.run.mockRejectedValue(
            new Round1PrepareError(`Prompt ${PROMPT_ID} does not belong to event ${EVENT_ID}.`)
        );

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: `Prompt ${PROMPT_ID} does not belong to event ${EVENT_ID}.`,
        });
        expect(dependencies.run).toHaveBeenCalledTimes(1);
    });

    test('returns a clear error for malformed question-type flags', async () => {
        const dependencies = makeDependencies();
        dependencies.run.mockRejectedValue(
            new Round1PrepareError('Prompt must have exactly one active question-type flag.')
        );

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: 'Prompt must have exactly one active question-type flag.',
        });
    });
});
