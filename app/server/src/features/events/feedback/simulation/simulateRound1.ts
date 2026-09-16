import { buildRound1Prompt } from './buildRound1Prompt';
import { askRound1Gemini, ROUND1_GEMINI_MODEL } from './geminiClient';
import type { Round1Output, Round1Response } from './importRound1';
import { parseRound1ModelResponse } from './parseRound1ModelResponse';
import type { Round1Input } from './prepareRound1';

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
        input.options
    );

    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
        const rawResponse = await askGemini(prompt, attempt === 0 ? input.generation.force : true);
        try {
            const { standpointNum, reasoning } = parseRound1ModelResponse(rawResponse, input.options.length);
            return {
                participantKey: participant.participantKey,
                userId: participant.userId,
                standpointNum,
                selectedOption: input.options[standpointNum - 1],
                reasoning,
            };
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
): Promise<Round1Output> {
    const responses: Round1Response[] = [];
    for (const participant of input.participants) {
        responses.push(await simulateParticipant(input, participant, askGemini));
    }

    return {
        schemaVersion: 1,
        runId: input.runId,
        eventId: input.eventId,
        promptId: input.promptId,
        model: ROUND1_GEMINI_MODEL,
        generatedAt: new Date().toISOString(),
        options: [...input.options],
        responses,
    };
}
