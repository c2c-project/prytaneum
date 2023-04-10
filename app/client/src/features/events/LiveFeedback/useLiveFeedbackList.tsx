import * as React from 'react';
import { graphql, useFragment, useSubscription } from 'react-relay';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useLiveFeedbackListSubscription } from '@local/__generated__/useLiveFeedbackListSubscription.graphql';
import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import { useUser } from '@local/features/accounts/useUser';
import { useEvent } from '../useEvent';

export const USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackListSubscription($eventId: ID!) {
        feedbackCRUD(eventId: $eventId) {
            operationType
            edge {
                cursor
                node {
                    id
                    message
                    createdBy {
                        id
                        firstName
                    }
                    refFeedback {
                        createdBy {
                            id
                        }
                        ...LiveFeedbackReplyFragment
                    }
                    ...LiveFeedbackReplyFragment
                    ...LiveFeedbackAuthorFragment
                }
            }
        }
    }
`;

export const USE_LIVE_FEEDBACK_LIST = graphql`
    fragment useLiveFeedbackListFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
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
                    }
                    refFeedback {
                        createdBy {
                            id
                        }
                        ...LiveFeedbackReplyFragment
                    }
                    ...LiveFeedbackReplyFragment
                    ...LiveFeedbackAuthorFragment
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

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackListSubscription>>(
        () => ({
            variables: { eventId },
            subscription: USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION,
            updater(store) {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return;

                const eventLiveFeedbackConnectionRecord = ConnectionHandler.getConnection(
                    eventRecord,
                    'useLiveFeedbackListFragment_liveFeedback'
                );

                if (!eventLiveFeedbackConnectionRecord) return;

                const payload = store.getRootField('feedbackCRUD');
                const edge = payload.getLinkedRecord('edge');
                if (!edge) return;

                const newEdge = ConnectionHandler.buildConnectionEdge(store, eventLiveFeedbackConnectionRecord, edge);
                if (!newEdge) return;

                ConnectionHandler.insertEdgeBefore(eventLiveFeedbackConnectionRecord, newEdge);
            },
        }),
        [eventId]
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
