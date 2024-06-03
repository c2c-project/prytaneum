import { v2 } from '@google-cloud/translate';
import { getOrCreateServer } from '../server';

const server = getOrCreateServer();

export type SupportedLanguages = 'EN' | 'ES';

let _translationClient: v2.Translate | null = null;

function generateTranslationClient() {
    server.log.info('Generating new translation client.');
    const projectId = process.env.GCP_PROJECT_ID;
    const translateConfig: v2.TranslateConfig = {
        // @ts-ignore - projectId exists in the config, not sure why it's not being recognized
        projectId: projectId,
        keyFilename: process.env.NODE_ENV === 'development' ? './src/core/utils/credentials.json' : undefined,
    };
    return new v2.Translate(translateConfig);
}

export function getTranslationClient() {
    if (!_translationClient) {
        _translationClient = generateTranslationClient();
    }
    return _translationClient;
}

export async function detectLanguage(text: string): Promise<string> {
    const translationClient = getTranslationClient();
    const [detection] = await translationClient.detect(text);
    console.log('Detected language: ', detection);
    return detection.language;
}

export async function translateText(text: string, target: string): Promise<string> {
    const translationClient = getTranslationClient();
    const [translation] = await translationClient.translate(text, target);
    return translation;
}

export async function batchTranslateText(texts: string[], target: string): Promise<string[]> {
    const translationClient = getTranslationClient();
    const [translations] = await translationClient.translate(texts, target);
    return translations;
}
