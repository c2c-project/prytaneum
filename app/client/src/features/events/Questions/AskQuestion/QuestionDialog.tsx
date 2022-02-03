import * as React from 'react';
import { DialogContent } from '@material-ui/core';
import { useMutation, graphql } from 'react-relay';

import type { QuestionDialogMutation } from '@local/__generated__/QuestionDialogMutation.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/features/core';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';

export interface Props {
    isOpen: boolean;
    openLinked: () => void; // opens linked dialog
    close: () => void; // closes current dialog
    eventId: string;
}

export const QUESTION_DIALOG_MUTATION = graphql`
    mutation QuestionDialogMutation($input: CreateQuestion!) {
        createQuestion(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    createdAt
                    question
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

export function QuestionDialog({ isOpen, openLinked, close, eventId }: Props) {
    const [commit] = useMutation<QuestionDialogMutation>(QUESTION_DIALOG_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TQuestionFormState) {
        commit({
            variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
            onCompleted(payload) {
                if (payload.createQuestion.isError) displaySnack('Something went wrong!');
                else close();
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

QuestionDialog.defaultProps = {
    openLinked: null
}
