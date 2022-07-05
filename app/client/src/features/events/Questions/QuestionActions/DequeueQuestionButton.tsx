import * as React from 'react';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { graphql, useMutation } from 'react-relay';

import type { DequeueQuestionButtonMutation } from '@local/__generated__/DequeueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';

export interface QueueButtonProps {
    questionId: string;
}
export const DEQUEUE_BUTTON_MUTATION = graphql`
    mutation DequeueQuestionButtonMutation($input: RemoveQuestionFromQueue!) {
        removeQuestionFromQueue(input: $input) {
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
export function DequeueQuestionButton({ questionId }: QueueButtonProps) {
    // const data = useFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const [commit] = useMutation<DequeueQuestionButtonMutation>(DEQUEUE_BUTTON_MUTATION);
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
            onCompleted: ({ removeQuestionFromQueue }) => {
                if (removeQuestionFromQueue.isError) {
                    displaySnack(removeQuestionFromQueue.message);
                }
            },
        });
    };
    return (
        <Button fullWidth color='secondary' endIcon={<CancelIcon fontSize='small' />} onClick={handleClick}>
            Dequeue
        </Button>
    );
}
