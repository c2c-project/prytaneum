import * as React from 'react';
import { Button } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/QueueOutlined';
import { graphql, useMutation, useFragment } from 'react-relay';

import type { QueueButtonMutation } from '@local/__generated__/QueueButtonMutation.graphql';
import type { QueueButtonFragment$key } from '@local/__generated__/QueueButtonFragment.graphql';
import { useEvent } from '@local/features/events';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import { useSnack } from '@local/features/core';

export interface QueueButtonProps {
    fragmentRef: QueueButtonFragment$key;
    currentQuestion: number | null;
}

export const QUEUE_BUTTON_FRAGMENT = graphql`
    fragment QueueButtonFragment on EventQuestion {
        id
        position
    }
`;

export const QUEUE_BUTTON_MUTATION = graphql`
    mutation QueueButtonMutation($input: UpdateQuestionQueue!) {
        updateQuestionQueue(input: $input) {
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
export function QueueButton({ fragmentRef, currentQuestion }: QueueButtonProps) {
    const { id: questionId, position } = useFragment(QUEUE_BUTTON_FRAGMENT, fragmentRef);
    // const data = useFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const [commit] = useMutation<QueueButtonMutation>(QUEUE_BUTTON_MUTATION);
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    // NOTE: this isn't the greatest b/c it has to be aware of the key of a different component...
    // const connection = useConnection(eventId, 'QuestionQueueFragment_queuedQuestions');

    const isQueued = React.useMemo(() => {
        if (!position || position === -1) return false;
        return true;
    }, [position]);

    const handleClick = () => {
        if (isQueued && currentQuestion === position) {
            displaySnack('Cannot dequeue the current question');
        } else if (isQueued && currentQuestion > position) {
            displaySnack('Cannot dequeue already asked questions');
        } else {
            commit({
                variables: {
                    input: {
                        questionId,
                        eventId,
                        adding: !isQueued
                    }
                },
                // updater: (store: RecordSourceSelectorProxy) => {
                //     const EventProxy = store.get(eventId);
                //     if (!EventProxy) return;
                //     const conn = ConnectionHandler.getConnection(EventProxy, 'QuestionQueueFragment_queuedQuestions');
                //     const payload = store.getRootField('updateQuestionQueue');
                //     if (!conn || !payload) return;
                //     if (isQueued) {
                //         // If the question is being dequeued then delete the node from the connection
                //         ConnectionHandler.deleteNode(conn, questionId);
                //     } else {
                //         const serverEdge = payload.getLinkedRecord('body');
                //         if (!serverEdge) return;
                //         const newEdge = ConnectionHandler.buildConnectionEdge(store, conn, serverEdge);
                //         if (!newEdge) return;
                //         ConnectionHandler.insertEdgeAfter(conn, newEdge);
                //     }
                // },
                onCompleted: ({ updateQuestionQueue }) => {
                    if (updateQuestionQueue.isError) {
                        displaySnack(updateQuestionQueue.message);
                    }
                }
            });
        }
    };
    return (
        <Button
            fullWidth
            color={isQueued ? 'secondary' : 'inherit'}
            endIcon={<QueueIcon fontSize='small' />}
            onClick={handleClick}
        >
            Enqueue
        </Button>
    );
}
