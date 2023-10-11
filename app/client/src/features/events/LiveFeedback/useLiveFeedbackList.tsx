import * as React from 'react';
import { graphql, useFragment, useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useLiveFeedbackListSubscription } from '@local/__generated__/useLiveFeedbackListSubscription.graphql';
import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import { useUser } from '@local/features/accounts/useUser';
import { useEvent } from '../useEvent';

export const USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackListSubscription($eventId: ID!, $connections: [ID!]!) {
        feedbackCRUD(eventId: $eventId) {
            operationType
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    message
                    createdBy {
                        id
                        firstName
                        moderatorOf(eventId: $eventId)
                    }
                    refFeedback {
                        createdBy {
                            id
                            firstName
                            moderatorOf(eventId: $eventId)
                        }
                        ...LiveFeedbackReplyFragment @arguments(eventId: $eventId)
                    }
                    ...LiveFeedbackReplyFragment @arguments(eventId: $eventId)
                    ...LiveFeedbackAuthorFragment @arguments(eventId: $eventId)
                }
            }
        }
    }
`;

export const USE_LIVE_FEEDBACK_LIST = graphql`
    fragment useLiveFeedbackListFragment on Event
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 100 }
        after: { type: "String", defaultValue: "" }
        eventId: { type: "ID!", defaultValue: "" }
    ) {
        id
        liveFeedback(first: $first, after: $after) @connection(key: "useLiveFeedbackListFragment_liveFeedback") {
            __id
            edges {
                cursor
                node {
                    id
                    message
                    createdBy {
                        id
                        firstName
                        moderatorOf(eventId: $eventId)
                    }
                    refFeedback {
                        createdBy {
                            id
                            firstName
                            moderatorOf(eventId: $eventId)
                        }
                        ...LiveFeedbackReplyFragment @arguments(eventId: $eventId)
                    }
                    ...LiveFeedbackReplyFragment @arguments(eventId: $eventId)
                    ...LiveFeedbackAuthorFragment @arguments(eventId: $eventId)
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: useLiveFeedbackListFragment$key;
}

export function useLiveFeedbackList({ fragmentRef }: Props) {
    const { user } = useUser();
    const { isModerator } = useEvent();
    const { liveFeedback, id: eventId } = useFragment(USE_LIVE_FEEDBACK_LIST, fragmentRef);
    const feedbackList = React.useMemo(
        () => (liveFeedback?.edges ? liveFeedback.edges.map(({ node }) => node) : []),
        [liveFeedback]
    );

    const connections = React.useMemo(() => (liveFeedback?.__id ? [liveFeedback.__id] : []), [liveFeedback]);

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackListSubscription>>(
        () => ({
            variables: { eventId, connections },
            subscription: USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useLiveFeedbackListSubscription>(config);

    const filteredList = React.useMemo(
        () =>
            feedbackList.filter(
                (feedback) => feedback.createdBy?.id === user?.id || feedback.refFeedback?.createdBy?.id === user?.id
            ),
        [feedbackList, user]
    );

    return {
        liveFeedback: isModerator ? feedbackList : filteredList,
        eventId,
        connections: liveFeedback?.__id ? [liveFeedback.__id] : [],
    };
}
