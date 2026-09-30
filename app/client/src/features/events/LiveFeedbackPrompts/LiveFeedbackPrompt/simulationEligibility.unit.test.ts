import {
    getRunnableSurveyPrompt,
    getSurveyCardActionVisibility,
    hasRound1SimulationResponses,
} from './simulationEligibility';

const eligiblePrompt = {
    id: 'RXZlbnRMaXZlRmVlZGJhY2tQcm9tcHQ6cHJvbXB0LTE=',
    prompt: 'Which option do you prefer?',
    isVote: false,
    isOpenEnded: false,
    isMultipleChoice: true,
    multipleChoiceOptions: ['Option A', 'Option B'],
    isDraft: false,
    createdAt: null,
    viewpoints: null,
    voteViewpoints: null,
};

function makeFlow(isDraft: boolean, prompts = [eligiblePrompt]) {
    return {
        cursor: 'cursor',
        eventId: 'event-id',
        flowDescription: null,
        flowName: 'Persisted survey',
        id: 'RmVlZGJhY2tGbG93OmZsb3ctMQ==',
        isDraft,
        prompts: prompts.map((prompt, order) => ({ id: `flow-prompt-${order}`, order, prompt })),
    };
}

describe('getRunnableSurveyPrompt', () => {
    test('keeps an unshared draft survey runnable before and after it has responses', () => {
        // Response count does not affect eligibility; the backend selects from the remaining unused pool.
        expect(getRunnableSurveyPrompt(makeFlow(true))).toBe(eligiblePrompt);
        expect(getSurveyCardActionVisibility(true)).toEqual({
            shareDraft: true,
            reshareSurvey: false,
            viewResponses: true,
        });
    });

    test('rejects a published survey while preserving its normal actions', () => {
        expect(getRunnableSurveyPrompt(makeFlow(false))).toBeNull();
        expect(getSurveyCardActionVisibility(false)).toEqual({
            shareDraft: false,
            reshareSurvey: true,
            viewResponses: true,
        });
    });

    test.each([
        { isMultipleChoice: true, isOpenEnded: false, isVote: false },
        { isMultipleChoice: false, isOpenEnded: true, isVote: false },
        { isMultipleChoice: false, isOpenEnded: false, isVote: true },
    ])('accepts each supported prompt type: %j', (flags) => {
        const prompt = { ...eligiblePrompt, ...flags };
        expect(getRunnableSurveyPrompt(makeFlow(true, [prompt]))).toBe(prompt);
    });

    test('rejects malformed prompt flags and does not choose among multiple prompts', () => {
        expect(
            getRunnableSurveyPrompt(
                makeFlow(true, [{ ...eligiblePrompt, isMultipleChoice: false, isOpenEnded: false, isVote: false }])
            )
        ).toBeNull();
        expect(getRunnableSurveyPrompt(makeFlow(true, [{ ...eligiblePrompt, isOpenEnded: true }]))).toBeNull();
        expect(
            getRunnableSurveyPrompt(makeFlow(true, [eligiblePrompt, { ...eligiblePrompt, id: 'another-id' }]))
        ).toBeNull();
    });
});

describe('hasRound1SimulationResponses', () => {
    test('distinguishes a first run from a repeated run using persisted responses', () => {
        expect(hasRound1SimulationResponses({ simulationResponses: { edges: [] } })).toBe(false);
        expect(hasRound1SimulationResponses({ simulationResponses: { edges: [{}] } })).toBe(true);
        expect(hasRound1SimulationResponses({ hasSimulationResponses: true })).toBe(true);
    });
});
