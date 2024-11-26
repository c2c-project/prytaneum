/* eslint-disable react/prop-types */
import * as React from 'react';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { FragmentRefs, graphql } from 'relay-runtime';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { Backdrop, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { EventContext } from '@local/features/events';
import { useSnack } from '@local/core';
import { useEventDetails } from '../useEventDetails';
import { usePingEvent } from '../Participants/usePingEvent';

import { EventLiveNewModeratorViewQuery } from '@local/__generated__/EventLiveNewModeratorViewQuery.graphql';
import { PreloadedActionsPanels } from './ActionsPanels';
import { QuestionModerationPanels } from './QuestionModerationPanels';
import { VerticalPanelResizeHandle } from '@local/components/PanelHandle';
import { useUser } from '@local/features/accounts';
import { useEventUpdates } from '@local/features/dashboard/useEventUpdates';

export const EVENT_LIVE_MODERATOR_VIEW_QUERY = graphql`
    query EventLiveNewModeratorViewQuery($eventId: ID!, $userLang: String!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                isActive
                isPrivate
                topics {
                    id
                    topic
                    description
                }
                ...useEventDetailsFragment
                ...useQuestionQueueFragment @arguments(userLang: $userLang)
                ...QuestionCarouselFragment @arguments(userLang: $userLang)
                ...useQuestionsByTopicFragment @arguments(userLang: $userLang)
                ...useQueueByTopicFragment @arguments(userLang: $userLang)
                ...useOnDeckFragment @arguments(userLang: $userLang)
                ...useQuestionModQueueFragment @arguments(userLang: $userLang)
            }
        }
    }
`;

export type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface EventLiveProps {
    node: Node;
    refresh: () => void;
}

function EventLiveNewModeratorView({ node, refresh }: EventLiveProps) {
    const theme = useTheme();
    const isXlDownBreakpoint = useMediaQuery(theme.breakpoints.down('xl')); // Below 1080p (likely 720p)
    const { eventData } = useEventDetails({
        fragmentRef: node,
    });
    const { id: eventId } = node;

    usePingEvent(eventId);
    useEventUpdates();

    // TODO: Improve suspense loading with skeletons that match the panel sizes
    return (
        <EventContext.Provider
            value={{
                eventId: node.id,
                isModerator: Boolean(node.isViewerModerator),
                eventData,
            }}
        >
            <PanelGroup direction='horizontal'>
                <Panel defaultSize={isXlDownBreakpoint ? 30 : 20} minSize={isXlDownBreakpoint ? 25 : 18} maxSize={40}>
                    <React.Suspense fallback={<Loader />}>
                        <PreloadedActionsPanels />
                    </React.Suspense>
                </Panel>
                <VerticalPanelResizeHandle />
                <Panel defaultSize={isXlDownBreakpoint ? 70 : 80} minSize={60} maxSize={isXlDownBreakpoint ? 75 : 82}>
                    <React.Suspense fallback={<Loader />}>
                        <QuestionModerationPanels node={node} topics={eventData?.topics || []} refresh={refresh} />
                    </React.Suspense>
                </Panel>
            </PanelGroup>
        </EventContext.Provider>
    );
}

interface EventLiveNewModeratorViewContainerProps {
    queryRef: PreloadedQuery<EventLiveNewModeratorViewQuery>;
    eventId: string;
    refresh: () => void;
}

function EventLiveNewModeratorViewContainer({ queryRef, eventId, refresh }: EventLiveNewModeratorViewContainerProps) {
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
    return <EventLiveNewModeratorView node={node} refresh={refresh} />;
}

export interface PreloadedEventLiveModratorViewProps {
    eventId: string;
}

export function PreloadedEventLiveNewModratorView({ eventId }: PreloadedEventLiveModratorViewProps) {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const { user, isLoading: isUserLoading } = useUser();
    const [queryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveNewModeratorViewQuery>(
        EVENT_LIVE_MODERATOR_VIEW_QUERY
    );

    const refresh = React.useCallback(() => {
        if (queryRef) {
            loadEventQuery({ eventId, userLang: user?.preferredLang || 'EN' });
        }
    }, [queryRef, loadEventQuery, eventId, user?.preferredLang]);

    React.useEffect(() => {
        // Wait until user is loaded to load the event query
        if (isUserLoading) return;
        if (!queryRef) loadEventQuery({ eventId, userLang: user?.preferredLang || 'EN' });
    }, [eventId, queryRef, loadEventQuery, user?.preferredLang, isUserLoading]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: lgDownBreakpoint ? theme.spacing(3, 3, 0, 3) : theme.spacing(0, 3), // add top padding so event video doesn't touch navbar
            }}
        >
            <React.Suspense
                fallback={
                    <Backdrop open={true}>
                        <CircularProgress color='inherit' />
                    </Backdrop>
                }
            >
                <EventLiveNewModeratorViewContainer queryRef={queryRef} eventId={eventId} refresh={refresh} />
            </React.Suspense>
        </div>
    );
}
