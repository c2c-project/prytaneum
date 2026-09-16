import { toGlobalId } from 'graphql-relay';
import { runAuthorizedRound1 } from './simulation/runRound1Mutation';
import { resolvers } from './resolvers';

jest.mock('./simulation/runRound1Mutation', () => ({
    runAuthorizedRound1: jest.fn(),
}));

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';
const VIEWER_ID = '531be5ae-6df9-47e2-a86d-8ee44062ab79';
const mutation = (resolvers.Mutation as Record<string, (...args: any[]) => any>).runRound1Simulation;
const mockedRunAuthorizedRound1 = runAuthorizedRound1 as jest.Mock;

function makeContext(viewerId: string | null = VIEWER_ID) {
    return {
        viewer: { id: viewerId },
        prisma: {},
    };
}

function makeArgs() {
    return {
        input: {
            eventId: toGlobalId('Event', EVENT_ID),
            promptId: toGlobalId('EventLiveFeedbackPrompt', PROMPT_ID),
            participantCount: 3,
            topic: 'nuclear power',
            background: 'Background facts.',
            force: true,
        },
    };
}

describe('runRound1Simulation resolver', () => {
    beforeEach(() => mockedRunAuthorizedRound1.mockReset());

    test('decodes current UI IDs and invokes the authorized service once', async () => {
        mockedRunAuthorizedRound1.mockResolvedValue({
            runId: 'fgdt-test-run',
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 3,
            insertedCount: 3,
            dryRun: false,
        });

        await expect(mutation(undefined, makeArgs(), makeContext())).resolves.toEqual({
            isError: false,
            message: '',
            body: expect.objectContaining({ runId: 'fgdt-test-run', insertedCount: 3 }),
        });
        expect(mockedRunAuthorizedRound1).toHaveBeenCalledTimes(1);
        expect(mockedRunAuthorizedRound1).toHaveBeenCalledWith(VIEWER_ID, {}, {
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 3,
            topic: 'nuclear power',
            background: 'Background facts.',
            force: true,
        });
    });

    test('rejects a request without an authenticated viewer', async () => {
        await expect(mutation(undefined, makeArgs(), makeContext(null))).resolves.toMatchObject({
            isError: true,
            message: 'Must be logged in',
            body: null,
        });
        expect(mockedRunAuthorizedRound1).not.toHaveBeenCalled();
    });

    test('rejects IDs for the wrong GraphQL entity types', async () => {
        const args = makeArgs();
        args.input.promptId = toGlobalId('Event', PROMPT_ID);

        await expect(mutation(undefined, args, makeContext())).resolves.toMatchObject({
            isError: true,
            message: 'Invalid eventId or promptId.',
            body: null,
        });
        expect(mockedRunAuthorizedRound1).not.toHaveBeenCalled();
    });
});
