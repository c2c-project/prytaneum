import * as React from 'react';
import { DialogContent } from '@material-ui/core';
import { useMutation } from 'react-relay';

import type { AskQuestionMutation } from '@local/__generated__/AskQuestionMutation.graphql';
import { ASK_QUESTION_MUTATION } from './AskQuestion'
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/features/core';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';

export interface Props {
    isOpen: boolean;
    openDialog: string;
    openLinked: () => void;
    close: () => void;
    eventId: string;
}

export function QuestionDialog({ isOpen, openLinked, close, eventId }: Props) {
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TQuestionFormState) {
        commit({
            variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
            onCompleted(payload) {
                if (payload.createQuestion.isError) displaySnack('Something went wrong!');
                else close;
            },
        });
    }

    return (
        <ResponsiveDialog
            open={isOpen}
            onClose={close}
        >
            <DialogContent>
                <QuestionForm
                    openLinked={openLinked}
                    onCancel={close}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </ResponsiveDialog>
    );
}
