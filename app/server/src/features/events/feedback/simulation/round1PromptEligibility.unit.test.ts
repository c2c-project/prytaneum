import { isRound1PromptUnpublished } from './round1PromptEligibility';

describe('isRound1PromptUnpublished', () => {
    test('uses the prompt draft flag for standalone prompts', () => {
        expect(isRound1PromptUnpublished({ isDraft: true, flows: [] })).toBe(true);
        expect(isRound1PromptUnpublished({ isDraft: false, flows: [] })).toBe(false);
    });

    test('uses the owning survey draft flag for survey prompts', () => {
        expect(isRound1PromptUnpublished({ isDraft: false, flows: [{ feedbackFlow: { isDraft: true } }] })).toBe(true);
        expect(isRound1PromptUnpublished({ isDraft: false, flows: [{ feedbackFlow: { isDraft: false } }] })).toBe(
            false
        );
    });
});
