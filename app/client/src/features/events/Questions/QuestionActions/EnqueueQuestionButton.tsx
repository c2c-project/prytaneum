import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';

import type { EnqueueQuestionButtonMutation } from '@local/__generated__/EnqueueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';
import { useTopic } from '../../ModeratorView/useTopic';
import { useUser } from '@local/features/accounts';

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
    mutation EnqueueQuestionButtonMutation($input: AddQuestionToTopicQueue!, $lang: String!) {
        addQuestionToTopicQueue(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    question
                    lang
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        id
                        firstName
                        lastName
                        avatar
                    }
                    createdAt
                    likedByCount
                    isLikedByViewer
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionTopicsFragment
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
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
    const { user } = useUser();
    const { topic } = useTopic();
    const { displaySnack } = useSnack();

    const handleClick = React.useCallback(() => {
        commit({
            variables: {
                input: {
                    questionId,
                    eventId,
                    topic,
                },
                lang: user?.preferredLang ?? 'EN',
            },
            onCompleted: ({ addQuestionToTopicQueue }) => {
                if (addQuestionToTopicQueue.isError) {
                    displaySnack(addQuestionToTopicQueue.message);
                }
            },
            updater: (store) => {
                // Remove the question from the current list
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');
                const connectionRecord = ConnectionHandler.getConnection(
                    eventRecord,
                    'useQuestionsByTopicFragment_questionsByTopic',
                    { topic }
                );
                if (connectionRecord) {
                    ConnectionHandler.deleteNode(connectionRecord, questionId);
                }

                // Also remove the question from the default list (if the current topic is not default)
                if (topic !== 'default') {
                    const defaultConnectionRecord = ConnectionHandler.getConnection(
                        eventRecord,
                        'useQuestionsByTopicFragment_questionsByTopic',
                        { topic: 'default' }
                    );
                    if (defaultConnectionRecord) {
                        ConnectionHandler.deleteNode(defaultConnectionRecord, questionId);
                    }
                }

                // Add the question to the topic queue
                const queueConnection = ConnectionHandler.getConnection(
                    eventRecord,
                    'useQuestionModQueueFragment_questionModQueue'
                );
                if (!queueConnection) return console.error('Update failed: No queue connection found!');
                const payload = store.getRootField('addQuestionToTopicQueue');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                ConnectionHandler.insertEdgeAfter(queueConnection, serverEdge);
            },
        });
    }, [commit, displaySnack, eventId, questionId, topic, user]);
    return (
        <IconButton onClick={handleClick}>
            <Tooltip title='Enqueue Question' placement='bottom'>
                <AddCircleIcon sx={{ color: (theme) => theme.palette.primary.main }} fontSize='medium' />
            </Tooltip>
        </IconButton>
    );
}
