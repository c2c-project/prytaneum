import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql } from 'react-relay';

import type { AskQuestionMutation } from '@local/__generated__/AskQuestionMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { useUser } from '@local/features/accounts';
import * as ga from '@local/utils/ga/index';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';
import ValidationError from './ValidationError';

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
function isURL(str: string) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return !!pattern.test(str);
}

function AskQuestion({ className, eventId }: AskQuestionProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [user] = useUser();
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TQuestionFormState) {
        commit({
            variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
            onCompleted(payload) {
                try {
                    if (payload.createQuestion.isError) throw new Error(payload.createQuestion.message);
                    if (form.question.length >= 1000) throw new ValidationError('Question is too long!');
                    if (new URL(form.question)) throw new ValidationError('no links are allowed!');
                    ga.event({
                        action: 'submit_question',
                        category: 'questions',
                        label: 'live event',
                        value: form.question,
                    });
                    close();
                    displaySnack('Question submitted!');
                } catch (err) {
                    displaySnack(err.message);
                }
            },
        });
    }
    // function handleSubmit(form: TQuestionFormState) {
    //     commit({
    //         variables: { input: { ...form, eventId, isFollowUp: false, isQuote: false } },
    //         onCompleted() {
    //             try {
    //                 if (form.question.length >= 1000) throw new ValidationError('Question is too long!')
    //                 if (new URL(form.question)) throw new ValidationError('no links are allowed!')
    //                 close();
    //             } catch(err){
    //                 displaySnack(err.message);
    //             }
    //         },
    //     });
    // }

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
