import { prismaMock } from '../../../../../mocks/prisma/singleton';
import { prepareRound1Input, PrepareRound1InputParams } from './prepareRound1';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const OTHER_EVENT_ID = 'cc0f08b4-bcb0-4d3b-b07d-918339f4a220';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';
const QUESTION = 'Should the region build a new nuclear power plant?';
const OPTIONS = ['Support building the plant', 'Oppose building the plant', 'Need more information'];

function makeParams(overrides: Partial<PrepareRound1InputParams> = {}): PrepareRound1InputParams {
    return {
        eventId: EVENT_ID,
        promptId: PROMPT_ID,
        participantCount: 2,
        topic: 'the adoption of nuclear power',
        background: 'The region is considering a new nuclear power plant.',
        runId: 'fgdt-test-run',
        ...overrides,
    };
}

function makePrompt(overrides: Record<string, unknown> = {}) {
    return {
        eventId: EVENT_ID,
        prompt: QUESTION,
        isMultipleChoice: true,
        isOpenEnded: false,
        isVote: false,
        multipleChoiceOptions: OPTIONS,
        ...overrides,
    };
}

function makeUsers(count: number) {
    return Array.from({ length: count }, (_, index) => {
        const number = (index + 1).toString().padStart(2, '0');
        return {
            id: `00000000-0000-0000-0000-${(index + 1).toString().padStart(12, '0')}`,
            email: `fgdt-demo-${number}@prytaneum.invalid`,
        };
    });
}

function mockValidDatabase(participantCount = 2) {
    prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
    prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
    prismaMock.user.findMany.mockResolvedValue(makeUsers(participantCount) as any);
}

describe('prepareRound1Input', () => {
    test('prepares the exact FGDT v1 structure from authoritative prompt data', async () => {
        mockValidDatabase();

        const input = await prepareRound1Input(prismaMock, makeParams());

        expect(input).toEqual({
            schemaVersion: 1,
            runId: 'fgdt-test-run',
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            question: QUESTION,
            topic: 'the adoption of nuclear power',
            background: 'The region is considering a new nuclear power plant.',
            options: OPTIONS,
            generation: { force: false },
            participants: [
                {
                    participantKey: 'fgdt-demo-01',
                    userId: '00000000-0000-0000-0000-000000000001',
                    persona: {
                        covariates: {
                            gender: 'female',
                            education: 'Bachelor\'s degree',
                            politics: 'liberal',
                        },
                    },
                },
                {
                    participantKey: 'fgdt-demo-02',
                    userId: '00000000-0000-0000-0000-000000000002',
                    persona: {
                        covariates: { gender: 'male', education: 'High school', politics: 'conservative' },
                    },
                },
            ],
        });
        expect(JSON.parse(JSON.stringify(input))).toEqual(input);
        expect(prismaMock.eventLiveFeedbackPrompt.findUnique).toHaveBeenCalledWith({
            where: { id: PROMPT_ID },
            select: {
                eventId: true,
                prompt: true,
                isMultipleChoice: true,
                isOpenEnded: true,
                isVote: true,
                multipleChoiceOptions: true,
            },
        });
    });

    test('generates a readable runId when none is supplied', async () => {
        mockValidDatabase();

        const input = await prepareRound1Input(prismaMock, makeParams({ runId: undefined }));

        expect(input.runId).toMatch(/^fgdt-90990f38-\d+$/);
    });

    test('rejects a missing Event', async () => {
        prismaMock.event.findUnique.mockResolvedValue(null);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(`Event ${EVENT_ID} does not exist`);
    });

    test('rejects a missing Prompt', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(null);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(
            `Prompt ${PROMPT_ID} does not exist`
        );
    });

    test('rejects a Prompt belonging to another Event', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt({ eventId: OTHER_EVENT_ID }) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow('does not belong to event');
    });

    test.each([
        ['not multiple choice', { isMultipleChoice: false }],
        ['open-ended', { isOpenEnded: true }],
        ['vote', { isVote: true }],
    ])('rejects a wrong prompt type: %s', async (_description, override) => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt(override) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(
            'must be a non-vote, non-open-ended multiple-choice prompt'
        );
    });

    test.each([
        [['Only one'], 'between 2 and 20'],
        [['Yes', ''], 'nonempty'],
        [['Yes', 'Yes'], 'unique'],
        [Array.from({ length: 21 }, (_, index) => `Option ${index}`), 'between 2 and 20'],
        [['Yes', 'x'.repeat(251)], 'at most 250 characters'],
    ])('rejects invalid prompt options: %j', async (multipleChoiceOptions, message) => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt({ multipleChoiceOptions }) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(message);
    });

    test.each([0, 21])('rejects participantCount %s', async (participantCount) => {
        await expect(prepareRound1Input(prismaMock, makeParams({ participantCount }))).rejects.toThrow(
            'participantCount must be between 1 and 20'
        );
        expect(prismaMock.event.findUnique).not.toHaveBeenCalled();
    });

    test('rejects a missing expected dummy user without creating one', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
        prismaMock.user.findMany.mockResolvedValue(makeUsers(1) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow('fgdt-demo-02');
        expect(prismaMock.user.create).not.toHaveBeenCalled();
        expect(prismaMock.user.upsert).not.toHaveBeenCalled();
    });

    test('keeps participant ordering and persona assignment deterministic regardless of database order', async () => {
        const reversedUsers = makeUsers(3).reverse();
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
        prismaMock.user.findMany.mockResolvedValue(reversedUsers as any);

        const first = await prepareRound1Input(prismaMock, makeParams({ participantCount: 3 }));
        const second = await prepareRound1Input(prismaMock, makeParams({ participantCount: 3 }));

        expect(first.participants).toEqual(second.participants);
        expect(first.participants.map(({ participantKey }) => participantKey)).toEqual([
            'fgdt-demo-01',
            'fgdt-demo-02',
            'fgdt-demo-03',
        ]);
        expect(first.participants.map(({ persona }) => persona.covariates)).toEqual([
            { gender: 'female', education: 'Bachelor\'s degree', politics: 'liberal' },
            { gender: 'male', education: 'High school', politics: 'conservative' },
            { gender: 'female', education: 'Graduate degree', politics: 'moderate' },
        ]);
    });

    test('copies the exact database question and ordered options without allowing overrides', async () => {
        const exactOptions = ['Option B ', 'Option A'];
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(
            makePrompt({ prompt: ' Exact database question? ', multipleChoiceOptions: exactOptions }) as any
        );
        prismaMock.user.findMany.mockResolvedValue(makeUsers(2) as any);

        const input = await prepareRound1Input(prismaMock, makeParams());

        expect(input.question).toBe(' Exact database question? ');
        expect(input.options).toEqual(exactOptions);
    });
});
