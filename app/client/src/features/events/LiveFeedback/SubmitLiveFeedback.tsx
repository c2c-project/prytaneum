import * as React from 'react';
import { Button } from '@material-ui/core';
import { graphql } from 'react-relay';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';

import { useUser } from '@local/features/accounts';

interface Props {
    className?: string;
    open: () => void;
}

export const SUBMIT_LIVE_FEEDBACK_MUTATION = graphql`
    mutation SubmitLiveFeedbackMutation($input: CreateFeedback!) {
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

export function SubmitLiveFeedback({ open, className }: Props) {
    const [user] = useUser();

    return (
        <Button
            className={className}
            disabled={!user}
            variant='contained'
            color='primary'
            onClick={open}
            startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
        >
            {user ? 'Submit Live Feedback' : 'Sign in to submit live feedback'}
        </Button>
    );
}