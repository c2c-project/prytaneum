import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';

import { Button, Card, CardContent, Grid, Link, List, ListItem, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';

import { Loader } from '@local/components/Loader';
import { DashboardEvent } from '@local/features/dashboard/DashboardEvent';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';

const useStyles = makeStyles((theme) => ({
    item: {
        margin: theme.spacing(0, 0, 4, 0),
    },
    card: {
        padding: theme.spacing(1, 1, 1, 1),
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
    const handleNav = (path: string) => () => router.push(path);
    
    if(!data) return <Loader />;

    // Get current date to categorize events as current or upcoming
    const currentDateTime = new Date();

    // Store current events
    const currentEvents = listOfEvents.filter(({ node: event }) => {
        if (event.startDateTime && event.endDateTime) {
            const eventStartDateTime = new Date(event.startDateTime);
            const eventEndDateTime = new Date(event.endDateTime);
            if (eventStartDateTime.getTime() < currentDateTime.getTime() && 
                eventEndDateTime.getTime() > currentDateTime.getTime()) {
                return true;
            }
        }
    });

    // Store upcoming events
    const upcomingEvents = listOfEvents.filter(({ node: event }) => {
        if (event.startDateTime) {
            const eventStartDateTime = new Date(event.startDateTime);
            if (currentDateTime < eventStartDateTime) {
                return true;
            }
        }
    });

    return (
        // <FadeThrough animKey='dashboard-page'>
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Current Events
                        </Typography>
                        {currentEvents.length > 0 ? (
                            <Grid container item direction='column'>
                                <Grid item xs={12}>
                                    <List>
                                        {currentEvents.map(({ node: event }, idx) => {
                                            if (event?.id && event?.description && event?.title && event?.startDateTime && event?.organization?.name) {
                                                return (
                                                    <ListItem
                                                        button
                                                        key={event?.id}
                                                        divider={idx !== currentEvents.length - 1}
                                                        onClick={handleNav(`/events/${event?.id}/settings`)}
                                                    >
                                                        <DashboardEvent
                                                            key={event.id}
                                                            id={event.id}
                                                            title={event.title}
                                                            description={event.description}
                                                            startDateTime={event.startDateTime}
                                                            organization={event.organization.name}
                                                        />
                                                        <Grid item>
                                                            <Link href={`events/${event?.id}/live`}>
                                                                <Button
                                                                    aria-label='view live feed of current event'
                                                                    variant='contained'
                                                                    color='primary'
                                                                >
                                                                    Live Feed
                                                                </Button>
                                                            </Link>
                                                        </Grid>
                                                    </ListItem>
                                                )
                                            }
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={12} sm={8} className={classes.text}>
                                    <Typography variant='subtitle2'>
                                        No Events To Display
                                    </Typography>
                                </Grid>
                            </Grid>
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
                            <Grid container item direction='column'>
                                <Grid item xs={12}>
                                    <List>
                                        {upcomingEvents.map(({ node: event }, idx) => {
                                            if (event?.id && event?.description && event?.title && event?.startDateTime && event?.organization?.name)
                                                return (
                                                    <ListItem
                                                        button
                                                        key={event?.id}
                                                        divider={idx !== upcomingEvents.length - 1}
                                                        onClick={handleNav(`/events/${event?.id}/settings`)}
                                                    >
                                                        <DashboardEvent
                                                            key={event.id}
                                                            id={event.id}
                                                            title={event.title}
                                                            description={event.description}
                                                            startDateTime={event.startDateTime}
                                                            organization={event.organization.name}
                                                        />
                                                    </ListItem>
                                                )
                                            }
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item className={classes.text}>
                                    <Typography variant='subtitle2'>
                                        No Events To Display
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12, }}>
                        <IconButton
                            aria-label='view future event'
                        >
                            <Add style={{ fontSize: 32, color: 'black' }} />
                        </IconButton>
                    </CardContent>
                </Card>
                <Typography variant='subtitle2' style={{ marginTop: 8 }}>
                    Create Event
                </Typography>
            </Grid>
            {/* <RequireRoles requiredRoles={['admin']} redirect={false}> */}
            {/* <Grid className={classes.item} item xs={12}>
                <RoleInvite />
            </Grid> */}
            {/* </RequireRoles> */}
        </Grid>
        // </FadeThrough>
    );
}