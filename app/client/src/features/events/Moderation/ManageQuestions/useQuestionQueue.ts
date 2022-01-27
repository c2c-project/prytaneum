/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { graphql, useSubscription, useFragment } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';
import type { useQuestionQueueEnqueuedPushSubscription } from '@local/__generated__/useQuestionQueueEnqueuedPushSubscription.graphql';
import type { useQuestionQueueEnqueuedUnshiftSubscription } from '@local/__generated__/useQuestionQueueEnqueuedUnshiftSubscription.graphql';
import type { useQuestionQueueEnqueuedRemoveSubscription } from '@local/__generated__/useQuestionQueueEnqueuedRemoveSubscription.graphql';
import type { useQuestionQueueRecordPushSubscription } from '@local/__generated__/useQuestionQueueRecordPushSubscription.graphql';
import type { useQuestionQueueRecordUnshiftSubscription } from '@local/__generated__/useQuestionQueueRecordUnshiftSubscription.graphql';
import type { useQuestionQueueRecordRemoveSubscription } from '@local/__generated__/useQuestionQueueRecordRemoveSubscription.graphql';
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
export const USE_ENQUEUED_PUSH_SUBSCRIPTION = graphql`
    subscription useQuestionQueueEnqueuedPushSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
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
    }
`;

export const USE_ENQUEUED_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useQuestionQueueEnqueuedUnshiftSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedUnshiftQuestion(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
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
    }
`;

export const USE_ENQUEUED_REMOVE_SUBSCRIPTION = graphql`
    subscription useQuestionQueueEnqueuedRemoveSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

export const USE_RECORD_PUSH_SUBSCRIPTION = graphql`
    subscription useQuestionQueueRecordPushSubscription($eventId: ID!, $connections: [ID!]!) {
        recordPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
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
    }
`;

export const USE_RECORD_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useQuestionQueueRecordUnshiftSubscription($eventId: ID!, $connections: [ID!]!) {
        recordUnshiftQuestion(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
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
    }
`;

export const USE_RECORD_REMOVE_SUBSCRIPTION = graphql`
    subscription useQuestionQueueRecordRemoveSubscription($eventId: ID!, $connections: [ID!]!) {
        recordRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

export function useQuestionQueue({ fragmentRef }: { fragmentRef: useQuestionQueueFragment$key }) {
    const { questionQueue } = useFragment(USE_QUESTION_QUEUE_FRAGMENT, fragmentRef);
    const { eventId } = useEvent();
    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueEnqueuedPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
            },
            subscription: USE_ENQUEUED_PUSH_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const enqueuedUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueEnqueuedUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
            },
            subscription: USE_ENQUEUED_UNSHIFT_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const enqueuedRemoveConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueEnqueuedRemoveSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
            },
            subscription: USE_ENQUEUED_REMOVE_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const recordPushConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueRecordPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.questionRecord?.__id ? [questionQueue.questionRecord.__id] : [],
            },
            subscription: USE_RECORD_PUSH_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const recordUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueRecordUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.questionRecord?.__id ? [questionQueue.questionRecord.__id] : [],
            },
            subscription: USE_RECORD_UNSHIFT_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    const recordRemoveConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionQueueRecordRemoveSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: questionQueue?.questionRecord?.__id ? [questionQueue.questionRecord.__id] : [],
            },
            subscription: USE_RECORD_REMOVE_SUBSCRIPTION,
        }),
        [questionQueue, eventId]
    );
    // useSubscription(enqueuedPushConfig);
    // useSubscription(enqueuedUnshiftConfig);
    // useSubscription(enqueuedRemoveConfig);
    // useSubscription(recordPushConfig);
    // useSubscription(recordUnshiftConfig);
    // useSubscription(recordRemoveConfig);
    return questionQueue;
}
