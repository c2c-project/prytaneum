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

interface Props {
    className?: string;
    connections?: string[]; // For Relay store updates
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
                    flowName
                    flowDescription
                    # isDraft # If you want to read back the draft status
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
                        }
                    }
                }
            }
        }
    }
`;

export function SubmitLiveFeedbackFlow({ className, connections = [] }: Props) {
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const { user } = useUser();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

    const handleSubmit = (flowData: TLiveFeedbackFlowFormData) => {
        if (!eventId) {
            displaySnack('Cannot create flow: Event ID is missing.', { variant: 'error' });
            console.error('SubmitLiveFeedbackFlow: eventId is undefined.');
            return;
        }
        if (!user) {
            displaySnack('You must be logged in to create a flow.', { variant: 'warning' });
            return;
        }

        const mutationInput = {
            eventId: eventId,
            flowName: flowData.name,
            flowDescription: flowData.description,
            isDraft: false,
            prompts: flowData.prompts.map(transformPromptStateToInput),
        };

        commitMutation({
            variables: {
                input: mutationInput,
                connections: connections,
            },
            onCompleted: (response, errors) => {
                if (errors) {
                    errors.forEach((err) => displaySnack(err.message, { variant: 'error' }));
                    return;
                }
                if (response.createFeedbackFlow?.isError) {
                    displaySnack(response.createFeedbackFlow.message || 'Failed to create survey.', {
                        variant: 'error',
                    });
                } else {
                    displaySnack('Survey created successfully!', { variant: 'success' });
                    closeDialog();
                }
            },
            onError: (err) => {
                displaySnack(`Error creating flow: ${err.message}`, { variant: 'error' });
            },
        });
    };

    const handleSaveDraft = (flowData: TLiveFeedbackFlowFormData) => {
        if (!eventId) {
            displaySnack('Cannot save draft: Event ID is missing.', { variant: 'error' });
            return;
        }
        if (!user) {
            displaySnack('You must be logged in to save a draft.', { variant: 'warning' });
            return;
        }

        const mutationInput = {
            eventId: eventId,
            flowName: flowData.name,
            flowDescription: flowData.description,
            isDraft: true,
            prompts: flowData.prompts.map((promptState) => {
                const transformedPrompt = transformPromptStateToInput(promptState);
                return { ...transformedPrompt, isDraft: false }; // Individual prompts are not drafts
            }),
        };

        // Actual mutation call for saving draft:
        commitMutation({
            variables: {
                input: mutationInput,
                connections: connections,
            },
            onCompleted: (response, errors) => {
                if (errors) {
                    errors.forEach((err) => displaySnack(err.message, { variant: 'error' }));
                    return;
                }
                if (response.createFeedbackFlow?.isError) {
                    displaySnack(response.createFeedbackFlow.message || 'Failed to save draft.', { variant: 'error' });
                } else {
                    displaySnack('Flow saved as draft!', { variant: 'success' });
                    closeDialog();
                }
            },
            onError: (err) => {
                displaySnack(`Error saving draft: ${err.message}`, { variant: 'error' });
            },
        });
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
                        disabled={isMutationInFlight}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <LiveFeedbackFlowForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        onSaveDraft={handleSaveDraft}
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
