import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { RunRound1SimulationMutation } from '@local/__generated__/RunRound1SimulationMutation.graphql';
import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import type { Prompt } from './LiveFeedbackPromptList';
import { isDraftRound1SimulationEligible } from './simulationEligibility';
import { Round1SimulationAction } from './Round1SimulationAction';

export type SimulationConfiguration = {
    enabled: boolean;
    participantCount: number | null | undefined;
    topic: string | null | undefined;
    background: string | null | undefined;
};

const RUN_ROUND1_SIMULATION_MUTATION = graphql`
    mutation RunRound1SimulationMutation($input: RunRound1SimulationInput!) {
        runRound1Simulation(input: $input) {
            isError
            message
            body {
                insertedCount
            }
        }
    }
`;

export function isSimulationConfigurationComplete(configuration: SimulationConfiguration): boolean {
    const count = configuration.participantCount;
    return Boolean(
        configuration.enabled &&
            Number.isInteger(count) &&
            (count ?? 0) >= 1 &&
            (count ?? 0) <= 20 &&
            configuration.topic?.trim() &&
            configuration.background?.trim()
    );
}

export function useRunRound1Simulation(configuration: SimulationConfiguration) {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit, isRunning] = useMutation<RunRound1SimulationMutation>(RUN_ROUND1_SIMULATION_MUTATION);

    const runSimulation = React.useCallback(
        (prompt: Pick<Prompt, 'id'>) =>
            new Promise<number>((resolve, reject) => {
                if (!isSimulationConfigurationComplete(configuration)) {
                    const error = new Error('Complete Event Settings → Simulation before running a simulation.');
                    displaySnack(error.message, { variant: 'error' });
                    reject(error);
                    return;
                }
                commit({
                    variables: {
                        input: {
                            eventId,
                            promptId: prompt.id,
                            force: false,
                        },
                    },
                    onCompleted(payload) {
                        if (payload.runRound1Simulation.isError || !payload.runRound1Simulation.body) {
                            const error = new Error(payload.runRound1Simulation.message || 'Simulation failed.');
                            displaySnack(error.message, { variant: 'error' });
                            reject(error);
                            return;
                        }
                        const insertedCount = payload.runRound1Simulation.body.insertedCount;
                        displaySnack(`${insertedCount} simulated responses generated.`, { variant: 'success' });
                        resolve(insertedCount);
                    },
                    onError(error) {
                        displaySnack(error.message || 'Simulation failed.', { variant: 'error' });
                        reject(error);
                    },
                });
            }),
        [commit, configuration, displaySnack, eventId]
    );

    return { runSimulation, isRunning };
}

type Props = {
    prompt: Prompt;
    isSurveyDraft: boolean;
    hasResponses: boolean;
    configuration: SimulationConfiguration;
    onSuccess?: () => void;
};

export function RunRound1Simulation({ prompt, isSurveyDraft, hasResponses, configuration, onSuccess }: Props) {
    const { isModerator } = useEvent();
    const { runSimulation, isRunning } = useRunRound1Simulation(configuration);

    const eligible = isDraftRound1SimulationEligible(prompt, isSurveyDraft);
    if (!configuration.enabled || !eligible || !isModerator) return null;

    const configurationError = !isSimulationConfigurationComplete(configuration);

    return (
        <Round1SimulationAction
            hasResponses={hasResponses}
            configurationError={configurationError}
            isRunning={isRunning}
            onRun={() => runSimulation(prompt).then(() => onSuccess?.())}
        />
    );
}
