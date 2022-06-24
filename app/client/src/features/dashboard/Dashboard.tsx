import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { isBefore, isAfter } from 'date-fns';

import { Card, CardContent, Grid, List, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';

import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DashboardEventListItem } from './DashboardEventListItem';

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: theme.spacing(4),
    },
    card: {
        padding: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    secondaryText: {
        color: theme.palette.text.secondary,
    },
}));

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
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Current Events
                        </Typography>
                        {ongoingEvents.length > 0 ? (
                            <List>
                                {ongoingEvents.map(({ node: event }, idx) => {
                                    let divider = true;
                                    if (idx === ongoingEvents.length - 1) divider = false;
                                    return (
                                        <DashboardEventListItem
                                            key={event.id}
                                            event={event}
                                            ongoing={true}
                                            divider={divider}
                                        />
                                    );
                                })}
                            </List>
                        ) : (
                            <Typography className={classes.text} variant='subtitle2'>
                                No Events To Display
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Upcoming Events
                        </Typography>
                        {upcomingEvents.length > 0 ? (
                            <List>
                                {upcomingEvents.map(({ node: event }, idx) => {
                                    let divider = true;
                                    if (idx === upcomingEvents.length - 1) divider = false;
                                    return (
                                        <DashboardEventListItem
                                            key={event.id}
                                            event={event}
                                            ongoing={false}
                                            divider={divider}
                                        />
                                    );
                                })}
                            </List>
                        ) : (
                            <Typography className={classes.text} variant='subtitle2'>
                                No Events To Display
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
                        <IconButton aria-label='view future event' onClick={handleNav('/organizations/me')}>
                            <Add style={{ fontSize: 32, color: 'black' }} />
                        </IconButton>
                    </CardContent>
                </Card>
                <Typography variant='subtitle2' style={{ marginTop: 8 }}>
                    Create Event
                </Typography>
            </Grid>
        </Grid>
    );
}
