export type Round1Random = () => number;

/** Randomly sample unique items without replacement using a partial Fisher-Yates shuffle. */
export function sampleRound1Participants<T>(
    items: readonly T[],
    count: number,
    random: Round1Random = Math.random
): T[] {
    if (!Number.isInteger(count) || count < 0 || count > items.length) {
        throw new Error('Sample count must be an integer between 0 and the available item count.');
    }

    const shuffled = [...items];
    for (let index = 0; index < count; index++) {
        const randomValue = random();
        if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
            throw new Error('Random function must return a number greater than or equal to 0 and less than 1.');
        }
        const selectedIndex = index + Math.floor(randomValue * (shuffled.length - index));
        [shuffled[index], shuffled[selectedIndex]] = [shuffled[selectedIndex], shuffled[index]];
    }
    return shuffled.slice(0, count);
}
