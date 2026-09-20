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
        isDraft: false,
        multipleChoiceOptions: OPTIONS,
        reasoningType: 'OPTIONAL',
        flows: [{ feedbackFlow: { isDraft: true } }],
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

function mockValidDatabase() {
    prismaMock.event.findUnique.mockResolvedValue({
        id: EVENT_ID,
        simulationCovariates: ['gender'],
    } as any);
    prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
    prismaMock.user.findMany.mockResolvedValue(makeUsers(20) as any);
    prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValue([]);
}

describe('prepareRound1Input', () => {
    test('prepares the exact generalized structure from authoritative multiple-choice data', async () => {
        mockValidDatabase();

        const input = await prepareRound1Input(prismaMock, makeParams(), () => 0);

        expect(input).toEqual({
            schemaVersion: 2,
            runId: 'fgdt-test-run',
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            question: QUESTION,
            topic: 'the adoption of nuclear power',
            background: 'The region is considering a new nuclear power plant.',
            questionType: 'MULTIPLE_CHOICE',
            options: OPTIONS,
            reasoningType: 'OPTIONAL',
            generation: { force: false },
            participants: [
                {
                    participantKey: 'fgdt-demo-01',
                    userId: '00000000-0000-0000-0000-000000000001',
                    persona: {
                        covariates: {
                            gender: 'Male',
                        },
                    },
                },
                {
                    participantKey: 'fgdt-demo-02',
                    userId: '00000000-0000-0000-0000-000000000002',
                    persona: {
                        covariates: {
                            gender: 'Female',
                        },
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
                isDraft: true,
                multipleChoiceOptions: true,
                reasoningType: true,
                flows: { select: { feedbackFlow: { select: { isDraft: true } } } },
            },
        });
    });

    test('generates a readable runId when none is supplied', async () => {
        mockValidDatabase();

        const input = await prepareRound1Input(prismaMock, makeParams({ runId: undefined }), () => 0);

        expect(input.runId).toMatch(/^fgdt-90990f38-\d+$/);
    });

    test('filters the fixed persona to the persisted covariate selection', async () => {
        mockValidDatabase();
        prismaMock.event.findUnique.mockResolvedValue({
            id: EVENT_ID,
            simulationCovariates: ['politics', 'region', 'age'],
        } as any);

        const input = await prepareRound1Input(prismaMock, makeParams({ participantCount: 1 }), () => 0);

        expect(input.participants[0]).toMatchObject({
            participantKey: 'fgdt-demo-01',
            persona: { covariates: { region: 'South', age: '18-29', politics: 'Conservative' } },
        });
        expect(Object.keys(input.participants[0].persona.covariates)).toEqual(['region', 'age', 'politics']);
    });

    test('rejects an empty persisted covariate selection', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: [] } as any);

        await expect(prepareRound1Input(prismaMock, makeParams({ participantCount: 1 }), () => 0)).rejects.toThrow(
            'At least one simulation covariate must be selected.'
        );
    });

    test.each([
        [['region', 'region'], 'duplicate key'],
        [['unknown'], 'Unsupported simulation covariate'],
    ])('rejects invalid persisted covariates: %j', async (simulationCovariates, message) => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates } as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(message);
        expect(prismaMock.eventLiveFeedbackPrompt.findUnique).not.toHaveBeenCalled();
    });

    test('rejects a missing Event', async () => {
        prismaMock.event.findUnique.mockResolvedValue(null);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(`Event ${EVENT_ID} does not exist`);
    });

    test('rejects a missing Prompt', async () => {
        prismaMock.event.findUnique.mockResolvedValue({
            id: EVENT_ID,
            simulationCovariates: ['gender'],
        } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(null);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(
            `Prompt ${PROMPT_ID} does not exist`
        );
    });

    test('rejects a Prompt belonging to another Event', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt({ eventId: OTHER_EVENT_ID }) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow('does not belong to event');
    });

    test.each([
        ['no active flags', { isMultipleChoice: false }],
        ['multiple active flags', { isOpenEnded: true }],
    ])('rejects malformed prompt type flags: %s', async (_description, override) => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt(override) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow(
            'exactly one active question-type flag'
        );
    });

    test.each([
        ['VOTE', { isMultipleChoice: false, isVote: true }, { questionType: 'VOTE', reasoningType: 'OPTIONAL' }],
        ['OPEN_ENDED', { isMultipleChoice: false, isOpenEnded: true }, { questionType: 'OPEN_ENDED' }],
    ])('prepares %s without multiple-choice options', async (_description, override, expected) => {
        mockValidDatabase();
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(
            makePrompt({ ...override, multipleChoiceOptions: [] }) as any
        );

        const input = await prepareRound1Input(prismaMock, makeParams(), () => 0);

        expect(input).toMatchObject(expected);
        expect(input).not.toHaveProperty('options');
        if (expected.questionType === 'OPEN_ENDED') expect(input).not.toHaveProperty('reasoningType');
    });

    test.each([
        [['Only one'], 'between 2 and 20'],
        [['Yes', ''], 'nonempty'],
        [['Yes', 'Yes'], 'unique'],
        [Array.from({ length: 21 }, (_, index) => `Option ${index}`), 'between 2 and 20'],
        [['Yes', 'x'.repeat(251)], 'at most 250 characters'],
    ])('rejects invalid prompt options: %j', async (multipleChoiceOptions, message) => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
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
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
        prismaMock.user.findMany.mockResolvedValue(makeUsers(1) as any);

        await expect(prepareRound1Input(prismaMock, makeParams())).rejects.toThrow('fgdt-demo-02');
        expect(prismaMock.user.create).not.toHaveBeenCalled();
        expect(prismaMock.user.upsert).not.toHaveBeenCalled();
    });

    test('keeps participant ordering and persona assignment deterministic regardless of database order', async () => {
        const reversedUsers = makeUsers(20).reverse();
        prismaMock.event.findUnique.mockResolvedValue({
            id: EVENT_ID,
            simulationCovariates: ['gender'],
        } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(makePrompt() as any);
        prismaMock.user.findMany.mockResolvedValue(reversedUsers as any);
        prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValue([]);

        const first = await prepareRound1Input(prismaMock, makeParams({ participantCount: 3 }), () => 0);
        const second = await prepareRound1Input(prismaMock, makeParams({ participantCount: 3 }), () => 0);

        expect(first.participants).toEqual(second.participants);
        expect(first.participants.map(({ participantKey }) => participantKey)).toEqual([
            'fgdt-demo-01',
            'fgdt-demo-02',
            'fgdt-demo-03',
        ]);
        expect(first.participants.map(({ persona }) => persona.covariates)).toEqual([
            { gender: 'Male' },
            { gender: 'Female' },
            { gender: 'Female' },
        ]);
    });

    test('copies the exact database question and ordered options without allowing overrides', async () => {
        const exactOptions = ['Option B ', 'Option A'];
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(
            makePrompt({ prompt: ' Exact database question? ', multipleChoiceOptions: exactOptions }) as any
        );
        prismaMock.user.findMany.mockResolvedValue(makeUsers(20) as any);
        prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValue([]);

        const input = await prepareRound1Input(prismaMock, makeParams(), () => 0);

        expect(input.question).toBe(' Exact database question? ');
        if (input.questionType !== 'MULTIPLE_CHOICE') throw new Error('Expected multiple choice input.');
        expect(input.options).toEqual(exactOptions);
    });

    test('randomly samples the full pool on the first run and preserves each selected persona', async () => {
        mockValidDatabase();
        const randomValues = [0.9, 0.99, 0.84];

        const input = await prepareRound1Input(
            prismaMock,
            makeParams({ participantCount: 3 }),
            () => randomValues.shift()!
        );

        expect(input.participants.map(({ participantKey }) => participantKey)).toEqual([
            'fgdt-demo-19',
            'fgdt-demo-20',
            'fgdt-demo-18',
        ]);
        expect(new Set(input.participants.map(({ userId }) => userId))).toHaveProperty('size', 3);
        expect(input.participants[0].persona.covariates).toEqual({
            gender: 'Male',
        });
    });

    test('second and later runs exclude every dummy user who already responded', async () => {
        mockValidDatabase();
        const users = makeUsers(20);
        prismaMock.eventLiveFeedbackPromptResponse.findMany
            .mockResolvedValueOnce(users.slice(0, 2).map(({ id: createdById }) => ({ createdById })) as any)
            .mockResolvedValueOnce(users.slice(0, 4).map(({ id: createdById }) => ({ createdById })) as any);

        const secondRun = await prepareRound1Input(prismaMock, makeParams({ participantCount: 2 }), () => 0);
        const thirdRun = await prepareRound1Input(prismaMock, makeParams({ participantCount: 2 }), () => 0);

        expect(secondRun.participants.map(({ participantKey }) => participantKey)).toEqual([
            'fgdt-demo-03',
            'fgdt-demo-04',
        ]);
        expect(thirdRun.participants.map(({ participantKey }) => participantKey)).toEqual([
            'fgdt-demo-05',
            'fgdt-demo-06',
        ]);
        expect(prismaMock.eventLiveFeedbackPromptResponse.findMany).toHaveBeenCalledWith({
            where: {
                promptId: PROMPT_ID,
                createdById: { in: users.map(({ id }) => id) },
            },
            select: { createdById: true },
        });
    });

    test('fails before simulation when too few unused dummy users remain', async () => {
        mockValidDatabase();
        prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValue(
            makeUsers(19).map(({ id: createdById }) => ({ createdById })) as any
        );

        await expect(prepareRound1Input(prismaMock, makeParams({ participantCount: 2 }), () => 0)).rejects.toThrow(
            'Only 1 unused simulated participants remain for this survey, but 2 were requested.'
        );
    });

    test('rejects a published survey', async () => {
        prismaMock.event.findUnique.mockResolvedValue({ id: EVENT_ID, simulationCovariates: ['gender'] } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValue(
            makePrompt({ flows: [{ feedbackFlow: { isDraft: false } }] }) as any
        );

        await expect(prepareRound1Input(prismaMock, makeParams(), () => 0)).rejects.toThrow(
            'Simulation is only available for draft/unpublished surveys.'
        );
        expect(prismaMock.user.findMany).not.toHaveBeenCalled();
    });
});
