import { getRunnableSurveyPrompt } from '../LiveFeedbackPrompt/simulationEligibility';

type PersistedPrompt = {
    id: string;
    isMultipleChoice: boolean | null;
    isOpenEnded: boolean | null;
    isVote: boolean | null;
};

type PersistedDraft<TPrompt extends PersistedPrompt> = {
    isDraft: boolean;
    prompts: readonly { prompt: TPrompt }[];
};

export class SavedDraftSimulationError<TDraft> extends Error {
    savedDraft: TDraft;

    constructor(savedDraft: TDraft, cause: unknown) {
        super(cause instanceof Error ? cause.message : String(cause));
        this.name = 'SavedDraftSimulationError';
        this.savedDraft = savedDraft;
    }
}

/** Persist an unshared draft first, then simulate its newly persisted prompt. */
export async function runNewSurveySimulation<
    TForm,
    TPrompt extends PersistedPrompt,
    TDraft extends PersistedDraft<TPrompt>
>(
    form: TForm,
    dependencies: {
        persistSurvey: (form: TForm, isDraft: boolean) => Promise<TDraft>;
        runSimulation: (prompt: TPrompt) => Promise<unknown>;
    }
): Promise<TDraft> {
    const savedDraft = await dependencies.persistSurvey(form, true);
    const prompt = getRunnableSurveyPrompt(savedDraft);
    if (!prompt) {
        throw new SavedDraftSimulationError(
            savedDraft,
            new Error('The saved survey must contain one eligible prompt.')
        );
    }
    try {
        await dependencies.runSimulation(prompt);
        return savedDraft;
    } catch (error) {
        throw new SavedDraftSimulationError(savedDraft, error);
    }
}

export type NewSurveySimulationFlight<TDraft> = { current: Promise<TDraft> | null };

/** Start at most one create-and-simulate workflow until the active run settles. */
export function startNewSurveySimulation<
    TForm,
    TPrompt extends PersistedPrompt,
    TDraft extends PersistedDraft<TPrompt>
>(
    flight: NewSurveySimulationFlight<TDraft>,
    form: TForm,
    dependencies: {
        persistSurvey: (form: TForm, isDraft: boolean) => Promise<TDraft>;
        runSimulation: (prompt: TPrompt) => Promise<unknown>;
    }
): { started: boolean; result: Promise<TDraft> } {
    if (flight.current) return { started: false, result: flight.current };
    const result = runNewSurveySimulation(form, dependencies).finally(() => {
        flight.current = null;
    });
    flight.current = result;
    return { started: true, result };
}
