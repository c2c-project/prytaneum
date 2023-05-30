import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useParticipantMutedSubscription } from '@local/__generated__/useParticipantMutedSubscription.graphql';

const USE_PARTICIPANT_MUTED_SUBSCRIPTION = graphql`
    subscription useParticipantMutedSubscription($eventId: ID!) {
        participantMuted(eventId: $eventId)
    }
`;

export function useParticipantMuted(eventId: string, refresh: () => void) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useParticipantMutedSubscription>>(
        () => ({
            variables: {
                eventId,
            },
            subscription: USE_PARTICIPANT_MUTED_SUBSCRIPTION,
            onNext: () => {
                refresh();
            },
        }),
        [eventId, refresh]
    );

    useSubscription<useParticipantMutedSubscription>(createdConfig);
}
