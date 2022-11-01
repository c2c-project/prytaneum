/* eslint-disable react/prop-types */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, useMediaQuery } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery, useMutation, fetchQuery } from 'react-relay';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';

import type { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { Fab } from '@local/components/Fab';
import { EventSidebar, EventVideo, EventContext, EventSidebarLoader } from '@local/features/events';
import { ValidateInviteQuery } from '@local/__generated__/ValidateInviteQuery.graphql';
import { VALIDATE_INVITE_QUERY } from './Invites/ValidateInvite';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { EventLiveStartEventMutation } from '@local/__generated__/EventLiveStartEventMutation.graphql';
import { EventLiveEndEventMutation } from '@local/__generated__/EventLiveEndEventMutation.graphql';
import { useEnvironment } from '@local/core';
import { EventLiveMutation } from '@local/__generated__/EventLiveMutation.graphql';
import { useSnack } from '@local/core';
import { BroadcastMessageList } from './BroadcastMessageList';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            overflowY: 'scroll',
            flexWrap: 'nowrap',
        },
    },
    panes: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
        },
    },
    video: {
        [theme.breakpoints.down('md')]: {
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
        },
    },
    target: {
        scrollMarginTop: '1rem',
    },
}));

export const EVENT_LIVE_QUERY = graphql`
    query EventLiveQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                startDateTime
                isActive
                ...EventSidebarFragment
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...EventDetailsCardFragment
                ...SpeakerListFragment
            }
        }
    }
`;

export const BROADCAST_MESSAGE_MUTATION = graphql`
    mutation EventLiveMutation($input: CreateBroadcastMessage!) {
        createBroadcastMessage(input: $input) {
            isError
            message
        }
    }
`

export function EventLiveLoader() {
    return <Loader />;
}

export interface PreloadedEventLiveProps {
    eventId: string;
    token?: string;
}

export interface EventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
    validateInviteQueryRef: PreloadedQuery<ValidateInviteQuery>;
}

export function EventLive({ eventLiveQueryRef, validateInviteQueryRef }: EventLiveProps) {
    const { displaySnack } = useSnack();

    const router = useRouter();
    const eventId = router.query.id as string;

    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
    usePreloadedQuery(VALIDATE_INVITE_QUERY, validateInviteQueryRef);

    // styles
    const classes = useStyles();
    const theme = useTheme();

    // references for scrolling
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // increase the distance required to show the scroll to top fab
    // because of on screen keyboards on mobile
    const distance = React.useMemo(() => (isMdUp ? 500 : 800), [isMdUp]);

    const handleScroll = () => {
        const top = topRef.current?.getBoundingClientRect()?.top;
        if (top && top < -distance) {
            setIsFabVisible(true);
        } else {
            setIsFabVisible(false);
        }
    };

    const handleClick = () => {
        topRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    };


    const END_EVENT_MUTATION = graphql`
        mutation EventLiveEndEventMutation($eventId: String!) {
            endEvent(eventId: $eventId) {
                message
            }
        }
    `;
    // mutation to stop the event (set isActive to false)
    const [commitEventEndMutation] = useMutation<EventLiveEndEventMutation>(END_EVENT_MUTATION);
    const START_EVENT_MUTATION = graphql`
        mutation EventLiveStartEventMutation($eventId: String!) {
            startEvent(eventId: $eventId) {
                message
            }
        }
    `;
    // mutation to start the event (set isActive to true)
    const [commitEventStartMutation] = useMutation<EventLiveStartEventMutation>(START_EVENT_MUTATION);
    const [buttonText, setButtonText] = React.useState(node?.isActive ? 'End' : 'Start');

    const [commit] = useMutation<EventLiveMutation>(BROADCAST_MESSAGE_MUTATION)
    const [broadcastMessage, setBroadcastMessage] = React.useState('')
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        try {
            commit({
                variables: { input: { eventId, broadcastMessage }},
                onCompleted(payload) {
                    if (payload.createBroadcastMessage.isError) displaySnack('Something went wrong!');
                    else displaySnack('broadcasted message successfully!')
                }
            })
        } catch (err) {
            displaySnack(err.message)
        }
    }

    if (!node?.isActive && !node?.isViewerModerator) {
        // navigate to /pre if the event isn't active and the viewer isn't a moderator
        router.push('/events/' + eventId + '/pre')
    }

    if (!node) return <EventSidebarLoader />;

    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
            <BroadcastMessageList fragmentRef={node} />
            {node.isViewerModerator &&
                (buttonText === 'End' ? (
                    <button
                        onClick={() =>
                            commitEventEndMutation({
                                variables: {
                                    eventId: eventId,
                                },
                                onCompleted() {
                                    setButtonText('Start');
                                    alert('Event has ended!');
                                },
                            })
                        }
                    >
                        {buttonText}
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            commitEventStartMutation({
                                variables: {
                                    eventId: eventId,
                                },
                                onCompleted() {
                                    setButtonText('End');
                                    alert('Event has started!');
                                },
                            })
                        }
                    >
                        {buttonText}
                    </button>
                ))}
            <form onSubmit={handleSubmit}>
                <label>Broadcast message:
                    <input 
                    type='text'
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    />
                </label>
                <input type='submit' value='send'/>
            </form>
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid container item md={8} direction='column' wrap='nowrap'>
                    <Grid item className={classes.video}>
                        <EventVideo fragmentRef={node} />
                    </Grid>
                    <EventDetailsCard fragmentRef={node} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} id='event-sidebar-scroller' onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} className={classes.target} />}
                        <EventSidebar fragmentRef={node} />
                    </div>
                </Grid>
                <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
        </EventContext.Provider>
    );
}

export function PreloadedEventLive({ eventId, token }: PreloadedEventLiveProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [validateInviteQueryRef, loadInviteQuery] = useQueryLoader<ValidateInviteQuery>(VALIDATE_INVITE_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, EVENT_LIVE_QUERY, { eventId }).subscribe({
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
        if (!eventLiveQueryRef) loadEventQuery({ eventId });
    }, [eventId, eventLiveQueryRef, loadEventQuery]);
    React.useEffect(() => {
        if (!token && !validateInviteQueryRef) loadInviteQuery({ token: '', eventId });
        if (token && !validateInviteQueryRef) loadInviteQuery({ token, eventId });
    }, [validateInviteQueryRef, loadInviteQuery, eventId, token]);
    React.useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 5000);
        return () => clearInterval(interval);
    });
    if (!eventLiveQueryRef || !validateInviteQueryRef) return <EventSidebarLoader />;
    return <EventLive eventLiveQueryRef={eventLiveQueryRef} validateInviteQueryRef={validateInviteQueryRef} />;
}