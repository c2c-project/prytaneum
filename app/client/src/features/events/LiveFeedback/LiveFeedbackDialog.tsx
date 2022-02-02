import * as React from 'react';
import { DialogContent } from '@material-ui/core';
import { useMutation, graphql } from 'react-relay';

import type { LiveFeedbackDialogMutation } from '@local/__generated__/LiveFeedbackDialogMutation.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LiveFeedbackForm, TLiveFeedbackFormState } from './LiveFeedbackForm';

interface Props {
    isOpen: boolean;
    openLinked: () => void; // opens linked dialog
    close: () => void; // closes current dialog
    eventId: string;
}

export const LIVE_FEEDBACK_DIALOG_MUTATION = graphql`
    mutation LiveFeedbackDialogMutation($input: CreateFeedback!) {
        createFeedback(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    createdAt
                    message
                    createdBy {
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;

export function LiveFeedbackDialog({ isOpen, openLinked, close, eventId }: Props) {
    const [commit] = useMutation<LiveFeedbackDialogMutation>(LIVE_FEEDBACK_DIALOG_MUTATION);

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