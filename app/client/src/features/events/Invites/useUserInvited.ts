// Subscription: useUserInvited

import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useUserInvitedSubscription } from '@local/__generated__/useUserInvitedSubscription.graphql';

const USE_USER_INVITED_SUBSCRIPTION = graphql`
    subscription useUserInvitedSubscription($connections: [ID!]!, $eventId: ID!) {
        userInvited(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
                cursor
                node {
                    id
                    firstName
                    lastName
                    email
                    moderatorOf(eventId: $eventId)
                }
            }
        }
    }
`;

interface Props {
    connections: string[];
    eventId: string;
    onNext?: () => void;
}

export function useUserInvited({ connections, eventId, onNext }: Props) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useUserInvitedSubscription>>(
        () => ({
            variables: {
                connections,
                eventId,
            },
            subscription: USE_USER_INVITED_SUBSCRIPTION,
            onNext: () => {
                if (onNext) onNext();
            },
        }),
        [connections, eventId, onNext]
    );

    useSubscription<useUserInvitedSubscription>(createdConfig);
}
