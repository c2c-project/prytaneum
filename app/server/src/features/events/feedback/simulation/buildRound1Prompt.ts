import type { Round1PersonaCovariates } from './prepareRound1';

/** Match Python's str.capitalize() for the ASCII survey options used by Round 1. */
export function pythonCapitalize(value: string): string {
    if (value.length === 0) return value;
    const [firstCharacter, ...remainingCharacters] = Array.from(value);
    return `${firstCharacter.toUpperCase()}${remainingCharacters.join('').toLowerCase()}`;
}

/** Build the persona and standpoint prompt used by the original FGDT Round 1 flow. */
export function buildRound1Prompt(
    persona: Round1PersonaCovariates,
    topic: string,
    question: string,
    background: string,
    options: string[]
): string {
    let prompt = 'You will adopt the personality of a ';
    prompt += `${persona.education}-educated, `;
    prompt += `${persona.gender}, `;
    prompt += `${persona.politics}-leaning `;
    prompt += 'focus group participant discussing ';
    prompt += topic;
    prompt += `You must select from one of the following possible standpoints on ${topic} `;
    prompt += 'and briefly provide your reasoning for doing so in 1-2 sentences. ';
    prompt += 'The possible standpoints are:\n';
    options.forEach((option, index) => {
        prompt += `Standpoint ${index + 1}: ${pythonCapitalize(option)}. `;
    });
    prompt += `\n${`Polling question: ${question}\n${background}`.trim()}\n`;
    prompt += 'Format your response in JSON format such as {"Standpoint 2": "your reasoning"}:\n\n';
    return prompt;
}
