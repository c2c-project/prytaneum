import type { Round1Input } from './prepareRound1';
import { simulateRound1 } from './simulateRound1';

const input: Round1Input = {
    schemaVersion: 2,
    runId: 'run',
    eventId: '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f',
    promptId: '90990f38-1855-4aaa-a417-fd4227fdbf7a',
    question: 'Question?',
    topic: 'topic',
    background: 'background',
    questionType: 'MULTIPLE_CHOICE',
    options: ['Option A', 'Option B'],
    reasoningType: 'REQUIRED',
    generation: { force: false },
    participants: [
        {
            participantKey: 'one',
            userId: '00000000-0000-0000-0000-000000000001',
            persona: { covariates: { gender: 'female', education: 'College', politics: 'liberal' } },
        },
        {
            participantKey: 'two',
            userId: '00000000-0000-0000-0000-000000000002',
            persona: { covariates: { gender: 'male', education: 'College', politics: 'moderate' } },
        },
    ],
};

describe('simulateRound1', () => {
    test('processes participants sequentially and constructs importable output', async () => {
        let active = 0;
        let maximumActive = 0;
        const askGemini = jest.fn<Promise<string>, [string, boolean?, string?]>(async () => {
            active++;
            maximumActive = Math.max(maximumActive, active);
            await Promise.resolve();
            active--;
            return '{"Standpoint 2":"Reason"}';
        });

        const output = await simulateRound1(input, askGemini);

        expect(maximumActive).toBe(1);
        expect(askGemini).toHaveBeenCalledTimes(2);
        expect(askGemini.mock.calls.map((call) => call[2])).toEqual(['run:one', 'run:two']);
        expect(output).toMatchObject({
            schemaVersion: 2,
            runId: 'run',
            model: 'gemini-3.5-flash',
            options: ['Option A', 'Option B'],
            reasoningType: 'REQUIRED',
            responses: [
                {
                    participantKey: 'one',
                    questionType: 'MULTIPLE_CHOICE',
                    standpointNum: 2,
                    selectedOption: 'Option B',
                    reasoning: 'Reason',
                },
                {
                    participantKey: 'two',
                    questionType: 'MULTIPLE_CHOICE',
                    standpointNum: 2,
                    selectedOption: 'Option B',
                    reasoning: 'Reason',
                },
            ],
        });
    });

    test('uses three total model attempts and forces retries after invalid output', async () => {
        const askGemini = jest
            .fn()
            .mockResolvedValueOnce('invalid')
            .mockResolvedValueOnce('{bad}')
            .mockResolvedValueOnce('{"Standpoint 1":"Recovered"}');

        const output = await simulateRound1({ ...input, participants: input.participants.slice(0, 1) }, askGemini);

        if (output.questionType !== 'MULTIPLE_CHOICE') throw new Error('Expected multiple choice output.');
        expect(output.responses[0].reasoning).toBe('Recovered');
        expect(askGemini.mock.calls.map((call) => call[1])).toEqual([false, true, true]);
        expect(askGemini.mock.calls.map((call) => call[2])).toEqual(['run:one', 'run:one', 'run:one']);
    });

    test('scopes identical rendered prompts independently for different participants', async () => {
        const sharedPersona = { covariates: { gender: 'female' } };
        const participants = input.participants.map((participant) => ({ ...participant, persona: sharedPersona }));
        const askGemini = jest
            .fn()
            .mockResolvedValueOnce('{"Standpoint 1":"First independent response"}')
            .mockResolvedValueOnce('{"Standpoint 2":"Second independent response"}');

        const output = await simulateRound1({ ...input, participants }, askGemini);

        if (output.questionType !== 'MULTIPLE_CHOICE') throw new Error('Expected multiple choice output.');
        expect(askGemini.mock.calls[0][0]).toBe(askGemini.mock.calls[1][0]);
        expect(askGemini.mock.calls.map((call) => call[2])).toEqual(['run:one', 'run:two']);
        expect(output.responses.map((response) => response.reasoning)).toEqual([
            'First independent response',
            'Second independent response',
        ]);
    });

    test('uses independent cache scopes for repeated simulation runs', async () => {
        const askGemini = jest
            .fn()
            .mockResolvedValueOnce('{"Standpoint 1":"First run"}')
            .mockResolvedValueOnce('{"Standpoint 2":"Second run"}');
        const oneParticipant = input.participants.slice(0, 1);

        await simulateRound1({ ...input, runId: 'first-run', participants: oneParticipant }, askGemini);
        await simulateRound1({ ...input, runId: 'second-run', participants: oneParticipant }, askGemini);

        expect(askGemini.mock.calls.map((call) => call[2])).toEqual(['first-run:one', 'second-run:one']);
        expect(askGemini.mock.calls.map((call) => call[1])).toEqual([false, false]);
    });

    test('sends Gemini only the selected persona fields', async () => {
        const askGemini = jest.fn().mockResolvedValue('{"Standpoint 1":"Reason"}');
        const participant = {
            ...input.participants[0],
            persona: { covariates: { region: 'South', age: '18-29' } },
        };

        await simulateRound1({ ...input, participants: [participant] }, askGemini);

        const prompt = askGemini.mock.calls[0][0];
        expect(prompt).toContain('South region');
        expect(prompt).toContain('18-29 years old');
        expect(prompt).not.toContain('College');
        expect(prompt).not.toContain('liberal-leaning');
    });

    test.each([
        ['DISABLED', '{"Standpoint 1":null}', ''],
        ['OPTIONAL', '{"Standpoint 1":""}', ''],
        ['OPTIONAL', '{"Standpoint 1":"Optional reason"}', 'Optional reason'],
    ] as const)('accepts valid %s reasoning output', async (reasoningType, rawResponse, reasoning) => {
        const askGemini = jest.fn().mockResolvedValue(rawResponse);

        const output = await simulateRound1(
            { ...input, reasoningType, participants: input.participants.slice(0, 1) },
            askGemini
        );

        if (output.questionType !== 'MULTIPLE_CHOICE') throw new Error('Expected multiple choice output.');
        expect(output.reasoningType).toBe(reasoningType);
        expect(output.responses[0].reasoning).toBe(reasoning);
        expect(askGemini).toHaveBeenCalledTimes(1);
    });

    test('retries when required reasoning is missing', async () => {
        const askGemini = jest
            .fn()
            .mockResolvedValueOnce('{"Standpoint 1":""}')
            .mockResolvedValueOnce('{"Standpoint 1":"Required reason"}');

        const output = await simulateRound1({ ...input, participants: input.participants.slice(0, 1) }, askGemini);

        if (output.questionType !== 'MULTIPLE_CHOICE') throw new Error('Expected multiple choice output.');
        expect(output.responses[0].reasoning).toBe('Required reason');
        expect(askGemini.mock.calls.map((call) => call[1])).toEqual([false, true]);
    });

    test('fails after three invalid responses', async () => {
        const askGemini = jest.fn().mockResolvedValue('invalid');
        await expect(
            simulateRound1({ ...input, participants: input.participants.slice(0, 1) }, askGemini)
        ).rejects.toThrow('Could not parse a valid Gemini response for participant one');
        expect(askGemini).toHaveBeenCalledTimes(3);
    });

    test('simulates a vote response', async () => {
        const { options: _options, questionType: _questionType, ...common } = input;
        const askGemini = jest.fn().mockResolvedValue('{"vote":"AGAINST","reasoning":"Too costly."}');

        const output = await simulateRound1(
            {
                ...common,
                questionType: 'VOTE',
                reasoningType: 'REQUIRED',
                participants: input.participants.slice(0, 1),
            },
            askGemini
        );

        expect(output).toMatchObject({
            questionType: 'VOTE',
            reasoningType: 'REQUIRED',
            responses: [{ questionType: 'VOTE', vote: 'AGAINST', reasoning: 'Too costly.' }],
        });
    });

    test('simulates an open-ended response without options or reasoning mode', async () => {
        const { options: _options, reasoningType: _reasoningType, questionType: _questionType, ...common } = input;
        const askGemini = jest.fn().mockResolvedValue('{"response":"More frequent buses."}');

        const output = await simulateRound1(
            { ...common, questionType: 'OPEN_ENDED', participants: input.participants.slice(0, 1) },
            askGemini
        );

        expect(output).toMatchObject({
            questionType: 'OPEN_ENDED',
            responses: [{ questionType: 'OPEN_ENDED', response: 'More frequent buses.' }],
        });
        expect(output).not.toHaveProperty('options');
        expect(output).not.toHaveProperty('reasoningType');
    });

    test('continues a multi-participant open-ended simulation when a response exceeds 500 characters', async () => {
        const { options: _options, reasoningType: _reasoningType, questionType: _questionType, ...common } = input;
        const askGemini = jest
            .fn()
            .mockResolvedValueOnce(JSON.stringify({ response: '😀'.repeat(501) }))
            .mockResolvedValueOnce('{"response":"A short response."}');

        const output = await simulateRound1({ ...common, questionType: 'OPEN_ENDED' }, askGemini);

        if (output.questionType !== 'OPEN_ENDED') throw new Error('Expected open-ended output.');
        expect(output.responses).toHaveLength(2);
        expect(output.responses[0].response).toBe('😀'.repeat(500));
        expect(Array.from(output.responses[0].response)).toHaveLength(500);
        expect(output.responses[1].response).toBe('A short response.');
        expect(askGemini).toHaveBeenCalledTimes(2);
    });
});
