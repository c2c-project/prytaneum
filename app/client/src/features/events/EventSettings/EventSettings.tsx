import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { SettingsMenu } from '@local/components/SettingsMenu';
import type { EventSettingsQuery, EventSettingsQuery$data } from '@local/__generated__/EventSettingsQuery.graphql';

import { useUser } from '@local/features/accounts';
import { useRouter } from 'next/router';
import { Loader } from '@local/components/Loader';
import { useSnack } from '@local/core';
import { VideoEventSettings } from '../Videos';
import { SpeakerEventSettings } from '../Speakers';
import { GenericSettings } from './GenericSettings';
import { EventDetails } from './EventDetails';
import { ModeratorEventSettings } from '../Moderation';
import { EventContext } from '../EventContext';
import { InviteEventSettings } from '../Invites/InviteEventSettings';
import { DeleteEvent } from '../DeleteEvent';
import { EventIssueGuideSettings } from '../EventIssueGuide';
import { EventTopicSettings } from '../EventTopics/EventTopicSettings';
import { useEventDetails } from '../useEventDetails';
import { SimulationEventSettings } from './SimulationEventSettings';

export const eventSettingsSections = [
    'Form',
    'Video',
    'Speakers',
    'Topics',
    'Issue Guide',
    'components',
    'Moderators',
    'Invite',
    'Data',
    'Preview',
];

export const EVENT_SETTINGS_QUERY = graphql`
    query EventSettingsQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                ...EventDetailsFragment
                ...SpeakerEventSettingsFragment
                ...VideoEventSettingsFragment
                ...GenericSettingsFragment
                ...SimulationEventSettingsFragment
                ...ModeratorEventSettingsFragment
                ...useInvitedUsersListFragment @arguments(eventId: $eventId)
                ...EventIssueGuideSettingsFragment
                ...useEventDetailsFragment
            }
        }
    }
`;

type CheckedEventQueryNode = NonNullable<NonNullable<EventSettingsQuery$data>['node']>;

interface EventSettingsProps {
    node: CheckedEventQueryNode;
}

export function EventSettings({ node }: EventSettingsProps) {
    const theme = useTheme();
    const xlBreakpointUp = useMediaQuery(theme.breakpoints.up('xl'));
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { eventData } = useEventDetails({ fragmentRef: node });

    const getContainerStyles = React.useMemo(() => {
        if (xlBreakpointUp) return { width: '80%', marginLeft: '300px' };
        if (lgBreakpointUp) return { width: '80%', marginLeft: '250px' };
        return { width: '100%' };
    }, [xlBreakpointUp, lgBreakpointUp]);

    return (
        <EventContext.Provider
            value={{
                eventId: node.id,
                isModerator: Boolean(node.isViewerModerator),
                pauseParentRefreshing: () => {},
                resumeParentRefreshing: () => {},
                eventData,
            }}
        >
            <div style={getContainerStyles}>
                <Typography variant='h2' margin={theme.spacing(0, 0, 2, 0)}>
                    Event Settings
                </Typography>
                {node && (
                    <SettingsMenu
                        config={[
                            {
                                title: 'Details',
                                description: 'Update basic event details',
                                component: <EventDetails fragmentRef={node} />,
                            },
                            {
                                title: 'General',
                                description: 'Customize the event using various settings',
                                component: <GenericSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Video',
                                description: 'Select and configure the type of video for this event',
                                component: <VideoEventSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Simulation',
                                description: 'Configure simulated survey participants and context',
                                component: <SimulationEventSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Speaker',
                                description: 'Add and Modify speakers at this event',
                                component: <SpeakerEventSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Topics',
                                description: 'Add and Modify the event topics',
                                component: <EventTopicSettings />,
                            },
                            {
                                title: 'Issue Guide',
                                description: 'Add and Modify the event issue guide',
                                component: <EventIssueGuideSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Moderators',
                                description: 'Designate individuals as moderators',
                                component: <ModeratorEventSettings fragmentRef={node} />,
                            },
                            {
                                title: 'Invites',
                                description: 'Invite people to join the event',
                                component: (
                                    <InviteEventSettings
                                        eventDetailsFragmentRef={node}
                                        invitedUsersListFragmentRef={node}
                                    />
                                ),
                            },
                            {
                                title: 'Delete Event',
                                description: 'Click here to delete your event',
                                component: <DeleteEvent fragmentRef={node} />,
                            },
                        ]}
                    />
                )}
            </div>
        </EventContext.Provider>
    );
}

interface EventSettingsContainerProps {
    queryRef: PreloadedQuery<EventSettingsQuery>;
}

export function EventSettingsContainer({ queryRef }: EventSettingsContainerProps) {
    const router = useRouter();
    const { displaySnack } = useSnack();
    const data = usePreloadedQuery(EVENT_SETTINGS_QUERY, queryRef);
    const { user, isLoading } = useUser();
    const [canView, setCanView] = React.useState(false);

    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
        else if (data.node?.isViewerModerator) {
            setCanView(true);
        } else {
            displaySnack('You must be a moderator to view', { variant: 'error' });
            router.back();
        }
    }, [isLoading, user, router, data.node?.isViewerModerator, displaySnack]);

    if (!data.node || !canView || isLoading) return <Loader />;

    return <EventSettings node={data.node} />;
}
