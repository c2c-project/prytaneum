import type { ReasoningType } from '@local/__generated__/prisma';

export type ParsedRound1ModelResponse = {
    standpointNum: number;
    reasoning: string;
};

export class Round1ModelResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1ModelResponseError';
    }
}

/** Parse the first JSON object in a Gemini response, matching FGDT's tolerant extraction. */
export function parseRound1ModelResponse(
    response: string,
    optionCount: number,
    reasoningType: ReasoningType
): ParsedRound1ModelResponse {
    const start = response.indexOf('{');
    const end = response.indexOf('}', start + 1);
    if (start < 0 || end < 0) throw new Round1ModelResponseError('Gemini response did not contain a JSON object.');

    let parsed: unknown;
    try {
        parsed = JSON.parse(response.slice(start, end + 1)) as unknown;
    } catch {
        throw new Round1ModelResponseError('Gemini response contained invalid JSON.');
    }
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Round1ModelResponseError('Gemini response JSON must be an object.');
    }

    const entries = Object.entries(parsed);
    if (entries.length === 0) throw new Round1ModelResponseError('Gemini response JSON must not be empty.');
    const [rawKey, rawReasoning] = entries[0];
    const match = /^Standpoint\s+(\d+):?$/.exec(rawKey);
    if (!match) throw new Round1ModelResponseError('Gemini response must use a "Standpoint N" key.');

    const standpointNum = Number(match[1]);
    if (!Number.isInteger(standpointNum) || standpointNum < 1 || standpointNum > optionCount) {
        throw new Round1ModelResponseError(`Gemini standpoint must be between 1 and ${optionCount}.`);
    }
    if (reasoningType === 'DISABLED') return { standpointNum, reasoning: '' };
    if (typeof rawReasoning !== 'string') {
        if (reasoningType === 'OPTIONAL') return { standpointNum, reasoning: '' };
        throw new Round1ModelResponseError('Gemini reasoning must be a string.');
    }
    let reasoning = rawReasoning;
    if (reasoning.length >= 2 && reasoning.startsWith('"') && reasoning.endsWith('"')) {
        reasoning = reasoning.slice(1, -1);
    }
    reasoning = reasoning.trim();
    if (!reasoning && reasoningType === 'REQUIRED') {
        throw new Round1ModelResponseError('Gemini reasoning must not be empty.');
    }
    if (Array.from(reasoning).length > 500) {
        throw new Round1ModelResponseError('Gemini reasoning must be at most 500 characters.');
    }
    return { standpointNum, reasoning };
}
