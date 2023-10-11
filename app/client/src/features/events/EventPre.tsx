import React from 'react';
import { useRouter } from 'next/router';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { Button, Divider, Grid, Paper, Tab, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

import { CountdownWrapper } from '@local/components/Countdown';
import { EventPreQuery } from '@local/__generated__/EventPreQuery.graphql';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
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
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';

const EVENT_PRE_QUERY = graphql`
    query EventPreQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...useViewerOnlyQuestionListFragment
                ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
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
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const router = useRouter();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState<'Questions' | 'Feedback'>('Questions');
    const { eventData } = useEventDetails({ fragmentRef });
    const { id: eventId, isActive, isViewerModerator } = eventData;
    // used to create the countdown component
    const date = eventData.startDateTime as Date;

    // TODO: add is private event check
    React.useEffect(() => {
        if (isActive || isViewerModerator) router.push(`/events/${eventId}/live`);
        if (!eventData.endDateTime) return;
        const now = new Date();
        const endTime = new Date(eventData.endDateTime);
        if (!isActive && now > endTime) router.push(`/events/${eventId}/post`);
    }, [eventData.endDateTime, eventId, isActive, isViewerModerator, router]);

    const handleChange = (e: React.SyntheticEvent, newTab: 'Questions' | 'Feedback') => {
        e.preventDefault();
        setTab(newTab);
    };

    return (
        <EventContext.Provider value={{ eventId: eventData.id, isModerator: Boolean(eventData.isViewerModerator) }}>
            <Paper style={{ width: '100%', height: '100%', padding: '1rem' }}>
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
                                    <Button variant='contained'>
                                        <ArticleIcon sx={{ marginRight: '0.5rem' }} />
                                        Event Issue Guide
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained'>
                                        <PersonIcon sx={{ marginRight: '0.5rem' }} />
                                        Participant Guide
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Column 2 */}
                    <Grid
                        item
                        container
                        xs={mdDownBreakpoint ? 16 : 8}
                        direction='column'
                        wrap='nowrap'
                        marginLeft={lgDownBreakpoint ? 0 : 2}
                    >
                        <Grid
                            item
                            container
                            className='Pre-Event-Prytaneum-Logo'
                            justifyContent='center'
                            marginTop='2rem'
                            marginBottom='2rem'
                        >
                            <img width='60%' src='/static/prytaneum_logo2.svg' alt='Prytaneum Logo' />
                        </Grid>
                        <Grid item container className='Countdown' justifyContent='center' alignContent='center'>
                            <Paper
                                style={{
                                    marginBottom: '2rem',
                                    paddingLeft: '25px',
                                    paddingRight: '25px',
                                    minWidth: '300px',
                                }}
                            >
                                <CountdownWrapper date={date} />
                            </Paper>
                        </Grid>
                        <Grid item container direction='column' width='100%' display='flex' flexGrow={1}>
                            <StyledTabs value={tab} props={{ onChange: handleChange, 'aria-label': 'tabs' }}>
                                <Tab label='Questions' value='Questions' />
                                <Tab label='Feedback' value='Feedback' />
                                {eventData.isViewerModerator === true && <Tab label='Broadcast' value='Broadcast' />}
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    minHeight: '600px',
                                    maxHeight: '100%',
                                    display: 'flex',
                                    flexGrow: 1,
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
                            </StyledColumnGrid>
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
