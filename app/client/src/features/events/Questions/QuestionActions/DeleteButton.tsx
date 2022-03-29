import * as React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { graphql, useMutation, useFragment } from 'react-relay';
import { DeleteButtonFragment$key } from '@local/__generated__/DeleteButtonFragment.graphql';
import { DeleteButtonMutation } from '@local/__generated__/DeleteButtonMutation.graphql';

const DELETE_QUESTION_FRAGMENT = graphql`
    fragment DeleteButtonFragment on EventQuestion {
        id
    }
`;

const DELETE_QUESTION_MUTATION = graphql`
    mutation DeleteButtonMutation($input: DeleteQuestion!) {
        deleteQuestion(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: DeleteButtonFragment$key;
    className?: string;
}

export function DeleteButton({ className = undefined, fragmentRef }: Props) {
    const { id: questionId } = useFragment(DELETE_QUESTION_FRAGMENT, fragmentRef);
    const [commit] = useMutation<DeleteButtonMutation>(DELETE_QUESTION_MUTATION);

    function handleClick() {
        commit({
            variables: {
                input: {
                    questionId,
                },
            },
        });
    }

    return (
        <div>
            <Button
                color='secondary'
                onClick={handleClick}
                endIcon={<DeleteIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Delete
            </Button>
        </div>
    );
}
