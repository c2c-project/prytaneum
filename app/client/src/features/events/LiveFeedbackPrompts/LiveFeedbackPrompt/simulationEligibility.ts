type Round1PromptEligibility = {
    isMultipleChoice: boolean | null;
    isOpenEnded: boolean | null;
    isVote: boolean | null;
};

type PromptResponseState = {
    hasSimulationResponses?: boolean;
    simulationResponses?: { edges: readonly unknown[] | null } | null;
};

export function isRound1PromptTypeEligible(prompt: Round1PromptEligibility): boolean {
    return [prompt.isMultipleChoice, prompt.isOpenEnded, prompt.isVote].filter(Boolean).length === 1;
}

export function isRound1PromptFormEligible(prompt: { feedbackType: string }): boolean {
    return ['multiple-choice', 'vote', 'open-ended'].includes(prompt.feedbackType);
}

export function isRound1SimulationEligible(prompt: Round1PromptEligibility & { id: string }): boolean {
    return Boolean(prompt.id && isRound1PromptTypeEligible(prompt));
}

export function isDraftRound1SimulationEligible(
    prompt: Round1PromptEligibility & { id: string },
    isDraft: boolean
): boolean {
    return isDraft && isRound1SimulationEligible(prompt);
}

export function hasRound1SimulationResponses(prompt: PromptResponseState): boolean {
    return Boolean(prompt.hasSimulationResponses || prompt.simulationResponses?.edges?.length);
}

export function getSurveyCardActionVisibility(isDraft: boolean) {
    return {
        shareDraft: isDraft,
        reshareSurvey: !isDraft,
        viewResponses: true,
    };
}

/**
 * Round 1 runs one prompt at a time. A single-prompt persisted survey can therefore
 * run directly from its card; multi-prompt surveys remain runnable per prompt in
 * the existing response view.
 */
export function getRunnableSurveyPrompt<TPrompt extends Round1PromptEligibility & { id: string }>(flow: {
    isDraft: boolean;
    prompts: readonly { prompt: TPrompt }[];
}): TPrompt | null {
    if (!flow.isDraft) return null;
    if (flow.prompts.length !== 1) return null;
    const prompt = flow.prompts[0].prompt;
    return isDraftRound1SimulationEligible(prompt, flow.isDraft) ? prompt : null;
}
