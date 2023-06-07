import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { SettingsMenu } from '@local/components/SettingsMenu';
import type { EventSettingsQuery } from '@local/__generated__/EventSettingsQuery.graphql';

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

export const townhallSettingsSections = [
    'Form',
    'Video',
    'Speakers',
    'components',
    'Moderators',
    'Invite',
    'Data',
    'Preview',
];

export const EVENT_SETTINGS_QUERY = graphql`
    query EventSettingsQuery($input: ID!) {
        node(id: $input) {
            id
            ... on Event {
                isViewerModerator
                ...EventDetailsFragment
                ...SpeakerEventSettingsFragment
                ...VideoEventSettingsFragment
                ...GenericSettingsFragment
                ...ModeratorEventSettingsFragment
            }
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<EventSettingsQuery>;
}

export function EventSettings({ queryRef }: Props) {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
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
    }, [isLoading, user, router, data, displaySnack]);

    if (!data.node || !canView || isLoading) return <Loader />;

    return (
        <EventContext.Provider value={{ eventId: data.node.id, isModerator: Boolean(data.node.isViewerModerator) }}>
            <div style={{ width: lgUpBreakpoint ? '80%' : '100%', marginLeft: lgUpBreakpoint ? '250px' : 0 }}>
                <Typography variant='h2' margin={theme.spacing(0, 0, 2, 0)}>
                    Event Settings
                </Typography>
                <Divider style={{ width: '85%' }} />
                {data.node && (
                    <SettingsMenu
                        config={[
                            {
                                title: 'Details',
                                description: 'Update basic event details',
                                component: <EventDetails fragmentRef={data.node} />,
                            },
                            {
                                title: 'General',
                                description: 'Customize the event using various settings',
                                component: <GenericSettings fragmentRef={data.node} />,
                            },
                            {
                                title: 'Video',
                                description: 'Modify the list of video streams and their languages',
                                component: <VideoEventSettings fragmentRef={data.node} />,
                            },
                            {
                                title: 'Speaker',
                                description: 'Add and Modify speakers at this event',
                                component: <SpeakerEventSettings fragmentRef={data.node} />,
                            },
                            {
                                title: 'Moderators',
                                description: 'Designate individuals as moderators',
                                component: <ModeratorEventSettings fragmentRef={data.node} />,
                            },
                            {
                                title: 'Invites',
                                description: 'Invite people to join the event',
                                component: <InviteEventSettings fragmentRef={data.node} />,
                            },
                            {
                                title: 'Delete Event',
                                description: 'Click here to delete your event',
                                component: <DeleteEvent fragmentRef={data.node} />,
                            },
                        ]}
                    />
                )}
            </div>
        </EventContext.Provider>
    );
}
