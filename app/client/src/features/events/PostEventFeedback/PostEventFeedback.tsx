import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useMutation, graphql } from 'react-relay';

import type { PostEventFeedbackMutation } from '@local/__generated__/PostEventFeedbackMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import * as ga from '@local/utils/ga/index';
import { isURL } from '@local/utils';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';
import { PostEventFeedbackForm, TPostEventFeedbackFormState } from './PostEventFeedbackForm';

export interface PostEventFeedbackProps {
    className?: string;
    eventId: string;
}

export const POST_EVENT_FEEDBACK_MUTATION = graphql`
    mutation PostEventFeedbackMutation($feedback: String!, $eventId: ID!) {
        submitPostEventFeedback(feedback: $feedback, eventId: $eventId) {
            isError
            message
        }
    }
`;

function PostEventFeedback({ className, eventId }: PostEventFeedbackProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation<PostEventFeedbackMutation>(POST_EVENT_FEEDBACK_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TPostEventFeedbackFormState) {
        try {
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.feedback.length > FEEDBACK_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.feedback)) throw new Error('no links are allowed!');
            commit({
                variables: { feedback: form.feedback, eventId },
                onCompleted(payload) {
                    try {
                        if (payload.submitPostEventFeedback.isError)
                            throw new Error(payload.submitPostEventFeedback.message);
                        ga.event({
                            action: 'submit_post_event_feedback',
                            category: 'feedback',
                            label: 'post event',
                            value: form.feedback,
                        });
                        close();
                        displaySnack('Question submitted!', { variant: 'success' });
                    } catch (err) {
                        displaySnack(err.message, { variant: 'error' });
                    }
                },
            });
        } catch (err) {
            displaySnack(err.message, { variant: 'error' });
        }
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <PostEventFeedbackForm onCancel={close} onSubmit={handleSubmit} />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                className={className}
                variant='contained'
                size='large'
                color='primary'
                onClick={open}
                startIcon={<QuestionAnswerIcon fontSize='inherit' />}
            >
                Submit Feedback
            </Button>
        </>
    );
}

export default React.memo(PostEventFeedback);
