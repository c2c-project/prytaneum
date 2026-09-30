export type Round1PromptPublicationState = {
    isDraft: boolean;
    flows: readonly { feedbackFlow: { isDraft: boolean } }[];
};

/** Standalone prompts use their own draft flag; survey prompts use their owning flow's draft flag. */
export function isRound1PromptUnpublished(prompt: Round1PromptPublicationState): boolean {
    if (prompt.flows.length > 0) return prompt.flows.every(({ feedbackFlow }) => feedbackFlow.isDraft);
    return prompt.isDraft;
}
