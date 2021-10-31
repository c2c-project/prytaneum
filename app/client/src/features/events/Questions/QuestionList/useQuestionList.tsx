import * as React from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql, useFragment } from 'react-relay';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import type { useQuestionListCreatedSubscription } from '@local/__generated__/useQuestionListCreatedSubscription.graphql';
import type { useQuestionListUpdatedSubscription } from '@local/__generated__/useQuestionListUpdatedSubscription.graphql';
import type { useQuestionListDeletedSubscription } from '@local/__generated__/useQuestionListDeletedSubscription.graphql';


export const USE_QUESTION_LIST_CREATED_SUBSCRIPTION = graphql`
    subscription useQuestionListCreatedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionCreated(eventId: $eventId) @appendEdge(connections: $connections) {
            cursor
            node {
                id
                position
                ...QuestionAuthorFragment
                ...QuestionContentFragment
                ...QuestionStatsFragment
            }
        }
    }
`;

export const USE_QUESTION_LIST_UPDATED_SUBSCRIPTION = graphql`
    subscription useQuestionListUpdatedSubscription($eventId: ID!) {
        questionCreated(eventId: $eventId) {
            cursor
            node {
                id
                position
                ...QuestionAuthorFragment
                ...QuestionContentFragment
                ...QuestionStatsFragment
            }
        }
    }
`;

export const USE_QUESTION_LIST_DELETED_SUBSCRIPTION = graphql`
    subscription useQuestionListDeletedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionCreated(eventId: $eventId) {
            cursor
            node {
                id @deleteEdge(connections: $connections)
                position
                ...QuestionAuthorFragment
                ...QuestionContentFragment
                ...QuestionStatsFragment
            }
        }
    }
`;

// TODO: make the pagination here better
export const USE_QUESTION_LIST_FRAGMENT = graphql`
    fragment useQuestionListFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        currentQuestion
        questions(first: $first, after: $after) @connection(key: "useQuestionListFragment_questions") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment
                    }
                    ...QuestionActionsFragment
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

interface TArgs {
    fragmentRef: useQuestionListFragment$key;
}

export function useQuestionList({ fragmentRef }: TArgs) {
    const { questions, id: eventId, currentQuestion } = useFragment(USE_QUESTION_LIST_FRAGMENT, fragmentRef);
    const connections = React.useMemo(() => (questions?.__id ? [questions.__id] : []), [questions?.__id]);
    const questionList = React.useMemo(
        () => (questions?.edges ? questions.edges.map(({ node }) => node) : []),
        [questions]
    );

    const createdConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionListCreatedSubscription>>(
        () => ({
            variables: { eventId, connections },
            subscription: USE_QUESTION_LIST_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    const updatedConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionListUpdatedSubscription>>(
        () => ({
            variables: { eventId, connections },
            subscription: USE_QUESTION_LIST_UPDATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    const deletedConfig = React.useMemo<GraphQLSubscriptionConfig<useQuestionListDeletedSubscription>>(
        () => ({
            variables: { eventId, connections },
            subscription: USE_QUESTION_LIST_DELETED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription(createdConfig);
    useSubscription(updatedConfig);
    useSubscription(deletedConfig);

    return { questions: questionList, eventId, connections: questions?.__id ? [questions.__id] : [], currentQuestion };
}
