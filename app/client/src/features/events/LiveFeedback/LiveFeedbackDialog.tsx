import * as React from 'react';
import { DialogContent } from '@material-ui/core';
import { useMutation } from 'react-relay';

import type { SubmitLiveFeedbackMutation } from '@local/__generated__/SubmitLiveFeedbackMutation.graphql';
import { SUBMIT_LIVE_FEEDBACK_MUTATION } from './SubmitLiveFeedback'
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LiveFeedbackForm, TLiveFeedbackFormState } from './LiveFeedbackForm';

interface Props {
    isOpen: boolean;
    openDialog: string;
    openLinked: () => void;
    close: () => void;
    eventId: string;
}

export function LiveFeedbackDialog({ isOpen, openLinked, close, eventId }: Props) {
    const [commit] = useMutation<SubmitLiveFeedbackMutation>(SUBMIT_LIVE_FEEDBACK_MUTATION);

    function handleSubmit(form: TLiveFeedbackFormState) {
        commit({
            variables: { input: { ...form, eventId } },
            onCompleted: close,
        });
    }

    return (
        <ResponsiveDialog
            open={isOpen}
            onClose={close}
        >
            <DialogContent>
                <LiveFeedbackForm
                    openLinked={openLinked}
                    onCancel={close}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </ResponsiveDialog>
    );
}