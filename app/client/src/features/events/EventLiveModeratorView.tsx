/* eslint-disable react/prop-types */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, useMediaQuery, Tab } from '@mui/material';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { FragmentRefs, graphql } from 'relay-runtime';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';

import { EventVideo, EventContext } from '@local/features/events';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useSnack } from '@local/core';
import { useEventDetails } from './useEventDetails';
import { usePingEvent } from './Participants/usePingEvent';

import { ModeratorActions } from '@local/features/events/Moderation/ModeratorActions';
import { PreloadedParticipantsList } from './Participants/ParticipantsList';
import { QuestionQueue } from './Moderation/ManageQuestions';
import { EventLiveModeratorViewQuery } from '@local/__generated__/EventLiveModeratorViewQuery.graphql';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { StyledTabs } from '@local/components/StyledTabs';
import { QuestionList } from './Questions';
import { LiveFeedbackList } from './LiveFeedback';

export const EVENT_LIVE_MODERATOR_VIEW_QUERY = graphql`
    query EventLiveModeratorViewQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                isActive
                isPrivate
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
                ...useQuestionListFragment
                ...useBroadcastMessageListFragment
                ...useQuestionQueueFragment
                ...QuestionCarouselFragment
                ...useLiveFeedbackListFragment
            }
        }
    }
`;

type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface EventLiveProps {
    node: Node;
}

function EventLiveModeratorView({ node }: EventLiveProps) {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    const { eventData, isLive, setIsLive } = useEventDetails({ fragmentRef: node });
    const { id: eventId } = node;
    const isModerator = Boolean(node.isViewerModerator);

    usePingEvent(eventId);

    if (!node || (!isLive && !isModerator)) return <Loader />;

    // TODO: Add broadcast tab to moderator section
    // TODO: Add question carousel (top right maybe?)
    // TODO: Refactor out the moderator tools section of moderator tab
    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
            <Grid container columns={8} direction='row' justifyContent='space-around' height='100%'>
                <Grid container direction='column' xs={2} height='100%'>
                    <EventVideo fragmentRef={node} />
                    <EventDetailsCard eventData={eventData} />
                    <SpeakerList fragmentRef={node} />
                    <Grid item container direction='column' flex={1} justifyContent='center' alignContent='center'>
                        <StyledTabs theme={theme} value='Moderator'>
                            <Tab label='Moderator' value='Moderator' />
                        </StyledTabs>
                        <StyledColumnGrid theme={theme} props={{ height: '85%', width: '98%' }}>
                            <Grid item width='100%'>
                                <ModeratorActions isLive={isLive} setIsLive={setIsLive} eventId={eventId} />
                                <PreloadedParticipantsList eventId={eventData.id} isVisible={true} />
                            </Grid>
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
                <Grid container direction='column' xs={2} height='100%'>
                    <Grid item container direction='column' flexGrow={1} justifyContent='center' alignContent='center'>
                        <StyledTabs theme={theme} value='Queue'>
                            <Tab label='Queue' value='Queue' />
                        </StyledTabs>
                        <StyledColumnGrid
                            theme={theme}
                            props={{
                                id: 'event-queue-scrollable',
                                height: `${mdUpBreakpoint ? '90%' : '500px'}`,
                                width: '98%',
                            }}
                        >
                            <QuestionQueue fragmentRef={node} isVisible={true} />
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
                <Grid container direction='column' xs={2} height='100%'>
                    <Grid item container direction='column' flexGrow={1} justifyContent='center' alignContent='center'>
                        <StyledTabs theme={theme} value='Questions'>
                            <Tab label='Questions' value='Questions' />
                        </StyledTabs>
                        <StyledColumnGrid
                            theme={theme}
                            props={{
                                id: 'event-queue-scrollable',
                                height: `${mdUpBreakpoint ? '90%' : '500px'}`,
                                width: '98%',
                            }}
                        >
                            <QuestionList fragmentRef={node} ActionButtons={true} isVisible={true} />
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
                <Grid container direction='column' xs={2} height='100%'>
                    <Grid item container direction='column' flexGrow={1} justifyContent='center' alignContent='center'>
                        <StyledTabs theme={theme} value='Feedback'>
                            <Tab label='Feedback' value='Feedback' />
                        </StyledTabs>
                        <StyledColumnGrid
                            theme={theme}
                            props={{
                                id: 'event-queue-scrollable',
                                height: `${mdUpBreakpoint ? '90%' : '500px'}`,
                                width: '98%',
                            }}
                        >
                            <LiveFeedbackList fragmentRef={node} ActionButtons={true} isVisible={true} />
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}

interface EventLiveModeratorViewContainerProps {
    queryRef: PreloadedQuery<EventLiveModeratorViewQuery>;
    eventId: string;
}

function EventLiveModeratorViewContainer({ queryRef, eventId }: EventLiveModeratorViewContainerProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_MODERATOR_VIEW_QUERY, queryRef);
    const { displaySnack } = useSnack();
    const router = useRouter();

    // Handle private events and token validation
    React.useEffect(() => {
        if (!node?.isViewerModerator) {
            router.push(`/events/${eventId}/live`);
            displaySnack('Must be a moderator for the moderator view.', { variant: 'error' });
        }
    }, [displaySnack, eventId, node?.isViewerModerator, router]);

    if (!node || !node?.isViewerModerator) return <Loader />;
    return <EventLiveModeratorView node={node} />;
}

export interface PreloadedEventLiveModratorViewProps {
    eventId: string;
}

export function PreloadedEventLiveModratorView({ eventId }: PreloadedEventLiveModratorViewProps) {
    const [queryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveModeratorViewQuery>(
        EVENT_LIVE_MODERATOR_VIEW_QUERY
    );

    React.useEffect(() => {
        if (!queryRef) loadEventQuery({ eventId });
    }, [eventId, queryRef, loadEventQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return <EventLiveModeratorViewContainer queryRef={queryRef} eventId={eventId} />;
}
