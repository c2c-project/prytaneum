import { createHash } from 'crypto';
import axios, { AxiosError } from 'axios';
import type { Redis } from 'ioredis';
import { getRedisClient } from '../../../../core/utils/redis';

export const ROUND1_GEMINI_MODEL = 'gemini-3.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${ROUND1_GEMINI_MODEL}:generateContent`;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const HTTP_ATTEMPTS = 10;

type Round1Cache = Pick<Redis, 'get' | 'set'>;
type HttpPost = typeof axios.post;

export type GeminiClientDependencies = {
    cache?: Round1Cache;
    post?: HttpPost;
    sleep?: (milliseconds: number) => Promise<void>;
    apiKey?: string;
};

type GeminiResponse = {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

export class Round1GeminiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1GeminiError';
    }
}

function cacheKey(prompt: string): string {
    const hash = createHash('md5').update(prompt, 'utf8').digest('hex').slice(0, 8);
    return `fgdt-round1:gemini:${ROUND1_GEMINI_MODEL}:${hash}`;
}

function defaultSleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function responseText(response: GeminiResponse): string {
    const text = response.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? '')
        .join('')
        .trim();
    return text || 'unknown';
}

function retryable(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return false;
    const status = (error as AxiosError).response?.status;
    return status !== undefined && RETRYABLE_STATUS_CODES.has(status);
}

async function requestGemini(
    prompt: string,
    apiKey: string,
    post: HttpPost,
    sleep: typeof defaultSleep
): Promise<string> {
    for (let attempt = 1; attempt <= HTTP_ATTEMPTS; attempt++) {
        try {
            const response = await post<GeminiResponse>(
                GEMINI_ENDPOINT,
                {
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.5, topK: 40 },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    ],
                },
                { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, timeout: 120000 }
            );
            return responseText(response.data);
        } catch (error) {
            if (!retryable(error) || attempt === HTTP_ATTEMPTS) {
                const status = axios.isAxiosError(error) ? error.response?.status : undefined;
                throw new Round1GeminiError(
                    status ? `Gemini request failed with HTTP status ${status}.` : 'Gemini request failed.'
                );
            }
            await sleep(1000 * 2 ** (attempt - 1));
        }
    }
    throw new Round1GeminiError('Gemini request failed.');
}

/** Invoke the fixed Round 1 Gemini model, reusing Prytaneum Redis unless force is set. */
export async function askRound1Gemini(
    prompt: string,
    force = false,
    dependencies: GeminiClientDependencies = {}
): Promise<string> {
    const apiKey = dependencies.apiKey ?? process.env.GEMINI_API_KEY;
    if (typeof apiKey !== 'string' || apiKey.trim().length === 0) {
        throw new Round1GeminiError('GEMINI_API_KEY is required to run the Round 1 simulation.');
    }

    const cache = dependencies.cache ?? getRedisClient();
    const key = cacheKey(prompt);
    if (!force) {
        const cached = await cache.get(key);
        if (cached) return cached;
    }

    const response = await requestGemini(
        prompt,
        apiKey,
        dependencies.post ?? axios.post,
        dependencies.sleep ?? defaultSleep
    );
    await cache.set(key, response);
    return response;
}
