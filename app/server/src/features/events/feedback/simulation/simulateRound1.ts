import { buildRound1Prompt } from './buildRound1Prompt';
import { askRound1Gemini, ROUND1_GEMINI_MODEL } from './geminiClient';
import { parseRound1ModelResponse } from './parseRound1ModelResponse';
import type { Round1Input } from './prepareRound1';
import type { Round1OutputV2, Round1Response } from './round1Types';

type AskGemini = typeof askRound1Gemini;

export class Round1SimulationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1SimulationError';
    }
}

async function simulateParticipant(
    input: Round1Input,
    participant: Round1Input['participants'][number],
    askGemini: AskGemini
): Promise<Round1Response> {
    const prompt = buildRound1Prompt(
        participant.persona.covariates,
        input.topic,
        input.question,
        input.background,
        input
    );

    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
        const rawResponse = await askGemini(
            prompt,
            attempt === 0 ? input.generation.force : true,
            `${input.runId}:${participant.participantKey}`
        );
        try {
            const parsed = parseRound1ModelResponse(rawResponse, input);
            const identity = { participantKey: participant.participantKey, userId: participant.userId };
            if (parsed.questionType === 'MULTIPLE_CHOICE' && input.questionType === 'MULTIPLE_CHOICE') {
                return {
                    ...identity,
                    ...parsed,
                    selectedOption: input.options[parsed.standpointNum - 1],
                };
            }
            if (parsed.questionType === 'VOTE' && input.questionType === 'VOTE') return { ...identity, ...parsed };
            if (parsed.questionType === 'OPEN_ENDED' && input.questionType === 'OPEN_ENDED') {
                return { ...identity, ...parsed };
            }
            throw new Round1SimulationError('Parsed Gemini response type did not match the prepared question type.');
        } catch (error) {
            lastError = error;
        }
    }

    const detail = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Round1SimulationError(
        `Could not parse a valid Gemini response for participant ${participant.participantKey}: ${detail}`
    );
}

/** Run the Prytaneum-owned Round 1 simulation sequentially for all prepared participants. */
export async function simulateRound1(
    input: Round1Input,
    askGemini: AskGemini = askRound1Gemini
): Promise<Round1OutputV2> {
    const responses: Round1Response[] = [];
    for (const participant of input.participants) {
        responses.push(await simulateParticipant(input, participant, askGemini));
    }

    const commonOutput = {
        schemaVersion: 2 as const,
        runId: input.runId,
        eventId: input.eventId,
        promptId: input.promptId,
        model: ROUND1_GEMINI_MODEL,
        generatedAt: new Date().toISOString(),
    };
    if (input.questionType === 'MULTIPLE_CHOICE') {
        return {
            ...commonOutput,
            questionType: input.questionType,
            options: [...input.options],
            reasoningType: input.reasoningType,
            responses: responses as Extract<Round1Response, { questionType: 'MULTIPLE_CHOICE' }>[],
        };
    }
    if (input.questionType === 'VOTE') {
        return {
            ...commonOutput,
            questionType: input.questionType,
            reasoningType: input.reasoningType,
            responses: responses as Extract<Round1Response, { questionType: 'VOTE' }>[],
        };
    }
    return {
        ...commonOutput,
        questionType: input.questionType,
        responses: responses as Extract<Round1Response, { questionType: 'OPEN_ENDED' }>[],
    };
}
