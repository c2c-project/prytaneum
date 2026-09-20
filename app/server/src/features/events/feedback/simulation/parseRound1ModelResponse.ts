/* eslint-disable @typescript-eslint/indent */
import type { ReasoningType } from '@local/__generated__/prisma';
import type { Round1Question } from './round1Types';

export type ParsedRound1ModelResponse =
    | {
          questionType: 'MULTIPLE_CHOICE';
          standpointNum: number;
          reasoning: string;
      }
    | {
          questionType: 'VOTE';
          vote: 'FOR' | 'AGAINST' | 'CONFLICTED';
          reasoning: string;
      }
    | {
          questionType: 'OPEN_ENDED';
          response: string;
      };

export class Round1ModelResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1ModelResponseError';
    }
}

function parseReasoning(rawReasoning: unknown, reasoningType: ReasoningType): string {
    if (reasoningType === 'DISABLED') return '';
    if (typeof rawReasoning !== 'string') {
        if (reasoningType === 'OPTIONAL') return '';
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
    return reasoning;
}

/** Parse the first JSON object in a Gemini response, matching FGDT's tolerant extraction. */
export function parseRound1ModelResponse(response: string, configuration: Round1Question): ParsedRound1ModelResponse {
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

    const record = parsed as Record<string, unknown>;
    if (configuration.questionType === 'OPEN_ENDED') {
        if (typeof record.response !== 'string') {
            throw new Round1ModelResponseError('Gemini response must contain a string response.');
        }
        const answer = record.response.trim();
        if (!answer) throw new Round1ModelResponseError('Gemini response must not be empty.');
        return { questionType: 'OPEN_ENDED', response: Array.from(answer).slice(0, 500).join('') };
    }

    if (configuration.questionType === 'VOTE') {
        if (record.vote !== 'FOR' && record.vote !== 'AGAINST' && record.vote !== 'CONFLICTED') {
            throw new Round1ModelResponseError('Gemini vote must be FOR, AGAINST, or CONFLICTED.');
        }
        return {
            questionType: 'VOTE',
            vote: record.vote,
            reasoning: parseReasoning(record.reasoning, configuration.reasoningType),
        };
    }

    const entries = Object.entries(record);
    if (entries.length === 0) throw new Round1ModelResponseError('Gemini response JSON must not be empty.');
    const [rawKey, rawReasoning] = entries[0];
    const match = /^Standpoint\s+(\d+):?$/.exec(rawKey);
    if (!match) throw new Round1ModelResponseError('Gemini response must use a "Standpoint N" key.');

    const standpointNum = Number(match[1]);
    if (!Number.isInteger(standpointNum) || standpointNum < 1 || standpointNum > configuration.options.length) {
        throw new Round1ModelResponseError(`Gemini standpoint must be between 1 and ${configuration.options.length}.`);
    }
    return {
        questionType: 'MULTIPLE_CHOICE',
        standpointNum,
        reasoning: parseReasoning(rawReasoning, configuration.reasoningType),
    };
}
