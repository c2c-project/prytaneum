/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { graphql, useSubscription, useFragment } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';
import type { useQuestionQueueAddedToEnqueuedSubscription } from '@local/__generated__/useQuestionQueueAddedToEnqueuedSubscription.graphql';
import type { useQuestionQueueRemovedFromEnqueuedSubscription } from '@local/__generated__/useQuestionQueueRemovedFromEnqueuedSubscription.graphql';
import type { useQuestionQueueAddedToRecordSubscription } from '@local/__generated__/useQuestionQueueAddedToRecordSubscription.graphql';
import type { useQuestionQueueRemovedFromRecordSubscription } from '@local/__generated__/useQuestionQueueRemovedFromRecordSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_QUESTION_QUEUE_FRAGMENT = graphql`
    fragment useQuestionQueueFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        currentQuestion
        questionQueue {
            questionRecord(first: $first, after: $after) @connection(key: "QuestionQueueFragment_questionRecord") {
                __id
                edges {
                    cursor
                    node {
                        id
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                    }
                }
            }
            enqueuedQuestions(first: $first, after: $after)
                @connection(key: "QuestionQueueFragment_enqueuedQuestions") {
                __id
                edges {
                    cursor
                    node {
                        id
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                    }
                }
            }
        }
    }
`;

export const USE_ADDED_TO_ENQUEUED_SUBSCRIPTION = graphql`
    subscription useQuestionQueueAddedToEnqueuedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionAddedToEnqueued(eventId: $eventId) @appendEdge(connections: $connections) {
            node {
                id
                ...QuestionAuthorFragment
                ...QuestionStatsFragment
                ...QuestionContentFragment
                position
            }
            cursor
        }
    }
`;

export const USE_REMOVED_FROM_ENQUEUED_SUBSCRIPTION = graphql`
    subscription useQuestionQueueRemovedFromEnqueuedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionRemovedFromEnqueued(eventId: $eventId) {
            node {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

export const USE_ADDED_TO_RECORD_SUBSCRIPTION = graphql`
    subscription useQuestionQueueAddedToRecordSubscription($eventId: ID!, $connections: [ID!]!) {
        questionAddedToRecord(eventId: $eventId) @appendEdge(connections: $connections) {
            node {
                id
                ...QuestionAuthorFragment
                ...QuestionStatsFragment
                ...QuestionContentFragment
                position
            }
            cursor
        }
    }
`;

export const USE_REMOVED_FROM_RECORD_SUBSCRIPTION = graphql`
    subscription useQuestionQueueRemovedFromRecordSubscription($eventId: ID!, $connections: [ID!]!) {
        questionRemovedFromRecord(eventId: $eventId) {
            node {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

export function useQuestionQueue({ fragmentRef }: { fragmentRef: useQuestionQueueFragment$key }) {
    const { questionQueue } = useFragment(USE_QUESTION_QUEUE_FRAGMENT, fragmentRef);
    const { eventId } = useEvent();
    const addedtoEnqueuedConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueAddedToEnqueuedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
            },
            subscription: USE_ADDED_TO_ENQUEUED_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const removedFromEnqueuedConfig = React.useMemo<
        GraphQLSubscriptionConfig<useQuestionQueueRemovedFromEnqueuedSubscription>
    >(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
            },
            subscription: USE_REMOVED_FROM_ENQUEUED_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const addedToRecordConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueAddedToRecordSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.questionRecord?.__id ? [questionQueue.questionRecord.__id] : [],
            },
            subscription: USE_ADDED_TO_RECORD_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const removedFromRecordConfig = React.useMemo<
        GraphQLSubscriptionConfig<useQuestionQueueRemovedFromRecordSubscription>
    >(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.questionRecord?.__id ? [questionQueue.questionRecord.__id] : [],
            },
            subscription: USE_REMOVED_FROM_RECORD_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    useSubscription(addedtoEnqueuedConfig);
    useSubscription(removedFromEnqueuedConfig);
    useSubscription(addedToRecordConfig);
    useSubscription(removedFromRecordConfig);
    return questionQueue;
}
