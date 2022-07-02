import * as React from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { graphql, useMutation } from 'react-relay';

import type { EnqueueQuestionButtonMutation } from '@local/__generated__/EnqueueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';

export interface QueueButtonProps {
    questionId: string;
}

export const ENQUEUE_BUTTON_FRAGMENT = graphql`
    fragment EnqueueQuestionButtonFragment on EventQuestion {
        id
        position
    }
`;

export const ENQUEUE_BUTTON_MUTATION = graphql`
    mutation EnqueueQuestionButtonMutation($input: AddQuestionToQueue!) {
        addQuestionToQueue(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                }
            }
        }
    }
`;

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function EnqueueQuestionButton({ questionId }: QueueButtonProps) {
    const [commit] = useMutation<EnqueueQuestionButtonMutation>(ENQUEUE_BUTTON_MUTATION);
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    const handleClick = () => {
        commit({
            variables: {
                input: {
                    questionId,
                    eventId,
                },
            },
            onCompleted: ({ addQuestionToQueue }) => {
                if (addQuestionToQueue.isError) {
                    displaySnack(addQuestionToQueue.message);
                }
            },
        });
    };
    return (
        <Button fullWidth endIcon={<AddCircleIcon fontSize='small' />} onClick={handleClick}>
            Enqueue
        </Button>
    );
}
