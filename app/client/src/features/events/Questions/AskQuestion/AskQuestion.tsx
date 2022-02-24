import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql } from 'react-relay';

import type { AskQuestionMutation } from '@local/__generated__/AskQuestionMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/features/core';
import { useUser } from '@local/features/accounts';
import * as ga from '@local/utils/ga/index';
import { isURL } from '@local/utils/index';
import { QUESTIONS_MAX_LENGTH } from '@local/utils/rules';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';

export interface AskQuestionProps {
    className?: string;
    eventId: string;
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

function AskQuestion({ className, eventId }: AskQuestionProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [user] = useUser();
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TQuestionFormState) {
        try {
            if (form.question.length >= QUESTIONS_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.question)) throw new Error('No links are allowed!');
            commit({
                variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
                onCompleted(payload) {
                    if (payload.createQuestion.isError) displaySnack('Something went wrong!');
                    else {
                        ga.event({
                            action: 'submit_question',
                            category: 'questions',
                            label: 'live event',
                            value: form.question,
                        });
                        close();
                    }
                },
            });
        } catch (err) {
            displaySnack(err.message);
        }
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
