// Subscription to the topic queue being updated
import { useQuestionEnqueuedSubscription } from '@local/__generated__/useQuestionEnqueuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { ConnectionHandler, graphql, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useEvent } from '../../useEvent';
import { useTopic } from '../useTopic';

const USE_QUESTION_ENQUEUED = graphql`
    subscription useQuestionEnqueuedSubscription($eventId: ID!) {
        questionEnqueued(eventId: $eventId) {
            edge {
                node {
                    id
                }
            }
        }
    }
`;

export function useQuestionEnqueued() {
    const { eventId } = useEvent();
    const { topics } = useTopic();

    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionEnqueuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_ENQUEUED,
            variables: { eventId },
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');

                const payload = store.getRootField('questionEnqueued');
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

    useSubscription<useQuestionEnqueuedSubscription>(config);
}
