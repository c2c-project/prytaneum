import { useMemo } from 'react';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionDeletedByTopicSubscription } from '@local/__generated__/useQuestionDeletedByTopicSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { useTopic } from '../useTopic';

export const USE_QUESTION_DELETED_BY_TOPIC_SUBSCRIPTION = graphql`
    subscription useQuestionDeletedByTopicSubscription($eventId: ID!) {
        questionDeleted(eventId: $eventId) {
            edge {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

export function useQuestionDeletedByTopic() {
    const { eventId } = useEvent();
    const { topics } = useTopic();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionDeletedByTopicSubscription>>(
        () => ({
            variables: {
                eventId,
            },
            subscription: USE_QUESTION_DELETED_BY_TOPIC_SUBSCRIPTION,
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');

                const payload = store.getRootField('questionDeleted');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                const node = serverEdge.getLinkedRecord('node');
                if (!node) return console.error('Update failed: No node found!');
                const nodeId = node.getValue('id') as string;

                // Always delete from default list
                const defaultConnectionRecord = ConnectionHandler.getConnection(
                    eventRecord,
                    'useQuestionsByTopicFragment_questionsByTopic',
                    { topic: 'default' }
                );
                if (defaultConnectionRecord) {
                    ConnectionHandler.deleteNode(defaultConnectionRecord, nodeId);
                }

                // Delete from all topic lists
                topics.forEach(({ topic }) => {
                    const topicConnectionRecord = ConnectionHandler.getConnection(
                        eventRecord,
                        'useQuestionsByTopicFragment_questionsByTopic',
                        { topic }
                    );
                    if (topicConnectionRecord) {
                        ConnectionHandler.deleteNode(topicConnectionRecord, nodeId);
                    }
                });
            },
        }),
        [eventId, topics]
    );

    useSubscription<useQuestionDeletedByTopicSubscription>(createdConfig);
}
