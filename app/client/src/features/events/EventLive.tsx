/* eslint-disable react/prop-types */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, useMediaQuery } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery, useMutation } from 'react-relay';
import type { FragmentRefs } from 'relay-runtime';
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
import { EventLiveMutation } from '@local/__generated__/EventLiveMutation.graphql';
import { useSnack } from '@local/core';

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
`;

export function EventLiveLoader() {
    return <Loader />;
}

type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface EventLiveProps {
    node: Node;
}

function EventLive({ node }: EventLiveProps) {
    const { displaySnack } = useSnack();

    const router = useRouter();
    const eventId = router.query.id as string;

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

    // mutation to stop the event (set isActive to false)
    const END_EVENT_MUTATION = graphql`
        mutation EventLiveEndEventMutation($eventId: String!) {
            endEvent(eventId: $eventId) {
                message
            }
        }
    `;
    // mutation to start the event (set isActive to true)
    const [commitEventEndMutation] = useMutation<EventLiveEndEventMutation>(END_EVENT_MUTATION);
    const START_EVENT_MUTATION = graphql`
        mutation EventLiveStartEventMutation($eventId: String!) {
            startEvent(eventId: $eventId) {
                message
            }
        }
    `;
    const [commitEventStartMutation] = useMutation<EventLiveStartEventMutation>(START_EVENT_MUTATION);
    const [buttonText, setButtonText] = React.useState(node.isActive ? 'End' : 'Start');

    const [commit] = useMutation<EventLiveMutation>(BROADCAST_MESSAGE_MUTATION);
    const [broadcastMessage, setBroadcastMessage] = React.useState('');

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            commit({
                variables: { input: { eventId, broadcastMessage } },
                onCompleted(payload) {
                    if (payload.createBroadcastMessage.isError) displaySnack('Something went wrong!');
                    else displaySnack('broadcasted message successfully!');
                },
            });
        } catch (err) {
            displaySnack(err.message);
        }
    };

    if (!node) return <EventSidebarLoader />;

    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
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
                                    displaySnack('Event has ended!');
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
                                    displaySnack('Event has started!');
                                },
                            })
                        }
                    >
                        {buttonText}
                    </button>
                ))}
            <form onSubmit={handleSubmit}>
                <label>
                    Broadcast message:
                    <input type='text' value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} />
                </label>
                <input type='submit' value='send' />
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

interface EventLiveContainerProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
    validateInviteQueryRef: PreloadedQuery<ValidateInviteQuery>;
}

function EventLiveContainer({ eventLiveQueryRef, validateInviteQueryRef }: EventLiveContainerProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
    const { validateInvite } = usePreloadedQuery(VALIDATE_INVITE_QUERY, validateInviteQueryRef);

    // TODO: Implement private event validation here

    if (!node || !validateInvite) return <Loader />;
    return <EventLive node={node} />;
}

export interface PreloadedEventLiveProps {
    eventId: string;
    token?: string;
}

export function PreloadedEventLive({ eventId, token }: PreloadedEventLiveProps) {
    const [eventLiveQueryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [validateInviteQueryRef, loadInviteQuery] = useQueryLoader<ValidateInviteQuery>(VALIDATE_INVITE_QUERY);

    React.useEffect(() => {
        if (!eventLiveQueryRef) loadEventQuery({ eventId });
    }, [eventId, eventLiveQueryRef, loadEventQuery]);

    React.useEffect(() => {
        if (!token && !validateInviteQueryRef) loadInviteQuery({ token: '', eventId });
        if (token && !validateInviteQueryRef) loadInviteQuery({ token, eventId });
    }, [validateInviteQueryRef, loadInviteQuery, eventId, token]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!eventLiveQueryRef || !validateInviteQueryRef) return <EventSidebarLoader />;
    return <EventLiveContainer eventLiveQueryRef={eventLiveQueryRef} validateInviteQueryRef={validateInviteQueryRef} />;
}
