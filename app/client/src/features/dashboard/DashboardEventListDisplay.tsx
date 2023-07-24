import * as React from 'react';
import { Button, Card, CardContent, Grid, List, ListItemSecondaryAction, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { DashboardEventListItem } from './DashboardEventListItem';
import { useDashboardEvents } from './useDashboardEvents';
import { useDashboardEventsFragment$key } from '@local/__generated__/useDashboardEventsFragment.graphql';
import { useEventDeleted } from './useEventDeleted';
import { useEventCreated } from './useEventCreated';

export interface Event {
    node: {
        readonly description: string | null;
        readonly endDateTime: Date | null;
        readonly id: string;
        readonly isViewerModerator: boolean | null;
        readonly isActive: boolean | null;
        readonly organization: {
            readonly name: string;
        } | null;
        readonly startDateTime: Date | null;
        readonly title: string | null;
    };
}

interface EventListProps {
    events: Event[];
    ongoing: boolean;
}

function EventList({ events, ongoing }: EventListProps) {
    const router = useRouter();
    const handleNav = (event: Event['node']) => () => {
        if (event.isActive) router.push(`/events/${event.id}/live`);
        else router.push(`/events/${event.id}/pre`);
    };

    if (events.length === 0) {
        return <Typography variant='subtitle2'>No {ongoing ? 'Ongoing' : 'Upcoming'} Events To Display</Typography>;
    }

    return (
        <List>
            {events.map(({ node: event }, idx) => (
                <DashboardEventListItem key={event.id} event={event} divider={idx !== events.length - 1}>
                    <ListItemSecondaryAction>
                        {event.isViewerModerator ? (
                            <Button
                                aria-label='view live feed of current event'
                                variant='contained'
                                color='primary'
                                onClick={handleNav(event)}
                            >
                                Live Feed
                            </Button>
                        ) : (
                            <Button
                                aria-label='view live feed of current event'
                                variant='contained'
                                color='primary'
                                onClick={handleNav(event)}
                            >
                                {event.isActive ? 'Live Feed' : 'Pre Event'}
                            </Button>
                        )}
                    </ListItemSecondaryAction>
                </DashboardEventListItem>
            ))}
        </List>
    );
}

interface Props {
    ongoing: boolean;
    fragmentRef: useDashboardEventsFragment$key;
}

export function DashboardEventListDisplay({ ongoing, fragmentRef }: Props) {
    const theme = useTheme();
    const { currentEvents, upcomingEvents, eventIds, connections } = useDashboardEvents({ fragmentRef });

    useEventCreated({ connections });
    useEventDeleted({ eventIds, connections });

    return (
        <Grid item xs={12} marginBottom={theme.spacing(4)}>
            <Card style={{ padding: theme.spacing(1) }}>
                <CardContent>
                    {ongoing ? (
                        <React.Fragment>
                            <Typography variant='h6' marginBottom={theme.spacing(1)}>
                                Current Events
                            </Typography>
                            <EventList events={currentEvents} ongoing={true} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography variant='h6' marginBottom={theme.spacing(1)}>
                                Upcoming Events
                            </Typography>
                            <EventList events={upcomingEvents} ongoing={false} />
                        </React.Fragment>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
