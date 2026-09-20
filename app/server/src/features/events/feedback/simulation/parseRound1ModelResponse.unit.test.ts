import { parseRound1ModelResponse } from './parseRound1ModelResponse';

describe('parseRound1ModelResponse', () => {
    test.each([
        ['plain JSON', '{"Standpoint 2":"Reason"}'],
        ['JSON surrounded by prose', 'Here is my answer:\n```json\n{"Standpoint 2:":"Reason"}\n```'],
    ])('parses %s', (_description, response) => {
        expect(parseRound1ModelResponse(response, 3, 'REQUIRED')).toEqual({ standpointNum: 2, reasoning: 'Reason' });
    });

    test('removes a single layer of quotes and trims reasoning', () => {
        expect(parseRound1ModelResponse('{"Standpoint 1":"\\"  Reason  \\""}', 2, 'REQUIRED')).toEqual({
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
    ])('rejects %s', (_description, response) => {
        expect(() => parseRound1ModelResponse(response, 2, 'REQUIRED')).toThrow();
    });

    test.each([
        ['DISABLED', '{"Standpoint 1":null}'],
        ['OPTIONAL', '{"Standpoint 1":"  "}'],
    ] as const)('accepts missing reasoning when reasoning is %s', (reasoningType, response) => {
        expect(parseRound1ModelResponse(response, 2, reasoningType)).toEqual({ standpointNum: 1, reasoning: '' });
    });

    test('discards reasoning when reasoning is disabled', () => {
        expect(parseRound1ModelResponse('{"Standpoint 1":"Unexpected"}', 2, 'DISABLED')).toEqual({
            standpointNum: 1,
            reasoning: '',
        });
    });
});
