import { useRouter } from 'next/router';
import { fetchQuery, graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { CountdownWrapper } from '@local/components/Countdown';
import { EventPreQuery } from '@local/__generated__/EventPreQuery.graphql';
import React from 'react';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
import { PreloadedBroadcastMessageList } from './BroadcastMessages/BroadcastMessageList/BroadcastMessageList';
import { useEnvironment } from '@local/core';

const styles = {
    justifyCenter: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '40px',
    },
};

const EVENT_PRE_QUERY = graphql`
    query EventPreQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                startDateTime
                isActive
            }
        }
    }
`;

export interface PreloadedEventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventPreQuery>;
}

export function EventPre({ eventLiveQueryRef }: PreloadedEventLiveProps) {
    const router = useRouter();
    const { node } = usePreloadedQuery(EVENT_PRE_QUERY, eventLiveQueryRef);
    // used to create the countdown component
    const date = node?.startDateTime as Date;
    // used to check whether the event is on-going
    const isActive = node?.isActive;
    // used to route
    const eventId = router.query.id;

    // route user to live event if event is on-going
    if (isActive) {
        // navigate back to /live once the event starts
        router.push('/events/' + eventId + '/live');
    }

    if (!node) return <h1>Loading Pre-Event Page...</h1>;

    return (
        <div style={styles.justifyCenter}>
            <div style={styles.justifyCenter}>
                <CountdownWrapper date={date} />
            </div>
            <div style={styles.list}>
                <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
                    <PreloadedBroadcastMessageList />
                </EventContext.Provider>
            </div>
        </div>
    );
}

export interface PreloadedEventPreProps {
    eventId: string;
}

// TODO: Update this to PRE_LIVE_EVENT
export function PreloadedEventPre({ eventId }: PreloadedEventPreProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventPreQuery>(EVENT_PRE_QUERY);

    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, EVENT_PRE_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadEventQuery({ eventId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, eventId, isRefreshing, loadEventQuery]);
    React.useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 5000);
        return () => clearInterval(interval);
    });
    React.useEffect(() => {
        loadEventQuery({ eventId });
    }, [eventId, loadEventQuery]);

    if (!eventLiveQueryRef) return <h1>Loading Pre-Event Page...</h1>;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPre eventLiveQueryRef={eventLiveQueryRef} />}>
                <EventPre eventLiveQueryRef={eventLiveQueryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
