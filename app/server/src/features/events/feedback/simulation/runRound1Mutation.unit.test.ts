import type { PrismaClient } from '@local/__generated__/prisma';
import { ProtectedError } from '@local/lib/ProtectedError';
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
        participantCount: 2,
        topic: 'nuclear power',
        background: 'Background facts.',
        force: false,
        ...overrides,
    };
}

function makeDependencies() {
    return {
        canModify: jest.fn().mockResolvedValue(true),
        run: jest.fn().mockResolvedValue({
            runId: 'fgdt-test-run',
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 2,
            insertedCount: 2,
            dryRun: false,
        }),
    };
}

describe('runAuthorizedRound1', () => {
    test('invokes the existing Round 1 orchestration exactly once for an authorized user', async () => {
        const dependencies = makeDependencies();

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).resolves.toMatchObject({
            runId: 'fgdt-test-run',
            participantCount: 2,
            insertedCount: 2,
        });

        expect(dependencies.canModify).toHaveBeenCalledWith(VIEWER_ID, EVENT_ID, prisma);
        expect(dependencies.run).toHaveBeenCalledTimes(1);
        expect(dependencies.run).toHaveBeenCalledWith(prisma, {
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 2,
            topic: 'nuclear power',
            background: 'Background facts.',
            force: false,
            dryRun: false,
        });
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

    test('returns a clear error for an ineligible non-multiple-choice prompt', async () => {
        const dependencies = makeDependencies();
        dependencies.run.mockRejectedValue(
            new Round1PrepareError(
                `Prompt ${PROMPT_ID} must be a non-vote, non-open-ended multiple-choice prompt.`
            )
        );

        await expect(runAuthorizedRound1(VIEWER_ID, prisma, makeInput(), dependencies)).rejects.toMatchObject({
            userMessage: `Prompt ${PROMPT_ID} must be a non-vote, non-open-ended multiple-choice prompt.`,
        });
    });

    test.each([0, 1.5, 21])('rejects invalid participantCount %s before authorization', async (participantCount) => {
        const dependencies = makeDependencies();

        await expect(
            runAuthorizedRound1(VIEWER_ID, prisma, makeInput({ participantCount }), dependencies)
        ).rejects.toBeInstanceOf(ProtectedError);
        expect(dependencies.canModify).not.toHaveBeenCalled();
        expect(dependencies.run).not.toHaveBeenCalled();
    });
});
