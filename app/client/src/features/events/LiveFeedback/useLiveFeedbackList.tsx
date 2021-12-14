import * as React from 'react';
import { graphql, useFragment, useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useLiveFeedbackListSubscription } from '@local/__generated__/useLiveFeedbackListSubscription.graphql';
import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';

// TODO Add in feedback reference for moderator reply
export const USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackListSubscription($eventId: ID!) {
        feedbackCRUD(eventId: $eventId) {
            operationType
            edge {
                cursor
                node {
                    id
                    message
                }
            }
        }
    }
`;

// TODO use myFeedback query for participant view of liveFeedback & only use this for moderators
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
                    }
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
    const { liveFeedback, id: eventId } = useFragment(USE_LIVE_FEEDBACK_LIST, fragmentRef);
    const feedbackList = React.useMemo(
        () => (liveFeedback?.edges ? liveFeedback.edges.map(({ node }) => node) : []),
        [liveFeedback]
    );

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackListSubscription>>(() => ({
        variables: { eventId },
        subscription: USE_LIVE_FEEDBACK_LIST_SUBSCRIPTION
    }), [eventId]);

    useSubscription(config);

    React.useEffect(() => {
        console.log('LFB: ', liveFeedback);
    }, [liveFeedback])
    
    return { liveFeedback: feedbackList, eventId, connections: liveFeedback?.__id ? [liveFeedback.__id] : [] };
}
