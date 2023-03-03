import { ConditionalRender } from '@local/components';
import { EventContext, EventSidebar } from '@local/features/events';
import { EventPostQuery } from '@local/__generated__/EventPostQuery.graphql';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    item: {
        marginBottom: theme.spacing(4),
    },
    card: {
        padding: theme.spacing(1),
        height: '100vh',
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    panes: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
    },
}));

const EVENT_POST_QUERY = graphql`
    query EventPostQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                startDateTime
                isActive
                ...EventSidebarFragment
                ...useBroadcastMessageListFragment
            }
        }
    }
`;

export interface PreloadedEventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventPostQuery>;
}

export function EventPost({ eventLiveQueryRef }: PreloadedEventLiveProps) {
    // styles
    const classes = useStyles();

    const { node } = usePreloadedQuery(EVENT_POST_QUERY, eventLiveQueryRef);

    if (!node) return <h1>Loading Post-Event Page...</h1>;

    return (
        <Card className={classes.card}>
            <CardContent className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={7} className={classes.root}>
                        <Typography variant='h6' className={classes.title}>
                            Event Ended
                        </Typography>
                        <Typography className={classes.text} variant='subtitle1'>
                            This event is now over, thank you for participating! If you would like to view this event
                            again in archived mode or want to submit post-event feed, check out the “Post-Event
                            Resources” below. Questions and feedback given during this event can be viewed on the window
                            to the right.
                        </Typography>
                    </Grid>
                    <Grid item xs={5} className={classes.sidebar}>
                        <Typography variant='h6' className={classes.title}>
                            Prytaneum
                        </Typography>
                        <EventContext.Provider
                            value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}
                        >
                            <div className={classes.panes} id='event-sidebar-scroller'>
                                <EventSidebar fragmentRef={node} override={Boolean(true)} />
                            </div>
                        </EventContext.Provider>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export interface PreloadedEventPreProps {
    eventId: string;
}

export default function PreloadedEventPost({ eventId }: PreloadedEventPreProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventPostQuery>(EVENT_POST_QUERY);

    React.useEffect(() => {
        loadEventQuery({ eventId });
    }, [eventId, loadEventQuery]);

    if (!eventLiveQueryRef) return <h1>Loading Post-Event Page...</h1>;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPost eventLiveQueryRef={eventLiveQueryRef} />}>
                <EventPost eventLiveQueryRef={eventLiveQueryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
