import * as React from 'react';
import { Grid } from '@mui/material';
import { isBefore, isAfter } from 'date-fns';

import { DashboardEventListDisplay } from './DashboardEventListDisplay';
import { useUser } from '@local/features/accounts';
import { useDashboardEventsFragment$key } from '@local/__generated__/useDashboardEventsFragment.graphql';
import { useDashboardEvents } from './useDashboardEvents';
import { useEventUpdates } from './useEventUpdates';
import { useEventCreated } from './useEventCreated';
import { useEventDeleted } from './useEventDeleted';

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
    fragmentRef: useDashboardEventsFragment$key;
}

export function DashboardEventList({ fragmentRef }: Props) {
    const [user] = useUser();
    const userId = user?.id ? user.id : '';
    const { events, connections } = useDashboardEvents({ fragmentRef });
    const eventIds = events.map(({ node }) => node.id);

    // Subscriptions to keep event info up-to-date
    useEventUpdates(userId);
    useEventCreated(userId, connections);
    useEventDeleted(eventIds, connections);

    // Store ongoing events
    const ongoingEvents = React.useMemo(
        () =>
            events.filter(({ node: event }) => {
                if (!event.startDateTime || !event.endDateTime) return false;
                const now = new Date();
                return isBefore(new Date(event.startDateTime), now) && isAfter(new Date(event.endDateTime), now);
            }),
        [events]
    );

    // Store upcoming events
    const upcomingEvents = React.useMemo(
        () =>
            events.filter(({ node: event }) => {
                if (!event.startDateTime) return false;
                const now = new Date();
                return isAfter(new Date(event.startDateTime), now);
            }),
        [events]
    );

    return (
        <Grid container>
            <DashboardEventListDisplay eventList={ongoingEvents} ongoing={true} />
            <DashboardEventListDisplay eventList={upcomingEvents} ongoing={false} />
        </Grid>
    );
}
