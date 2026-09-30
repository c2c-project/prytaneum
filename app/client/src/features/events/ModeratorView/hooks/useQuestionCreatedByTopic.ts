import { useMemo } from 'react';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionCreatedByTopicSubscription } from '@local/__generated__/useQuestionCreatedByTopicSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_QUESTION_CREATED_SUBSCRIPTION = graphql`
    subscription useQuestionCreatedByTopicSubscription($eventId: ID!, $lang: String!) {
        questionCreatedByTopic(eventId: $eventId) {
            edge {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

// Attempt to filter questions being added to the list by topic
// Should only be added to the lists that are related to the question's topics & default
export function useQuestionCreatedByTopic() {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionCreatedByTopicSubscription>>(
        () => ({
            variables: {
                eventId,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_QUESTION_CREATED_SUBSCRIPTION,
            // Need to use a custom updater because a single asked question can be added to multiple lists by topic
            // This is because a question should always be in the default list along with any topics it is related to
            // This updater ensures that all the connections are updated at the same time so it is in every spot it should be.
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');
                // Update all the proper topic lists with the new question (default, and the question's topics)

                const payload = store.getRootField('questionCreatedByTopic');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                const node = serverEdge.getLinkedRecord('node');
                const topics = node?.getLinkedRecords('topics');
                const topicNames = topics ? topics.map((_topic) => _topic.getValue('topic')) : [];

                // Always update the default topic list
                const defaultConnectionRecord = ConnectionHandler.getConnection(
                    eventRecord,
                    'useQuestionsByTopicFragment_questionsByTopic',
                    { topic: 'default' }
                );
                if (defaultConnectionRecord) {
                    ConnectionHandler.insertEdgeBefore(defaultConnectionRecord, serverEdge);
                }

                // Update the topic lists that are in the question's topics
                topicNames.forEach((_topic) => {
                    const topicConnectionRecord = ConnectionHandler.getConnection(
                        eventRecord,
                        'useQuestionsByTopicFragment_questionsByTopic',
                        { topic: _topic }
                    );
                    if (topicConnectionRecord) {
                        ConnectionHandler.insertEdgeBefore(topicConnectionRecord, serverEdge);
                    }
                });
            },
        }),
        [eventId, user?.preferredLang]
    );

    useSubscription<useQuestionCreatedByTopicSubscription>(createdConfig);
}
