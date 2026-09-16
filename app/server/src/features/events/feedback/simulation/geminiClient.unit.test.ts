import axios from 'axios';
import { askRound1Gemini } from './geminiClient';

jest.mock('axios', () => {
    const post = jest.fn();
    return {
        __esModule: true,
        default: {
            post,
            isAxiosError: (error: { isAxiosError?: boolean }) => Boolean(error?.isAxiosError),
        },
    };
});

const post = axios.post as jest.Mock;

function makeCache(cached: string | null = null) {
    return {
        get: jest.fn().mockResolvedValue(cached),
        set: jest.fn().mockResolvedValue('OK'),
    };
}

describe('askRound1Gemini', () => {
    beforeEach(() => post.mockReset());

    test('validates GEMINI_API_KEY lazily', async () => {
        await expect(askRound1Gemini('prompt', false, { apiKey: '', cache: makeCache() as any })).rejects.toThrow(
            'GEMINI_API_KEY is required'
        );
        expect(post).not.toHaveBeenCalled();
    });

    test('returns a cached raw response without calling Gemini', async () => {
        const cache = makeCache('{"Standpoint 1":"cached"}');
        await expect(askRound1Gemini('prompt', false, { apiKey: 'test-key', cache: cache as any })).resolves.toBe(
            '{"Standpoint 1":"cached"}'
        );
        expect(post).not.toHaveBeenCalled();
    });

    test('sends the preserved Gemini settings and caches the response', async () => {
        const cache = makeCache();
        post.mockResolvedValue({ data: { candidates: [{ content: { parts: [{ text: 'response' }] } }] } });

        await expect(askRound1Gemini('prompt', false, { apiKey: 'test-key', cache: cache as any })).resolves.toBe(
            'response'
        );
        expect(post).toHaveBeenCalledWith(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
            {
                contents: [{ parts: [{ text: 'prompt' }] }],
                generationConfig: { temperature: 0.5, topK: 40 },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                ],
            },
            { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': 'test-key' }, timeout: 120000 }
        );
        expect(cache.set).toHaveBeenCalledWith(
            expect.stringContaining('fgdt-round1:gemini:gemini-3.5-flash:'),
            'response'
        );
    });

    test('force bypasses cache and replaces it', async () => {
        const cache = makeCache('old');
        post.mockResolvedValue({ data: { candidates: [{ content: { parts: [{ text: 'fresh' }] } }] } });
        await expect(askRound1Gemini('prompt', true, { apiKey: 'test-key', cache: cache as any })).resolves.toBe(
            'fresh'
        );
        expect(cache.get).not.toHaveBeenCalled();
        expect(cache.set).toHaveBeenCalledWith(expect.any(String), 'fresh');
    });

    test('retries retryable HTTP statuses with exponential delays', async () => {
        const cache = makeCache();
        const sleep = jest.fn().mockResolvedValue(undefined);
        post.mockRejectedValueOnce({ isAxiosError: true, response: { status: 429 } }).mockResolvedValueOnce({
            data: { candidates: [{ content: { parts: [{ text: 'ok' }] } }] },
        });

        await expect(
            askRound1Gemini('prompt', false, { apiKey: 'test-key', cache: cache as any, sleep })
        ).resolves.toBe('ok');
        expect(post).toHaveBeenCalledTimes(2);
        expect(sleep).toHaveBeenCalledWith(1000);
    });

    test('does not retry a non-retryable HTTP status', async () => {
        post.mockRejectedValue({ isAxiosError: true, response: { status: 401 } });
        await expect(
            askRound1Gemini('prompt', false, { apiKey: 'test-key', cache: makeCache() as any, sleep: jest.fn() })
        ).rejects.toThrow('HTTP status 401');
        expect(post).toHaveBeenCalledTimes(1);
    });

    test('stops after ten retryable HTTP attempts', async () => {
        const sleep = jest.fn().mockResolvedValue(undefined);
        post.mockRejectedValue({ isAxiosError: true, response: { status: 503 } });

        await expect(
            askRound1Gemini('prompt', false, { apiKey: 'test-key', cache: makeCache() as any, sleep })
        ).rejects.toThrow('HTTP status 503');
        expect(post).toHaveBeenCalledTimes(10);
        expect(sleep).toHaveBeenCalledTimes(9);
        expect(sleep.mock.calls.map(([delay]) => delay)).toEqual([
            1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000,
        ]);
    });
});
