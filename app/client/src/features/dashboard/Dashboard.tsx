import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { isBefore, isAfter } from 'date-fns';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';

import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DashboardEventList } from './DashboardEventList';

const useStyles = makeStyles((theme) => ({
    secondaryText: {
        color: theme.palette.text.secondary,
    },
    addIcon: {
        fontSize: 32,
        color: 'black',
    },
    addIconTitle: {
        marginTop: 8,
    },
}));

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
    const classes = useStyles();
    const router = useRouter();
    const [user, , isLoading] = useUser();
    const handleNav = (path: string) => () => router.push(path);

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
            <DashboardEventList eventList={ongoingEvents} ongoing={true} />
            <DashboardEventList eventList={upcomingEvents} ongoing={false} />
            <Grid item>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
                        <IconButton aria-label='view future event' onClick={handleNav('/organizations/me')}>
                            <Add className={classes.addIcon} />
                        </IconButton>
                    </CardContent>
                </Card>
                <Typography variant='subtitle2' className={classes.addIconTitle}>
                    Create Event
                </Typography>
            </Grid>
        </Grid>
    );
}
