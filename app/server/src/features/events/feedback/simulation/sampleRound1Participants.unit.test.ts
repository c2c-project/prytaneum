import { sampleRound1Participants } from './sampleRound1Participants';

describe('sampleRound1Participants', () => {
    test('uses random sampling on the first run instead of selecting the first N items', () => {
        const pool = Array.from({ length: 20 }, (_, index) => index + 1);
        const randomValues = [0.9, 0.99, 0.84];

        expect(sampleRound1Participants(pool, 3, () => randomValues.shift()!)).toEqual([19, 20, 18]);
    });

    test('samples unique items without replacement', () => {
        const selected = sampleRound1Participants([1, 2, 3, 4, 5], 5, () => 0);

        expect(new Set(selected).size).toBe(5);
        expect(selected).toEqual([1, 2, 3, 4, 5]);
    });

    test('does not mutate the source pool', () => {
        const pool = [1, 2, 3, 4];

        sampleRound1Participants(pool, 2, () => 0.75);

        expect(pool).toEqual([1, 2, 3, 4]);
    });
});
