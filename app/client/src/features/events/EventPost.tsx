import React from 'react';
import { useRouter } from 'next/router';
import { fetchQuery, graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { Divider, Grid, Paper, Tab, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { EventPostQuery } from '@local/__generated__/EventPostQuery.graphql';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
import { useEnvironment } from '@local/core';
import { Loader } from '@local/components';
import { LiveFeedbackList } from './LiveFeedback';
import { SubmitLiveFeedback } from './LiveFeedback/SubmitLiveFeedback';
import { FragmentRefs } from 'relay-runtime';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useEventDetails } from './useEventDetails';
import { QuestionList } from './Questions/QuestionList/QuestionList';
import { VideoModal } from './Videos/VideoModal';
import PostEventFeedback from './PostEventFeedback/PostEventFeedback';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';

const EVENT_POST_QUERY = graphql`
    query EventPostQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                startDateTime
                isActive
                ...useQuestionListFragment
                ...useLiveFeedbackListFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
                ...EventVideoFragment
            }
        }
    }
`;

export interface EventPostProps {
    eventData: {
        readonly id: string;
        readonly isViewerModerator?: boolean | null | undefined;
        readonly startDateTime?: Date | null | undefined;
        readonly isActive?: boolean | null | undefined;
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
}

export function EventPost({ eventData }: EventPostProps) {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState<'Questions' | 'Feedback'>('Questions');
    const { eventData: eventDetails } = useEventDetails({ fragmentRef: eventData });

    const handleChange = (e: React.SyntheticEvent, newTab: 'Questions' | 'Feedback') => {
        e.preventDefault();
        setTab(newTab);
    };

    const eventId = eventData.id;

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
                            <Typography variant='h4'>Event Ended</Typography>
                            <Grid item paddingTop='1rem'>
                                <Typography variant='h5'>
                                    This event is now over, thank you for participating! If you would like to view this
                                    event again in archived mode or want to submit post-event feed, check out the
                                    “Post-Event Resources” below. Questions and feedback given during this event can be
                                    viewed on the window to the right.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className='Event Details'>
                            <Typography variant='h4'>Event Details</Typography>
                            <Paper style={{ width: '100%', height: '200px', maxHeight: '200px', overflowY: 'auto' }}>
                                <Grid container height='100%' justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <EventDetailsCard eventData={eventDetails} />
                                        <Divider style={{ background: 'black' }} />
                                        <SpeakerList fragmentRef={eventData} />
                                        {/* TODO: add Organizers List */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item className='Resources'>
                            <Typography variant='h4'>Resources</Typography>
                            <Grid container justifyContent='space-around' width='100%' marginTop='1rem'>
                                <Grid item>
                                    <VideoModal fragmentRef={eventData} />
                                </Grid>
                                <Grid item>
                                    <PostEventFeedback eventId={eventId} />
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
                        flexWrap='nowrap'
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
                        <Grid item direction='column' width='100%' display='flex' flexGrow={1}>
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
                                <QuestionList
                                    fragmentRef={eventData}
                                    ActionButtons={<></>}
                                    isVisible={tab === 'Questions'}
                                />
                                <LiveFeedbackList
                                    fragmentRef={eventData}
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

export interface EventPostContainerProps {
    queryRef: PreloadedQuery<EventPostQuery>;
}

function EventPostContainer({ queryRef }: EventPostContainerProps) {
    const router = useRouter();
    const { node } = usePreloadedQuery(EVENT_POST_QUERY, queryRef);
    // used to check whether the event is on-going
    const isActive = node?.isActive;
    // used to route
    const eventId = router.query.id;

    // route user to live event if event is on-going
    if (isActive || node?.isViewerModerator) {
        // navigate back to /live once the event starts
        router.push('/events/' + eventId + '/live');
    }
    const now = new Date();
    const eventStart = new Date(node?.startDateTime || '');
    if (!isActive && now < eventStart) {
        // navigate to pre-event page if event has not started
        router.push('/events/' + eventId + '/pre');
    }

    if (!node) return <Loader />;

    return <EventPost eventData={node} />;
}

export interface PreloadedEventPostProps {
    eventId: string;
}

export function PreloadedEventPost({ eventId }: PreloadedEventPostProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventPostQuery>(EVENT_POST_QUERY);

    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const REFRESH_INTERVAL = 5000;

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, EVENT_POST_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadEventQuery({ eventId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, eventId, isRefreshing, loadEventQuery]);
    React.useEffect(() => {
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    });
    React.useEffect(() => {
        loadEventQuery({ eventId });
    }, [eventId, loadEventQuery]);

    if (!eventLiveQueryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPostContainer queryRef={eventLiveQueryRef} />}>
                <EventPostContainer queryRef={eventLiveQueryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
