import { ConditionalRender } from '@local/components';
import { EventContext, EventSidebar } from '@local/features/events';
import { EventPostQuery } from '@local/__generated__/EventPostQuery.graphql';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import VideocamIcon from '@mui/icons-material/Videocam';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Image from 'next/image';

import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';

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
    },
    secondaryCard: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    panes: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
    },
    button: {
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '50px',
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
                ...EventDetailsCardFragment
                ...SpeakerListFragment
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
            <CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={7} className={classes.root}>
                        <Button variant='outlined' className={classes.button}>
                            Back
                        </Button>
                        <Typography variant='h6' className={classes.title}>
                            Event Ended
                        </Typography>
                        <Typography className={classes.text} variant='subtitle1'>
                            This event is now over, thank you for participating! If you would like to view this event
                            again in archived mode or want to submit post-event feed, check out the “Post-Event
                            Resources” below. Questions and feedback given during this event can be viewed on the window
                            to the right.
                        </Typography>
                        <Card className={classes.secondaryCard}>
                            <EventDetailsCard fragmentRef={node} />
                            <SpeakerList fragmentRef={node} />
                        </Card>
                        <Typography variant='h6' className={classes.title}>
                            Post-Event Resources
                        </Typography>
                        <div className={classes.buttonContainer}>
                            <Button
                                aria-label='Watch Replay'
                                variant='contained'
                                color='primary'
                                style={{ minWidth: '200px' }}
                                startIcon={<VideocamIcon />}
                            >
                                Watch Replay
                            </Button>
                            <Button
                                aria-label='Watch Replay'
                                variant='contained'
                                color='primary'
                                style={{ minWidth: '200px' }}
                                startIcon={<QuestionAnswerIcon />}
                            >
                                Submit Feedback
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={5} className={classes.sidebar}>
                        <Image
                            src='/static/prytaneum_logo2.svg'
                            width={150}
                            height={200}
                            objectFit='contain'
                            alt='prytaneum logo'
                        />
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
