import * as React from 'react';
import { Button, DialogContent, Grid, Tooltip, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useMutation, graphql } from 'react-relay';

import type { ShareFeedbackPromptFlowMutation } from '@local/__generated__/ShareFeedbackPromptFlowMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { Flow } from '../LiveFeedbackPrompt';

export const SHARE_FEEDBACK_PROMPT_FLOW_MUTATION = graphql`
    mutation ShareFeedbackPromptFlowMutation($flowId: ID!) {
        reshareFeedbackFlow(flowId: $flowId) {
            isError
            message
            body {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

interface Props {
    flow: Flow;
}

export function ShareFeedbackPromptFlow({ flow }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<ShareFeedbackPromptFlowMutation>(SHARE_FEEDBACK_PROMPT_FLOW_MUTATION);

    function handleSubmit() {
        try {
            commit({
                variables: { flowId: flow.id },
                onCompleted(payload) {
                    try {
                        if (payload.reshareFeedbackFlow.isError) throw new Error(payload.reshareFeedbackFlow.message);
                        close();
                        displaySnack('Prompt Flow re-shared successfully!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>Are you sure you want to reshare this survey?</Typography>
                    <Typography variant='subtitle2'>
                        NOTE: Only shares with participants that have not yet responded to the survey.
                    </Typography>
                    <Typography variant='body1'>
                        <b>Flow: {flow.flowName}</b>
                    </Typography>
                    <Grid container justifyContent='end'>
                        <Button variant='outlined' onClick={close}>
                            Cancel
                        </Button>
                        <div style={{ width: '0.5rem' }} />
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Share
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Tooltip title="Share with anyone who hasn't responded yet." placement='top'>
                <Button variant='contained' startIcon={<ReplayIcon />} onClick={open}>
                    Reshare Survey
                </Button>
            </Tooltip>
        </React.Fragment>
    );
}
