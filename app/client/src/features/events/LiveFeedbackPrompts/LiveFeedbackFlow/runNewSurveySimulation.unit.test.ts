import { runNewSurveySimulation, SavedDraftSimulationError, startNewSurveySimulation } from './runNewSurveySimulation';

const form = { name: 'Transportation survey' };
const persistedPrompt = {
    id: 'RXZlbnRMaXZlRmVlZGJhY2tQcm9tcHQ6cHJvbXB0LTE=',
    isMultipleChoice: true,
    isOpenEnded: false,
    isVote: false,
};
const savedDraft = { isDraft: true, prompts: [{ prompt: persistedPrompt }] };

describe('runNewSurveySimulation', () => {
    test('persists an unshared draft before simulating the new prompt ID', async () => {
        const callOrder: string[] = [];
        const persistSurvey = jest.fn().mockImplementation(async () => {
            callOrder.push('persist');
            return savedDraft;
        });
        const runSimulation = jest.fn().mockImplementation(async () => {
            callOrder.push('simulate');
        });

        await expect(runNewSurveySimulation(form, { persistSurvey, runSimulation })).resolves.toBe(savedDraft);

        expect(persistSurvey).toHaveBeenCalledWith(form, true);
        expect(runSimulation).toHaveBeenCalledWith(persistedPrompt);
        expect(callOrder).toEqual(['persist', 'simulate']);
    });

    test('preserves and exposes the saved draft when simulation fails', async () => {
        const persistSurvey = jest.fn().mockResolvedValue(savedDraft);
        const runSimulation = jest.fn().mockRejectedValue(new Error('Gemini failed'));

        let error: unknown;
        try {
            await runNewSurveySimulation(form, { persistSurvey, runSimulation });
        } catch (caught) {
            error = caught;
        }

        expect(error).toBeInstanceOf(SavedDraftSimulationError);
        expect(error).toMatchObject({ message: 'Gemini failed', savedDraft });
        expect(persistSurvey).toHaveBeenCalledTimes(1);
        expect(runSimulation).toHaveBeenCalledTimes(1);
    });

    test('prevents duplicate create-and-simulate submissions while one is active', async () => {
        let finishPersistence: (draft: typeof savedDraft) => void = () => {};
        const persistSurvey = jest.fn().mockReturnValue(
            new Promise<typeof savedDraft>((resolve) => {
                finishPersistence = resolve;
            })
        );
        const runSimulation = jest.fn().mockResolvedValue(undefined);
        const flight = { current: null };

        const first = startNewSurveySimulation(flight, form, { persistSurvey, runSimulation });
        const duplicate = startNewSurveySimulation(flight, form, { persistSurvey, runSimulation });

        expect(first.started).toBe(true);
        expect(duplicate.started).toBe(false);
        expect(duplicate.result).toBe(first.result);
        expect(persistSurvey).toHaveBeenCalledTimes(1);

        finishPersistence(savedDraft);
        await first.result;
        expect(runSimulation).toHaveBeenCalledTimes(1);
        expect(flight.current).toBeNull();
    });
});
