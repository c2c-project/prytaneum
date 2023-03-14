import * as React from 'react';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, Paper, Typography } from '@mui/material';

import { ConditionalRender, Loader } from '@local/components';
import type { EventsDashboardQuery } from '@local/__generated__/EventsDashboardQuery.graphql';
import { EventsTable } from './EventsTable';

const EVENTS_DASHBOARD_QUERY = graphql`
    query EventsDashboardQuery {
        me {
            ...useEventsDashboardFragment
        }
    }
`;

interface UsersListProps {
    queryRef: PreloadedQuery<EventsDashboardQuery>;
}

function EventsList({ queryRef }: UsersListProps) {
    const { me } = usePreloadedQuery(EVENTS_DASHBOARD_QUERY, queryRef);

    if (!me) return <Loader />;
    return (
        <Grid container>
            <EventsTable fragmentRef={me} />
        </Grid>
    );
}

function PreloadedEventsList() {
    const [query, loadQuery, disposeQuery] = useQueryLoader<EventsDashboardQuery>(EVENTS_DASHBOARD_QUERY);

    React.useEffect(() => {
        if (!query) loadQuery({}, { fetchPolicy: 'store-or-network' });
    }, [query, loadQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!query) return <Loader />;
    return <EventsList queryRef={query} />;
}

export function EventsDashboard() {
    return (
        <Paper>
            <Grid paddingLeft='1rem'>
                <Typography variant='h4'>Admin Dashboard: Events</Typography>
            </Grid>
            <ConditionalRender client>
                <React.Suspense fallback={<Loader />}>
                    <PreloadedEventsList />
                </React.Suspense>
            </ConditionalRender>
        </Paper>
    );
}
