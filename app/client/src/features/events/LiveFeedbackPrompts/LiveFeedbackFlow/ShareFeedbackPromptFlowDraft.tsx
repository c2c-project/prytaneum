import * as React from 'react';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMutation, graphql } from 'react-relay';

import type { ShareFeedbackPromptFlowDraftMutation } from '@local/__generated__/ShareFeedbackPromptFlowDraftMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { Flow } from '../LiveFeedbackPrompt/LiveFeedbackPromptList';

interface Props {
    flow: Flow;
}

export const SHARE_PROMPT_DRAFT_MUTATION = graphql`
    mutation ShareFeedbackPromptFlowDraftMutation($flowId: ID!) {
        shareFeedbackFlowDraft(flowId: $flowId) {
            isError
            message
            body {
                cursor
                node {
                    id
                    isDraft
                }
            }
        }
    }
`;

export function ShareFeedbackPromptFlowDraft({ flow }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<ShareFeedbackPromptFlowDraftMutation>(SHARE_PROMPT_DRAFT_MUTATION);

    function handleSubmit() {
        try {
            commit({
                variables: { flowId: flow.id },
                onCompleted(payload) {
                    try {
                        if (payload.shareFeedbackFlowDraft.isError)
                            throw new Error(payload.shareFeedbackFlowDraft.message);
                        close();
                        displaySnack('Prompt submitted successfully!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
                updater(store) {
                    const promptRecord = store.get(flow.id);
                    if (!promptRecord) return console.error('Prompt not found in store');
                    promptRecord.setValue(false, 'isDraft');
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
                    <Typography variant='h6'>Are you sure you want to share this survey?</Typography>
                    <Typography variant='body1'>Survey: {flow.flowName}</Typography>
                    <Grid container justifyContent='end'>
                        <Button onClick={close}>Cancel</Button>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Share
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Button variant='contained' startIcon={<SendIcon />} onClick={open}>
                Share Draft
            </Button>
        </React.Fragment>
    );
}
