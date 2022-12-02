import * as React from 'react';
import { Grid } from '@mui/material';
import { isBefore, isAfter } from 'date-fns';

import { DashboardEventListDisplay } from './DashboardEventListDisplay';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DASHBOARD_QUERY } from './Dashboard';

export interface Event {
    node: {
        id: string;
        title: string | null;
        description: string | null;
        startDateTime: Date | null;
        endDateTime: Date | null;
        isViewerModerator: boolean | null;
        organization: {
            name: string;
        } | null;
    };
}

interface Props {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function DashboardEventList({ queryRef }: Props) {
    const { me } = usePreloadedQuery(DASHBOARD_QUERY, queryRef);
    const REFRESH_INTERVAL = 10000; // 10 seconds

    const events = React.useMemo(
        () =>
            me?.events?.edges
                ? me?.events.edges.map(({ node }) => {
                      return { node };
                  })
                : [],
        [me]
    );

    const ongoingEvents = React.useCallback(
        () =>
            events.filter(({ node: event }) => {
                if (!event.startDateTime || !event.endDateTime) return false;
                const now = new Date();
                return isBefore(new Date(event.startDateTime), now) && isAfter(new Date(event.endDateTime), now);
            }),
        [events]
    );
    const futureEvents = React.useCallback(
        () =>
            events.filter(({ node: event }) => {
                if (!event.startDateTime) return false;
                const now = new Date();
                return isAfter(new Date(event.startDateTime), now);
            }),
        [events]
    );

    const [currentEvents, setCurrentEvents] = React.useState<Event[]>(ongoingEvents());
    const [upcomingEvents, setUpcomingEvents] = React.useState<Event[]>(futureEvents());

    React.useEffect(() => {
        // Update the event lists every interval since they are based on the start/end times
        const interval = setInterval(() => {
            setCurrentEvents(ongoingEvents);
            setUpcomingEvents(futureEvents);
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [futureEvents, ongoingEvents]);

    return (
        <Grid container>
            <DashboardEventListDisplay eventList={currentEvents} ongoing={true} />
            <DashboardEventListDisplay eventList={upcomingEvents} ongoing={false} />
        </Grid>
    );
}
