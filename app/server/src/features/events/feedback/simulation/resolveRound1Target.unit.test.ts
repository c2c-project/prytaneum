import { prismaMock } from '../../../../../mocks/prisma/singleton';
import { resolveRound1Target } from './resolveRound1Target';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';

describe('resolveRound1Target', () => {
    test('resolves an event by exact title', async () => {
        prismaMock.event.findMany.mockResolvedValue([{ id: EVENT_ID }] as any);

        const target = await resolveRound1Target(prismaMock, {
            eventTitle: 'Nuclear Energy Forum',
            promptId: PROMPT_ID,
        });

        expect(target).toEqual({ eventId: EVENT_ID, promptId: PROMPT_ID });
        expect(prismaMock.event.findMany).toHaveBeenCalledWith({
            where: { title: 'Nuclear Energy Forum' },
            select: { id: true },
            take: 2,
        });
    });

    test('resolves a prompt by exact text within the resolved event', async () => {
        prismaMock.event.findMany.mockResolvedValue([{ id: EVENT_ID }] as any);
        prismaMock.eventLiveFeedbackPrompt.findMany.mockResolvedValue([{ id: PROMPT_ID }] as any);

        const target = await resolveRound1Target(prismaMock, {
            eventTitle: 'Nuclear Energy Forum',
            promptText: 'Should nuclear power be expanded?',
        });

        expect(target).toEqual({ eventId: EVENT_ID, promptId: PROMPT_ID });
        expect(prismaMock.eventLiveFeedbackPrompt.findMany).toHaveBeenCalledWith({
            where: { eventId: EVENT_ID, prompt: 'Should nuclear power be expanded?' },
            select: { id: true },
            take: 2,
        });
    });

    test('rejects no event title match', async () => {
        prismaMock.event.findMany.mockResolvedValue([]);

        await expect(resolveRound1Target(prismaMock, { eventTitle: 'Missing', promptId: PROMPT_ID })).rejects.toThrow(
            'No event found with exact title: "Missing"'
        );
    });

    test('rejects an ambiguous event title and directs the user to --event', async () => {
        prismaMock.event.findMany.mockResolvedValue([{ id: EVENT_ID }, { id: 'other-event' }] as any);

        await expect(resolveRound1Target(prismaMock, { eventTitle: 'Duplicate', promptId: PROMPT_ID })).rejects.toThrow(
            'use --event <raw-event-uuid>'
        );
    });

    test('rejects no prompt text match', async () => {
        prismaMock.eventLiveFeedbackPrompt.findMany.mockResolvedValue([]);

        await expect(resolveRound1Target(prismaMock, { eventId: EVENT_ID, promptText: 'Missing' })).rejects.toThrow(
            `No prompt found in event ${EVENT_ID} with exact text: "Missing"`
        );
    });

    test('rejects ambiguous prompt text and directs the user to --prompt', async () => {
        prismaMock.eventLiveFeedbackPrompt.findMany.mockResolvedValue([
            { id: PROMPT_ID },
            { id: 'other-prompt' },
        ] as any);

        await expect(resolveRound1Target(prismaMock, { eventId: EVENT_ID, promptText: 'Duplicate' })).rejects.toThrow(
            'use --prompt <raw-prompt-uuid>'
        );
    });

    test('returns raw UUIDs unchanged without querying', async () => {
        await expect(resolveRound1Target(prismaMock, { eventId: EVENT_ID, promptId: PROMPT_ID })).resolves.toEqual({
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
        });
        expect(prismaMock.event.findMany).not.toHaveBeenCalled();
        expect(prismaMock.eventLiveFeedbackPrompt.findMany).not.toHaveBeenCalled();
    });

    test('supports both mixed identifier modes', async () => {
        prismaMock.eventLiveFeedbackPrompt.findMany.mockResolvedValue([{ id: PROMPT_ID }] as any);
        await expect(resolveRound1Target(prismaMock, { eventId: EVENT_ID, promptText: 'Prompt' })).resolves.toEqual({
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
        });

        jest.clearAllMocks();
        prismaMock.event.findMany.mockResolvedValue([{ id: EVENT_ID }] as any);
        await expect(resolveRound1Target(prismaMock, { eventTitle: 'Event', promptId: PROMPT_ID })).resolves.toEqual({
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
        });
    });
});
