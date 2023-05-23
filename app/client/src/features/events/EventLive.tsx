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
import { EventSidebar, EventVideo, EventContext } from '@local/features/events';
import { ValidateInviteQuery } from '@local/__generated__/ValidateInviteQuery.graphql';
import { VALIDATE_INVITE_QUERY } from './Invites/ValidateInvite';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { EventLiveStartEventMutation } from '@local/__generated__/EventLiveStartEventMutation.graphql';
import { EventLiveEndEventMutation } from '@local/__generated__/EventLiveEndEventMutation.graphql';
import { useSnack } from '@local/core';
import { useUser } from '../accounts';
import { useEventDetails } from './useEventDetails';

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
                isPrivate
                ...EventSidebarFragment
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
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
    const { eventData, isLive, setIsLive } = useEventDetails({ fragmentRef: node });
    const isModerator = Boolean(node.isViewerModerator);

    React.useEffect(() => {
        if (eventData.isActive || isModerator) return;
        if (!eventData.isActive && !isModerator) {
            if (eventData.endDateTime === null) {
                router.push(`/events/${eventId}/post`);
                return;
            }
            // TODO: Revisit this logic when we have a better idea of how we want to handle edge cases
            // IE: If event is ended early by moderator, should we redirect to post event page?
            // How early is too early to redirect to post event page?
            const now = new Date();
            const endTime = new Date(eventData.endDateTime);
            if (now > endTime) {
                router.push(`/events/${eventId}/post`);
            } else {
                router.push(`/events/${eventId}/pre`);
            }
        }
    }, [eventData, eventData.endDateTime, eventData.isActive, eventId, isLive, isModerator, router]);

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

    if (!node || (!isLive && !isModerator)) return <Loader />;

    const updateEventStatus = () => {
        if (isLive) {
            commitEventEndMutation({
                variables: {
                    eventId: eventId,
                },
                onCompleted() {
                    displaySnack('Event has ended!');
                    setIsLive(false);
                },
            });
        } else {
            commitEventStartMutation({
                variables: {
                    eventId: eventId,
                },
                onCompleted() {
                    displaySnack('Event has started!');
                    setIsLive(true);
                },
            });
        }
    };

    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid container item md={8} direction='column' wrap='nowrap'>
                    <Grid item className={classes.video}>
                        <EventVideo fragmentRef={node} />
                    </Grid>
                    <EventDetailsCard eventData={eventData} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} id='event-sidebar-scroller' onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} className={classes.target} />}
                        <EventSidebar
                            fragmentRef={node}
                            override={Boolean(false)}
                            isViewerModerator={isModerator}
                            isLive={isLive}
                            updateEventStatus={updateEventStatus}
                        />
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
    tokenProvided: boolean;
}

function EventLiveContainer({ eventLiveQueryRef, validateInviteQueryRef, tokenProvided }: EventLiveContainerProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
    const { validateInvite } = usePreloadedQuery(VALIDATE_INVITE_QUERY, validateInviteQueryRef);
    const { displaySnack } = useSnack();
    const router = useRouter();
    const [user] = useUser();

    // Handle private events and token validation
    React.useEffect(() => {
        if (node?.isViewerModerator) return;
        if (!validateInvite?.valid && node?.isPrivate === true) {
            if (tokenProvided) displaySnack('Invalid invite token.', { variant: 'error' });
            else displaySnack('You do not have permission to join this private event.', { variant: 'error' });
            router.push('/');
        }
        // Ensure user is logged in if invite is valid (Do not reload if user is already logged in)
        if (user === null && validateInvite?.valid && validateInvite?.user !== null) router.reload();
    }, [displaySnack, node?.isPrivate, node?.isViewerModerator, router, tokenProvided, user, validateInvite]);

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

    if (!eventLiveQueryRef || !validateInviteQueryRef) return <Loader />;
    return (
        <EventLiveContainer
            eventLiveQueryRef={eventLiveQueryRef}
            validateInviteQueryRef={validateInviteQueryRef}
            tokenProvided={!!token}
        />
    );
}
