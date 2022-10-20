import React from 'react';
import { fetchQuery, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { useRouter } from 'next/router';
import { EventLiveLoader, EVENT_LIVE_QUERY } from '@local/features/events';
import { ConditionalRender } from '@local/components';
import { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { useEnvironment } from '@local/core';
import { CountdownWrapper } from '@local/components/Countdown';

const styles = {
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
}
export interface PreloadedEventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
}


export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
        disablePadding: true
    };

    return { props: baseProps };
}


export function PrePage({eventLiveQueryRef}: PreloadedEventLiveProps) {
    const router = useRouter()
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);    
    // used to create the countdown component
    const date = node?.startDateTime as Date
    // used to check whether the event is on-going
    const isActive = node?.isActive
    // used to route
    const eventId = router.query.id

    // route user to live event if event is on-going
    if (isActive) {
        // navigate back to /live once the event starts
        router.push('/events/' + eventId + '/live')
    }
    
    return (
        <div style={styles.justifyCenter}>
            <CountdownWrapper date={date} />
        </div>
    )
}

export default function Pre() {
    const router = useRouter();
    const eventId = router.query.id as string;

    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, EVENT_LIVE_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadEventQuery({ eventId }, { fetchPolicy: 'network-only' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, eventId, isRefreshing, loadEventQuery]);

    
    React.useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 2000);
        return () => clearInterval(interval);
    });
    
    return (
        <div>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    {eventLiveQueryRef != null && eventLiveQueryRef !== undefined && eventId !== undefined
                        ? <PrePage eventLiveQueryRef={eventLiveQueryRef} />
                        : <h1>Loading page...</h1>
                    }
                </React.Suspense>
            </ConditionalRender>
        </div>
    )
}