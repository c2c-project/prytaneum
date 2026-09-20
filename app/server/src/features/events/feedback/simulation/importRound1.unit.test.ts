import { prismaMock } from '../../../../../mocks/prisma/singleton';
import { importRound1Responses, parseRound1Output, preflightRound1Import, Round1Output } from './importRound1';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const OTHER_EVENT_ID = 'cc0f08b4-bcb0-4d3b-b07d-918339f4a220';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';
const USER_1_ID = '531be5ae-6df9-47e2-a86d-8ee44062ab79';
const USER_2_ID = '2e83e1f1-999c-42c7-8dad-cf13d27a6678';

function makeValidJson(): unknown {
    return {
        schemaVersion: 1,
        runId: 'nuclear-demo-001',
        eventId: EVENT_ID,
        promptId: PROMPT_ID,
        model: 'gemini-3.5-flash',
        generatedAt: '2026-08-26T12:00:00Z',
        options: ['Expand nuclear power', 'Maintain current operations', 'Phase out nuclear power'],
        reasoningType: 'REQUIRED',
        responses: [
            {
                participantKey: 'fgdt-demo-01',
                userId: USER_1_ID,
                standpointNum: 2,
                selectedOption: 'Maintain current operations',
                reasoning: 'Current operations balance reliable energy with caution about new construction.',
            },
            {
                participantKey: 'fgdt-demo-02',
                userId: USER_2_ID,
                standpointNum: 1,
                selectedOption: 'Expand nuclear power',
                reasoning: 'Expansion would provide additional reliable low-carbon electricity.',
            },
        ],
    };
}

function makeValidOutput(): Round1Output {
    return parseRound1Output(makeValidJson());
}

function mockValidPreflight(output = makeValidOutput()) {
    prismaMock.event.findUnique.mockResolvedValueOnce({ id: output.eventId } as any);
    prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
        eventId: output.eventId,
        isMultipleChoice: true,
        isVote: false,
        isOpenEnded: false,
        isDraft: false,
        multipleChoiceOptions: output.options,
        reasoningType: output.reasoningType,
        flows: [{ feedbackFlow: { isDraft: true } }],
    } as any);
    prismaMock.user.findMany.mockResolvedValueOnce(output.responses.map(({ userId: id }) => ({ id })) as any);
    prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValueOnce([]);
}

describe('parseRound1Output', () => {
    test('parses a valid output', () => {
        const output = parseRound1Output(makeValidJson());

        expect(output.runId).toBe('nuclear-demo-001');
        expect(output.responses).toHaveLength(2);
        expect(output.responses[0].selectedOption).toBe(output.options[1]);
    });

    test('rejects an invalid schema version', () => {
        const json = makeValidJson() as any;
        json.schemaVersion = 2;

        expect(() => parseRound1Output(json)).toThrow('schemaVersion must equal 1');
    });

    test('rejects any model other than the fixed Round 1 Gemini model', () => {
        expect(() => parseRound1Output({ ...(makeValidJson() as object), model: 'gemini-other' })).toThrow(
            'model must be gemini-3.5-flash'
        );
    });

    test('rejects a duplicate participantKey', () => {
        const json = makeValidJson() as any;
        json.responses[1].participantKey = json.responses[0].participantKey;

        expect(() => parseRound1Output(json)).toThrow('duplicate participantKey');
    });

    test('rejects a duplicate userId', () => {
        const json = makeValidJson() as any;
        json.responses[1].userId = json.responses[0].userId;

        expect(() => parseRound1Output(json)).toThrow('duplicate userId');
    });

    test('rejects an out-of-range standpointNum', () => {
        const json = makeValidJson() as any;
        json.responses[0].standpointNum = 4;

        expect(() => parseRound1Output(json)).toThrow('standpointNum must be between 1 and 3');
    });

    test('rejects a selectedOption mismatch', () => {
        const json = makeValidJson() as any;
        json.responses[0].selectedOption = json.options[0];

        expect(() => parseRound1Output(json)).toThrow('selectedOption does not match');
    });

    test('rejects reasoning over 500 characters', () => {
        const json = makeValidJson() as any;
        json.responses[0].reasoning = 'x'.repeat(501);

        expect(() => parseRound1Output(json)).toThrow('reasoning must be at most 500 characters');
    });

    test.each([
        ['DISABLED', ''],
        ['OPTIONAL', ''],
        ['OPTIONAL', 'Optional reasoning'],
        ['REQUIRED', 'Required reasoning'],
    ] as const)('accepts valid %s reasoning', (reasoningType, reasoning) => {
        const json = makeValidJson() as any;
        json.reasoningType = reasoningType;
        json.responses.forEach((response: any) => {
            response.reasoning = reasoning;
        });

        expect(parseRound1Output(json).responses[0].reasoning).toBe(reasoning);
    });

    test('rejects empty required reasoning', () => {
        const json = makeValidJson() as any;
        json.responses[0].reasoning = '';

        expect(() => parseRound1Output(json)).toThrow('reasoning must be a nonempty string');
    });

    test('rejects reasoning when it is disabled', () => {
        const json = makeValidJson() as any;
        json.reasoningType = 'DISABLED';

        expect(() => parseRound1Output(json)).toThrow('reasoning must be empty when reasoning is disabled');
    });
});

describe('preflightRound1Import', () => {
    test('rejects a missing event', async () => {
        prismaMock.event.findUnique.mockResolvedValueOnce(null);

        await expect(preflightRound1Import(prismaMock, makeValidOutput())).rejects.toThrow('does not exist');
    });

    test('rejects a missing prompt', async () => {
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce(null);

        await expect(preflightRound1Import(prismaMock, makeValidOutput())).rejects.toThrow('Prompt');
    });

    test('rejects a prompt belonging to a different event', async () => {
        const output = makeValidOutput();
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
            eventId: OTHER_EVENT_ID,
            isMultipleChoice: true,
            isVote: false,
            isOpenEnded: false,
            isDraft: false,
            multipleChoiceOptions: output.options,
            reasoningType: output.reasoningType,
            flows: [{ feedbackFlow: { isDraft: true } }],
        } as any);

        await expect(preflightRound1Import(prismaMock, output)).rejects.toThrow('does not belong to event');
    });

    test('rejects reordered or changed options', async () => {
        const output = makeValidOutput();
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
            eventId: EVENT_ID,
            isMultipleChoice: true,
            isVote: false,
            isOpenEnded: false,
            isDraft: false,
            multipleChoiceOptions: [...output.options].reverse(),
            reasoningType: output.reasoningType,
            flows: [{ feedbackFlow: { isDraft: true } }],
        } as any);

        await expect(preflightRound1Import(prismaMock, output)).rejects.toThrow('options do not exactly match');
    });

    test('rejects a missing dummy user', async () => {
        const output = makeValidOutput();
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
            eventId: EVENT_ID,
            isMultipleChoice: true,
            isVote: false,
            isOpenEnded: false,
            isDraft: false,
            multipleChoiceOptions: output.options,
            reasoningType: output.reasoningType,
            flows: [{ feedbackFlow: { isDraft: true } }],
        } as any);
        prismaMock.user.findMany.mockResolvedValueOnce([{ id: USER_1_ID }] as any);

        await expect(preflightRound1Import(prismaMock, output)).rejects.toThrow(USER_2_ID);
    });

    test('rejects an existing response conflict', async () => {
        const output = makeValidOutput();
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
            eventId: EVENT_ID,
            isMultipleChoice: true,
            isVote: false,
            isOpenEnded: false,
            isDraft: false,
            multipleChoiceOptions: output.options,
            reasoningType: output.reasoningType,
            flows: [{ feedbackFlow: { isDraft: true } }],
        } as any);
        prismaMock.user.findMany.mockResolvedValueOnce(output.responses.map(({ userId: id }) => ({ id })) as any);
        prismaMock.eventLiveFeedbackPromptResponse.findMany.mockResolvedValueOnce([{ createdById: USER_1_ID }] as any);

        await expect(preflightRound1Import(prismaMock, output)).rejects.toThrow('already exist');
    });

    test('rejects a survey that was published after simulation preparation', async () => {
        const output = makeValidOutput();
        prismaMock.event.findUnique.mockResolvedValueOnce({ id: EVENT_ID } as any);
        prismaMock.eventLiveFeedbackPrompt.findUnique.mockResolvedValueOnce({
            eventId: EVENT_ID,
            isMultipleChoice: true,
            isVote: false,
            isOpenEnded: false,
            isDraft: false,
            multipleChoiceOptions: output.options,
            reasoningType: output.reasoningType,
            flows: [{ feedbackFlow: { isDraft: false } }],
        } as any);

        await expect(preflightRound1Import(prismaMock, output)).rejects.toThrow(
            'Simulation is only available for draft/unpublished surveys.'
        );
        expect(prismaMock.eventLiveFeedbackPromptResponse.create).not.toHaveBeenCalled();
    });
});

describe('importRound1Responses', () => {
    test('appends every response in one transaction without overwriting existing responses', async () => {
        const output = makeValidOutput();
        mockValidPreflight(output);
        prismaMock.$transaction.mockImplementationOnce(async (callback: any) => callback(prismaMock));
        prismaMock.eventLiveFeedbackPromptResponse.create.mockResolvedValue({} as any);

        const summary = await importRound1Responses(prismaMock, output);

        expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
        expect(prismaMock.eventLiveFeedbackPromptResponse.create).toHaveBeenCalledTimes(2);
        expect(prismaMock.eventLiveFeedbackPromptResponse.create).toHaveBeenNthCalledWith(1, {
            data: {
                promptId: PROMPT_ID,
                createdById: USER_1_ID,
                response: output.responses[0].reasoning,
                multipleChoiceResponse: output.responses[0].selectedOption,
                isMultipleChoice: true,
                isOpenEnded: false,
                isVote: false,
                vote: 'CONFLICTED',
            },
        });
        expect(prismaMock.eventLiveFeedbackPromptResponse.update).not.toHaveBeenCalled();
        expect(prismaMock.eventLiveFeedbackPromptResponse.delete).not.toHaveBeenCalled();
        expect(prismaMock.eventLiveFeedbackPromptResponse.deleteMany).not.toHaveBeenCalled();
        expect(summary).toEqual({
            runId: output.runId,
            promptId: PROMPT_ID,
            insertedCount: 2,
            participantKeys: ['fgdt-demo-01', 'fgdt-demo-02'],
        });
    });
});
