import * as React from 'react';
import { Button } from '@material-ui/core';
import { graphql } from 'react-relay';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';

import { useUser } from '@local/features/accounts';

export interface AskQuestionProps {
    className?: string;
    open: () => void;
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

function AskQuestion({ open, className }: AskQuestionProps) {
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
            {user ? 'Ask a Question' : 'Sign in to ask a question'}
        </Button>
    );
}

export default React.memo(AskQuestion);
