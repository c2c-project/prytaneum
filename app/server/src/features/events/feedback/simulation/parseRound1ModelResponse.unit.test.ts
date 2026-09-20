import { parseRound1ModelResponse } from './parseRound1ModelResponse';

const requiredMultipleChoice = {
    questionType: 'MULTIPLE_CHOICE' as const,
    options: ['A', 'B', 'C'],
    reasoningType: 'REQUIRED' as const,
};

describe('parseRound1ModelResponse', () => {
    test.each([
        ['plain JSON', '{"Standpoint 2":"Reason"}'],
        ['JSON surrounded by prose', 'Here is my answer:\n```json\n{"Standpoint 2:":"Reason"}\n```'],
    ])('parses %s', (_description, response) => {
        expect(parseRound1ModelResponse(response, requiredMultipleChoice)).toEqual({
            questionType: 'MULTIPLE_CHOICE',
            standpointNum: 2,
            reasoning: 'Reason',
        });
    });

    test('removes a single layer of quotes and trims reasoning', () => {
        expect(parseRound1ModelResponse('{"Standpoint 1":"\\"  Reason  \\""}', requiredMultipleChoice)).toEqual({
            questionType: 'MULTIPLE_CHOICE',
            standpointNum: 1,
            reasoning: 'Reason',
        });
    });

    test.each([
        ['missing JSON', 'not json'],
        ['invalid JSON', '{bad}'],
        ['empty object', '{}'],
        ['wrong key', '{"Choice 1":"Reason"}'],
        ['out of range', '{"Standpoint 3":"Reason"}'],
        ['non-string reasoning', '{"Standpoint 1":42}'],
        ['empty reasoning', '{"Standpoint 1":"  "}'],
        ['long reasoning', `{"Standpoint 1":"${'x'.repeat(501)}"}`],
        ['multiple standpoints', '{"Standpoint 1":"Reason one","Standpoint 2":"Reason two"}'],
        ['literal standpoint placeholder', '{"Standpoint <SELECTED_NUMBER>":"Reason"}'],
    ])('rejects %s', (_description, response) => {
        expect(() => parseRound1ModelResponse(response, { ...requiredMultipleChoice, options: ['A', 'B'] })).toThrow();
    });

    test.each([
        ['DISABLED', '{"Standpoint 1":null}'],
        ['OPTIONAL', '{"Standpoint 1":"  "}'],
    ] as const)('accepts missing reasoning when reasoning is %s', (reasoningType, response) => {
        expect(
            parseRound1ModelResponse(response, {
                questionType: 'MULTIPLE_CHOICE',
                options: ['A', 'B'],
                reasoningType,
            })
        ).toEqual({ questionType: 'MULTIPLE_CHOICE', standpointNum: 1, reasoning: '' });
    });

    test('discards reasoning when reasoning is disabled', () => {
        expect(
            parseRound1ModelResponse('{"Standpoint 1":"Unexpected"}', {
                questionType: 'MULTIPLE_CHOICE',
                options: ['A', 'B'],
                reasoningType: 'DISABLED',
            })
        ).toEqual({
            questionType: 'MULTIPLE_CHOICE',
            standpointNum: 1,
            reasoning: '',
        });
    });

    test.each([
        ['DISABLED', '{"vote":"FOR","reasoning":"ignored"}', ''],
        ['OPTIONAL', '{"vote":"AGAINST","reasoning":""}', ''],
        ['REQUIRED', '{"vote":"CONFLICTED","reasoning":"Because."}', 'Because.'],
    ] as const)('parses a vote with %s reasoning', (reasoningType, response, reasoning) => {
        expect(parseRound1ModelResponse(response, { questionType: 'VOTE', reasoningType })).toMatchObject({
            questionType: 'VOTE',
            reasoning,
        });
    });

    test.each(['YES', 'for', '', null])('rejects invalid vote %p', (vote) => {
        expect(() =>
            parseRound1ModelResponse(JSON.stringify({ vote, reasoning: '' }), {
                questionType: 'VOTE',
                reasoningType: 'OPTIONAL',
            })
        ).toThrow('FOR, AGAINST, or CONFLICTED');
    });

    test('rejects missing required vote reasoning', () => {
        expect(() =>
            parseRound1ModelResponse('{"vote":"FOR","reasoning":""}', {
                questionType: 'VOTE',
                reasoningType: 'REQUIRED',
            })
        ).toThrow('must not be empty');
    });

    test('trims and preserves an open-ended response below 500 characters', () => {
        expect(parseRound1ModelResponse('{"response":"  A useful answer.  "}', { questionType: 'OPEN_ENDED' })).toEqual(
            {
                questionType: 'OPEN_ENDED',
                response: 'A useful answer.',
            }
        );
    });

    test('preserves an open-ended response of exactly 500 characters', () => {
        const response = 'x'.repeat(500);
        expect(parseRound1ModelResponse(JSON.stringify({ response }), { questionType: 'OPEN_ENDED' })).toEqual({
            questionType: 'OPEN_ENDED',
            response,
        });
    });

    test('truncates an open-ended response longer than 500 characters', () => {
        const parsed = parseRound1ModelResponse(JSON.stringify({ response: 'x'.repeat(501) }), {
            questionType: 'OPEN_ENDED',
        });
        if (parsed.questionType !== 'OPEN_ENDED') throw new Error('Expected open-ended response.');
        expect(parsed).toEqual({ questionType: 'OPEN_ENDED', response: 'x'.repeat(500) });
        expect(Array.from(parsed.response)).toHaveLength(500);
    });

    test('truncates open-ended responses by Unicode character without splitting surrogate pairs', () => {
        const parsed = parseRound1ModelResponse(JSON.stringify({ response: `${'😀'.repeat(500)}🐱` }), {
            questionType: 'OPEN_ENDED',
        });
        if (parsed.questionType !== 'OPEN_ENDED') throw new Error('Expected open-ended response.');
        expect(parsed).toEqual({ questionType: 'OPEN_ENDED', response: '😀'.repeat(500) });
        expect(Array.from(parsed.response)).toHaveLength(500);
        expect(parsed.response).not.toContain('\uFFFD');
    });

    test.each(['', '   '])('rejects an empty open-ended response %p', (response) => {
        expect(() => parseRound1ModelResponse(JSON.stringify({ response }), { questionType: 'OPEN_ENDED' })).toThrow(
            'must not be empty'
        );
    });

    test('continues to reject oversized multiple-choice and vote reasoning', () => {
        const reasoning = 'x'.repeat(501);
        expect(() =>
            parseRound1ModelResponse(JSON.stringify({ 'Standpoint 1': reasoning }), requiredMultipleChoice)
        ).toThrow('reasoning must be at most 500 characters');
        expect(() =>
            parseRound1ModelResponse(JSON.stringify({ vote: 'FOR', reasoning }), {
                questionType: 'VOTE',
                reasoningType: 'REQUIRED',
            })
        ).toThrow('reasoning must be at most 500 characters');
    });
});
