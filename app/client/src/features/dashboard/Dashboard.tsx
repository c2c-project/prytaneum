import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';
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
            ...useDashboardEventsFragment
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

    if (!me) return <Loader />;

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
