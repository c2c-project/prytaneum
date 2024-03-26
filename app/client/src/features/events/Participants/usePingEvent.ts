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
    const PING_INTERVAL = 60000; // 60 seconds

    const pingEvent = React.useCallback(() => {
        commit({
            variables: { eventId },
        });
    }, [eventId, commit]);

    const pausePingEvent = React.useCallback(() => {
        setPingPaused(true);
    }, [setPingPaused]);

    const resumePingEvent = React.useCallback(() => {
        setPingPaused(false);
    }, [setPingPaused]);

    useEffect(() => {
        pingEvent();

        const pingInterval = setInterval(() => {
            if (pingPaused) return;
            pingEvent();
        }, PING_INTERVAL);

        return () => clearInterval(pingInterval);
    }, [pingPaused, pingEvent]);

    return { pingEvent, pausePingEvent, resumePingEvent };
}
