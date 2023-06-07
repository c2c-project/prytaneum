import React from 'react';
import { useRouter } from 'next/router';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { Button, Divider, Grid, Paper, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

import { CountdownWrapper } from '@local/components/Countdown';
import { EventPreQuery } from '@local/__generated__/EventPreQuery.graphql';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
// import { PreloadedBroadcastMessageList } from './BroadcastMessages/BroadcastMessageList/BroadcastMessageList';
import { Loader } from '@local/components';
import { LiveFeedbackList } from './LiveFeedback';
import AskQuestion from './Questions/AskQuestion';
import { SubmitLiveFeedback } from './LiveFeedback/SubmitLiveFeedback';
import { FragmentRefs } from 'relay-runtime';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useEventDetails } from './useEventDetails';
import { PreloadedLiveMessages } from './BroadcastMessages/LiveMessages';
import { ViewerOnlyQuestionList } from './Questions/ViewerOnlyQuestionList/ViewerOnlyQuestionList';

const EVENT_PRE_QUERY = graphql`
    query EventPreQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...useViewerOnlyQuestionListFragment
                ...useLiveFeedbackListFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
            }
        }
    }
`;

export interface EventPreProps {
    fragmentRef: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
}

export function EventPre({ fragmentRef }: EventPreProps) {
    const router = useRouter();
    const theme = useTheme();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState<'Questions' | 'Feedback'>('Questions');
    const { eventData } = useEventDetails({ fragmentRef });
    const { id: eventId, isActive, isViewerModerator, endDateTime } = eventData;

    const handleChange = (e: React.SyntheticEvent, newTab: 'Questions' | 'Feedback') => {
        e.preventDefault();
        setTab(newTab);
    };

    // used to create the countdown component
    const date = eventData.startDateTime as Date;

    // route user to live event if event is on-going
    if (isActive || isViewerModerator) {
        // navigate back to /live once the event starts
        router.push('/events/' + eventId + '/live');
    }
    const now = new Date();
    const eventEnd = new Date(endDateTime || now);
    if (!isActive && now > eventEnd) {
        // navigate to pre-event page if event has not started
        router.push('/events/' + eventId + '/post');
    }

    return (
        <EventContext.Provider value={{ eventId: eventData.id, isModerator: Boolean(eventData.isViewerModerator) }}>
            <Paper style={{ width: '100%', height: '100%' }}>
                <Grid container spacing={2} columns={16} height='100%'>
                    {/* Column 1 */}
                    <Grid
                        item
                        container
                        xs={mdDownBreakpoint ? 16 : 7}
                        direction='column'
                        justifyContent='space-around'
                        marginLeft={mdDownBreakpoint ? '0' : '3rem'}
                    >
                        <Grid item container className='Upcoming Event Text'>
                            <Typography variant='h4'>Upcoming Event</Typography>
                            <Grid item paddingTop='1rem'>
                                <Typography variant='h5'>
                                    This event will start at{' '}
                                    {new Date(date).toLocaleTimeString('en-US', {
                                        timeZoneName: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    , thank you for joining! You can submit questions and feedback before the event
                                    starts to the right.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className='Event Details'>
                            <Typography variant='h4'>Event Details</Typography>
                            <Paper
                                sx={{
                                    width: '100%',
                                    height: '200px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    '::-webkit-scrollbar': {
                                        backgroundColor: 'transparent',
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#D9D9D9',
                                        backgroundOpacity: '0.3',
                                        borderRadius: '20px',
                                        border: '5px solid transparent',
                                        backgroundClip: 'content-box',
                                    },
                                }}
                            >
                                <Grid container height='100%' justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <EventDetailsCard eventData={eventData} />
                                        <Divider style={{ background: 'black' }} />
                                        <SpeakerList fragmentRef={fragmentRef} />
                                        {/* TODO: add Organizers List */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item className='Live Messages'>
                            <Typography variant='h4'>Live Messages</Typography>
                            <PreloadedLiveMessages />
                        </Grid>
                        <Grid item className='Resources'>
                            <Typography variant='h4'>Resources</Typography>
                            <Grid container justifyContent='space-around' width='100%' marginTop='1rem'>
                                <Grid item>
                                    <Button variant='contained'>Event Issue Guide</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained'>Participant Guide</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Column 2 */}
                    <Grid item container xs={mdDownBreakpoint ? 16 : 8} direction='column' wrap='nowrap'>
                        <Grid
                            item
                            container
                            className='Pre-Event-Prytaneum-Logo'
                            justifyContent='center'
                            marginTop='4rem'
                        >
                            <img width='60%' src='/static/prytaneum_logo2.svg' alt='Prytaneum Logo' />
                        </Grid>
                        <Grid item container className='Countdown' justifyContent='center' alignContent='center'>
                            <Paper
                                style={{ margin: '15px', paddingLeft: '25px', paddingRight: '25px', minWidth: '300px' }}
                            >
                                <CountdownWrapper date={date} />
                            </Paper>
                        </Grid>
                        <Grid item container justifyContent='center' height='100%' alignContent='flex-start'>
                            <Tabs
                                sx={{
                                    '& .MuiTabs-indicator': { backgroundColor: 'custom.creamCan' },
                                    '& .MuiTab-root': {
                                        color: 'white',
                                        backgroundColor: alpha(theme.palette.custom.darkCreamCan, 0.25),
                                        borderRadius: '20px 20px 0 0',
                                    },
                                    '& .Mui-selected': {
                                        color: 'white !important',
                                        backgroundColor: 'custom.creamCan',
                                    },
                                }}
                                value={tab}
                                onChange={handleChange}
                                centered
                                aria-label='secondary tabs example'
                            >
                                <Tab label='Questions' value='Questions' />
                                <Tab label='Feedback' value='Feedback' />
                                {eventData.isViewerModerator === true && <Tab label='Broadcast' value='Broadcast' />}
                            </Tabs>
                            <Grid
                                id='event-pre-tabs-scrollable'
                                container
                                justifyContent='center'
                                width='80%'
                                height='90%'
                                minHeight='600px'
                                sx={{
                                    border: 5,
                                    padding: 1,
                                    borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                                        theme.palette.custom.creamCan,
                                        0.06
                                    )}) 10`,
                                    backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                                    overflowY: 'scroll',
                                    '::-webkit-scrollbar': {
                                        backgroundColor: 'transparent',
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#D9D9D9',
                                        backgroundOpacity: '0.3',
                                        borderRadius: '20px',
                                        border: '5px solid transparent',
                                        backgroundClip: 'content-box',
                                    },
                                }}
                            >
                                <ViewerOnlyQuestionList
                                    fragmentRef={fragmentRef}
                                    ActionButtons={
                                        <Grid container width='100%' paddingBottom='1rem' justifyContent='center'>
                                            <AskQuestion eventId={eventId} />
                                        </Grid>
                                    }
                                    isVisible={tab === 'Questions'}
                                />
                                <LiveFeedbackList
                                    fragmentRef={fragmentRef}
                                    ActionButtons={
                                        <Grid container paddingBottom='1rem' justifyContent='center'>
                                            <SubmitLiveFeedback eventId={eventId} />
                                        </Grid>
                                    }
                                    isVisible={tab === 'Feedback'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </EventContext.Provider>
    );
}

export interface EventPreContainerProps {
    queryRef: PreloadedQuery<EventPreQuery>;
}

function EventPreContainer({ queryRef }: EventPreContainerProps) {
    const { node } = usePreloadedQuery(EVENT_PRE_QUERY, queryRef);

    if (!node) return <Loader />;

    return <EventPre fragmentRef={node} />;
}

export interface PreloadedEventPreProps {
    eventId: string;
}

export function PreloadedEventPre({ eventId }: PreloadedEventPreProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventPreQuery>(EVENT_PRE_QUERY);

    React.useEffect(() => {
        loadEventQuery({ eventId });
    }, [eventId, loadEventQuery]);

    if (!eventLiveQueryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPreContainer queryRef={eventLiveQueryRef} />}>
                <EventPreContainer queryRef={eventLiveQueryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
