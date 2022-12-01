import { useRouter } from 'next/router';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { CountdownWrapper } from '@local/components/Countdown';
import { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { EVENT_LIVE_QUERY } from './EventLive';
import React from 'react';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
import { PreloadedBroadcastMessageList } from './BroadcastMessages/BroadcastMessageList/BroadcastMessageList';

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

// const EVENT_PRE_QUERY = graphql`
//     query EventPreQuery($eventId: ID!) {
//         event(id: $eventId) {
//             id
//             name
//             startTime
//             endTime
//             ...EventContextFragment
//         }
//     }
// `;

export interface PreloadedEventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
}

export function EventPre({ eventLiveQueryRef }: PreloadedEventLiveProps) {
    const router = useRouter();
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
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
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);

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
