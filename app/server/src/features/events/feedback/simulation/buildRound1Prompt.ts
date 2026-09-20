import type { Round1PersonaCovariates } from './prepareRound1';
import type { Round1Question } from './round1Types';

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
    configuration: Round1Question
): string {
    let prompt = 'You will adopt the personality of a ';
    if (persona.education && persona.education !== 'None') prompt += `${persona.education}-educated, `;
    if (persona.race && persona.race !== 'None')
        prompt += persona.race === 'Other' ? 'Non-White, ' : `${persona.race}, `;
    if (persona.gender && persona.gender !== 'None') prompt += `${persona.gender}, `;
    if (persona.politics && persona.politics !== 'None') prompt += `${persona.politics}-leaning `;
    prompt += 'focus group participant discussing ';
    prompt += topic + '. ';
    if (persona.region && persona.region !== 'None')
        prompt += `You come from the ${persona.region} region of the United States. `;
    if (persona.age && persona.age !== 'None') prompt += `You are ${persona.age} years old. `;
    if (persona.uscitizen && persona.uscitizen !== 'None') {
        prompt +=
            persona.uscitizen === 'Yes'
                ? 'You are a citizen of the United States. '
                : 'You are not a citizen of the United States. ';
    }
    if (persona.maritalstatus && persona.maritalstatus !== 'None')
        prompt += `Your marital status is ${persona.maritalstatus}. `;
    if (persona.religion && persona.religion !== 'None')
        prompt += `Your religious affiliation is ${persona.religion}. `;
    if (persona.religionattend && persona.religionattend !== 'None')
        prompt += `You ${persona.religionattend} attend religious services. `;
    if (persona.partyid && persona.partyid !== 'None')
        prompt += `Your political party identification is ${persona.partyid}. `;
    if (persona.income && persona.income !== 'None') prompt += `Your income is ${persona.income}. `;
    if (persona.hhsize && persona.hhsize !== 'None') prompt += `Your household size is ${persona.hhsize}. `;
    if (persona.employstatus && persona.employstatus !== 'None')
        prompt += `Your employment status is ${persona.employstatus}. `;
    if (configuration.questionType === 'OPEN_ENDED') {
        prompt += `Provide a concise, direct free-text response to the polling question about ${topic}. `;
        prompt += 'Keep the response to approximately 400 characters or fewer. ';
        prompt += `${`Polling question: ${question}\n${background}`.trim()}\n`;
        prompt += 'Format your response in JSON format such as {"response": "your response"}:\n\n';
        return prompt;
    }

    if (configuration.questionType === 'MULTIPLE_CHOICE') {
        prompt += `You must select from one of the following possible standpoints on ${topic}. `;
    } else {
        prompt += 'You must vote exactly FOR, AGAINST, or CONFLICTED. ';
    }
    if (configuration.reasoningType === 'REQUIRED') {
        prompt += 'Briefly provide your reasoning for doing so in 1-2 sentences. ';
    } else if (configuration.reasoningType === 'OPTIONAL') {
        prompt += 'You may briefly provide your reasoning for doing so in 1-2 sentences. ';
    }
    if (configuration.questionType === 'MULTIPLE_CHOICE') {
        prompt += 'The possible standpoints are:\n';
        configuration.options.forEach((option, index) => {
            prompt += `Standpoint ${index + 1}: ${pythonCapitalize(option)}. `;
        });
    }
    prompt += `\n${`Polling question: ${question}\n${background}`.trim()}\n`;
    if (configuration.questionType === 'MULTIPLE_CHOICE') {
        if (configuration.reasoningType === 'DISABLED') {
            prompt += 'Format your response in JSON format such as {"Standpoint 2": ""}:\n\n';
        } else {
            prompt += 'Format your response in JSON format such as {"Standpoint 2": "your reasoning"}:\n\n';
        }
    } else if (configuration.reasoningType === 'DISABLED') {
        prompt += 'Format your response in JSON format such as {"vote": "FOR", "reasoning": ""}:\n\n';
    } else {
        prompt += 'Format your response in JSON format such as {"vote": "FOR", "reasoning": "your reasoning"}:\n\n';
    }
    return prompt;
}
