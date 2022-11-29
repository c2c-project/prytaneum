import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { isBefore, isAfter } from 'date-fns';
import { Grid, Typography } from '@mui/material';

import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DashboardEventList } from './DashboardEventList';

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

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        me {
            events {
                edges {
                    node {
                        id
                        title
                        description
                        startDateTime
                        endDateTime
                        isViewerModerator
                        organization {
                            name
                        }
                    }
                }
            }
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function Dashboard({ queryRef }: Props) {
    const data = usePreloadedQuery<DashboardQuery>(DASHBOARD_QUERY, queryRef);
    const listOfEvents = React.useMemo(() => data.me?.events?.edges ?? [], [data.me]);
    const router = useRouter();
    const [user, , isLoading] = useUser();

    // Verify user is logged in
    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
    }, [user, router, isLoading]);

    // Store ongoing events
    const ongoingEvents = React.useMemo(
        () =>
            listOfEvents.filter(({ node: event }) => {
                if (!event.startDateTime || !event.endDateTime) return false;
                const now = new Date();
                return isBefore(new Date(event.startDateTime), now) && isAfter(new Date(event.endDateTime), now);
            }),
        [listOfEvents]
    );

    // Store upcoming events
    const upcomingEvents = React.useMemo(
        () =>
            listOfEvents.filter(({ node: event }) => {
                if (!event.startDateTime) return false;
                const now = new Date();
                return isAfter(new Date(event.startDateTime), now);
            }),
        [listOfEvents]
    );

    if (!data) return <Loader />;

    return (
        <Grid container>
            <DashboardEventList
                ongoing={true}
                eventList={ongoingEvents}
                sectionTitle={
                    <Typography variant='h6' style={{ marginBottom: '.5rem' }}>
                        Current Events
                    </Typography>
                }
            />
            <DashboardEventList
                ongoing={false}
                eventList={upcomingEvents}
                sectionTitle={
                    <Typography variant='h6' style={{ marginBottom: '.5rem' }}>
                        Upcoming Events
                    </Typography>
                }
            />
        </Grid>
    );
}
