import * as React from 'react';
import { Button, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, graphql } from 'react-relay';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PollIcon from '@mui/icons-material/Poll';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { LiveFeedbackFlowForm, TLiveFeedbackFlowFormData } from './LiveFeedbackFlowForm';
import { TLiveFeedbackPromptFormState } from '../LiveFeedbackPrompt/LiveFeedbackPromptForm';
import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import type { SubmitLiveFeedbackFlowMutation } from '@local/__generated__/SubmitLiveFeedbackFlowMutation.graphql';
import type { Flow } from '../LiveFeedbackPrompt/LiveFeedbackPromptList';
import {
    isSimulationConfigurationComplete,
    SimulationConfiguration,
    useRunRound1Simulation,
} from '../LiveFeedbackPrompt/RunRound1Simulation';
import { SavedDraftSimulationError, startNewSurveySimulation } from './runNewSurveySimulation';

interface Props {
    className?: string;
    connections?: string[]; // For Relay store updates
    simulationConfiguration: SimulationConfiguration;
    onSimulationSuccess: (flow: Flow) => void;
}

export const SUBMIT_LIVE_FEEDBACK_FLOW_MUTATION = graphql`
    mutation SubmitLiveFeedbackFlowMutation($input: CreateFeedbackFlowInput!, $connections: [ID!]!) {
        createFeedbackFlow(input: $input) {
            isError
            message
            body @appendEdge(connections: $connections) {
                cursor
                node {
                    id
                    eventId
                    flowName
                    flowDescription
                    isDraft
                    prompts {
                        id
                        order
                        prompt {
                            id
                            prompt
                            isVote
                            isOpenEnded
                            isMultipleChoice
                            multipleChoiceOptions
                            isDraft
                            reasoningType
                            createdAt
                            viewpoints
                            voteViewpoints
                            simulationResponses: responses(first: 1) {
                                edges {
                                    node {
                                        id
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export function SubmitLiveFeedbackFlow({
    className,
    connections = [],
    simulationConfiguration,
    onSimulationSuccess,
}: Props) {
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const { user } = useUser();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isRunWorkflowActive, setIsRunWorkflowActive] = React.useState(false);
    const simulationFlight = React.useRef<{ current: Promise<Flow> | null }>({ current: null });
    const { runSimulation, isRunning } = useRunRound1Simulation(simulationConfiguration);

    const [commitMutation, isMutationInFlight] = useMutation<SubmitLiveFeedbackFlowMutation>(
        SUBMIT_LIVE_FEEDBACK_FLOW_MUTATION
    );

    const transformPromptStateToInput = (promptState: TLiveFeedbackPromptFormState) => {
        return {
            prompt: promptState.prompt,
            eventId: eventId,
            feedbackType: promptState.feedbackType,
            choices: promptState.choices,
            isDraft: false, // Defaulting individual prompt draft status.
            reasoningType: promptState.reasoningType,
        };
    };

    const persistFlow = (flowData: TLiveFeedbackFlowFormData, isDraft: boolean): Promise<Flow> => {
        if (!eventId) {
            return Promise.reject(new Error('Cannot save survey: Event ID is missing.'));
        }
        if (!user) {
            return Promise.reject(new Error('You must be logged in to save a survey.'));
        }

        const mutationInput = {
            eventId,
            flowName: flowData.name,
            flowDescription: flowData.description,
            isDraft,
            prompts: flowData.prompts.map(transformPromptStateToInput),
        };

        return new Promise<Flow>((resolve, reject) => {
            commitMutation({
                variables: { input: mutationInput, connections },
                onCompleted(response, errors) {
                    if (errors?.length) {
                        reject(new Error(errors.map(({ message }) => message).join('\n')));
                        return;
                    }
                    const result = response.createFeedbackFlow;
                    if (result.isError || !result.body) {
                        reject(new Error(result.message || 'Failed to save survey.'));
                        return;
                    }
                    resolve({ ...result.body.node, cursor: result.body.cursor } as Flow);
                },
                onError: reject,
            });
        });
    };

    const handleSubmit = async (flowData: TLiveFeedbackFlowFormData) => {
        try {
            await persistFlow(flowData, false);
            displaySnack('Survey created successfully!', { variant: 'success' });
            closeDialog();
        } catch (error) {
            displaySnack(error instanceof Error ? error.message : 'Failed to create survey.', { variant: 'error' });
        }
    };

    const handleSaveDraft = async (flowData: TLiveFeedbackFlowFormData) => {
        try {
            await persistFlow(flowData, true);
            displaySnack('Flow saved as draft!', { variant: 'success' });
            closeDialog();
        } catch (error) {
            displaySnack(error instanceof Error ? error.message : 'Failed to save draft.', { variant: 'error' });
        }
    };

    const handleRunSimulation = async (flowData: TLiveFeedbackFlowFormData) => {
        if (isRunWorkflowActive || isMutationInFlight || isRunning) return;
        const workflow = startNewSurveySimulation(simulationFlight.current, flowData, {
            persistSurvey: persistFlow,
            runSimulation,
        });
        if (!workflow.started) return;
        setIsRunWorkflowActive(true);
        try {
            const savedDraft = await workflow.result;
            closeDialog();
            onSimulationSuccess(savedDraft);
        } catch (error) {
            if (error instanceof SavedDraftSimulationError) {
                closeDialog();
                if (error.message.includes('must contain one eligible')) {
                    displaySnack(error.message, { variant: 'error' });
                }
            } else {
                displaySnack(error instanceof Error ? error.message : 'Failed to save survey.', { variant: 'error' });
            }
        } finally {
            setIsRunWorkflowActive(false);
        }
    };

    const handleCancel = () => {
        closeDialog();
    };

    return (
        <React.Fragment>
            <ResponsiveDialog
                open={isOpen}
                onClose={closeDialog}
                maxWidth='md'
                fullWidth
                PaperProps={{ sx: { height: fullScreen ? '100%' : '90vh', overflowX: 'hidden', paddingX: '1rem' } }}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    Create New Survey
                    <IconButton
                        aria-label='close'
                        onClick={handleCancel}
                        sx={{ color: (themePalette) => themePalette.palette.grey[500] }}
                        disabled={isMutationInFlight || isRunWorkflowActive || isRunning}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <LiveFeedbackFlowForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        onSaveDraft={handleSaveDraft}
                        onRunSimulation={handleRunSimulation}
                        simulationEnabled={simulationConfiguration.enabled}
                        simulationConfigurationValid={isSimulationConfigurationComplete(simulationConfiguration)}
                        isBusy={isMutationInFlight || isRunWorkflowActive || isRunning}
                        isRunningSimulation={isRunWorkflowActive || isRunning}
                    />
                </DialogContent>
            </ResponsiveDialog>

            <Tooltip title='Submit a survey of many prompts' placement='top'>
                <Button
                    className={className}
                    disabled={!user || isMutationInFlight}
                    variant='contained'
                    sx={(_theme) => ({
                        backgroundColor: _theme.palette.custom.green,
                        '&:hover': {
                            backgroundColor: _theme.palette.custom.darkGreen,
                        },
                    })}
                    onClick={openDialog}
                    startIcon={user ? <PollIcon /> : <LockIcon />}
                >
                    Create Survey
                </Button>
            </Tooltip>
        </React.Fragment>
    );
}
