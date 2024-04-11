import React, { useEffect } from 'react';
import { useMutation, graphql } from 'react-relay';

import type { usePingEventMutation } from '@local/__generated__/usePingEventMutation.graphql';

export const PING_EVENT_MUTATION = graphql`
    mutation usePingEventMutation($eventId: ID!) {
        participantPingEvent(eventId: $eventId) {
            isError
            message
        }
    }
`;

// Pings the server every 20 seconds to keep the participant active in the event participants list
export function usePingEvent(eventId: string) {
    const [commit] = useMutation<usePingEventMutation>(PING_EVENT_MUTATION);
    const [pingPaused, setPingPaused] = React.useState(false);
    const PING_INTERVAL = 20000; // 20 seconds

    const pausePingEvent = React.useCallback(() => {
        setPingPaused(true);
    }, [setPingPaused]);
    const resumePingEvent = React.useCallback(() => {
        setPingPaused(false);
    }, [setPingPaused]);

    useEffect(() => {
        commit({
            variables: { eventId },
        });

        const pingInterval = setInterval(() => {
            if (pingPaused) return;
            commit({
                variables: { eventId },
            });
        }, PING_INTERVAL);

        return () => clearInterval(pingInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pingPaused, eventId, commit]);

    return { pingEvent: commit, pausePingEvent, resumePingEvent };
}
