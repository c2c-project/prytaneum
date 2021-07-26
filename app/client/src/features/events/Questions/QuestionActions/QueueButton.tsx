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
}

export const QUEUE_BUTTON_FRAGMENT = graphql`
    fragment QueueButtonFragment on EventQuestion {
        id
        position
    }
`;

export const QUEUE_BUTTON_MUTATION = graphql`
    mutation QueueButtonMutation($input: AddQuestionToQueue!) {
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
export function QueueButton({ fragmentRef }: QueueButtonProps) {
    const { id: questionId, position } = useFragment(QUEUE_BUTTON_FRAGMENT, fragmentRef);
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
        commit({
            variables: {
                input: {
                    questionId,
                    eventId,
                }
            },
            updater: (store: RecordSourceSelectorProxy) => {
                const EventProxy = store.get(eventId);
                if (!EventProxy) return;
                const conn = ConnectionHandler.getConnection(EventProxy, 'QuestionQueueFragment_queuedQuestions');
                const payload = store.getRootField('addQuestionToQueue');
                if (!conn || !payload) return;
                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return;
                const newEdge = ConnectionHandler.buildConnectionEdge(store, conn, serverEdge);
                if (!newEdge) return;
                ConnectionHandler.insertEdgeAfter(conn, newEdge);
            },
            onCompleted: ({ addQuestionToQueue }) => {
                if (addQuestionToQueue.isError) {
                    displaySnack(addQuestionToQueue.message);
                }
            }
        });
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
