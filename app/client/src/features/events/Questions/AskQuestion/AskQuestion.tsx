import * as React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';
import { useMutation, graphql, ConnectionHandler } from 'react-relay';

import type { AskQuestionMutation } from '@local/__generated__/AskQuestionMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';

export interface AskQuestionProps {
    className?: string;
    eventId: string;
    connectionKey: string;
}

export const ASK_QUESTION_MUTATION = graphql`
    mutation AskQuestionMutation($input: CreateQuestion!) {
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

function AskQuestion({ className, eventId, connectionKey }: AskQuestionProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [user] = useUser();
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);

    function handleSubmit(form: TQuestionFormState) {
        commit({
            variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
            onCompleted: close,
        });
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <QuestionForm onCancel={close} onSubmit={handleSubmit} />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                className={className}
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={open}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
            >
                {user ? 'Ask My Question' : 'Sign in to ask a question'}
            </Button>
        </>
    );
}

export default React.memo(AskQuestion);
