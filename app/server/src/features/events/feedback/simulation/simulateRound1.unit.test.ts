import type { Round1Input } from './prepareRound1';
import { simulateRound1 } from './simulateRound1';

const input: Round1Input = {
    schemaVersion: 1,
    runId: 'run',
    eventId: '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f',
    promptId: '90990f38-1855-4aaa-a417-fd4227fdbf7a',
    question: 'Question?',
    topic: 'topic',
    background: 'background',
    options: ['Option A', 'Option B'],
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
        const askGemini = jest.fn(async () => {
            active++;
            maximumActive = Math.max(maximumActive, active);
            await Promise.resolve();
            active--;
            return '{"Standpoint 2":"Reason"}';
        });

        const output = await simulateRound1(input, askGemini);

        expect(maximumActive).toBe(1);
        expect(askGemini).toHaveBeenCalledTimes(2);
        expect(output).toMatchObject({
            schemaVersion: 1,
            runId: 'run',
            model: 'gemini-3.5-flash',
            options: ['Option A', 'Option B'],
            responses: [
                { participantKey: 'one', standpointNum: 2, selectedOption: 'Option B', reasoning: 'Reason' },
                { participantKey: 'two', standpointNum: 2, selectedOption: 'Option B', reasoning: 'Reason' },
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

        expect(output.responses[0].reasoning).toBe('Recovered');
        expect(askGemini.mock.calls.map((call) => call[1])).toEqual([false, true, true]);
    });

    test('fails after three invalid responses', async () => {
        const askGemini = jest.fn().mockResolvedValue('invalid');
        await expect(
            simulateRound1({ ...input, participants: input.participants.slice(0, 1) }, askGemini)
        ).rejects.toThrow('Could not parse a valid Gemini response for participant one');
        expect(askGemini).toHaveBeenCalledTimes(3);
    });
});
