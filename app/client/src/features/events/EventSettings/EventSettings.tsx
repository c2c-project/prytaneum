/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography, Divider } from '@material-ui/core';

import { SettingsMenu } from '@local/components/SettingsMenu';
import type { EventSettingsQuery } from '@local/__generated__/EventSettingsQuery.graphql';

import { VideoEventSettings } from '../Videos';
import { SpeakerEventSettings } from '../Speakers';
import { GenericSettings } from './GenericSettings';
import { EventDetails } from './EventDetails';
import { ModeratorEventSettings } from '../Moderation';
import { EventContext } from '../EventContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
    settingsSection: {
        padding: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(0, 0, 2, 0),
    },
    titleDivider: {
        width: '85%',
    },
}));

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
    const classes = useStyles();
    const data = usePreloadedQuery(EVENT_SETTINGS_QUERY, queryRef);

    if (!data.node) return <div>Loading...</div>;

    return (
        <EventContext.Provider value={{ eventId: data.node.id, isModerator: Boolean(data.node.isViewerModerator) }}>
            <div className={classes.root}>
                <Typography variant='h2' className={classes.title}>
                    Event Settings
                </Typography>
                <Divider className={classes.titleDivider} />
                {data.node && (
                    <SettingsMenu
                        config={[
                            {
                                title: 'Details',
                                description: 'Update basic event details',
                                component: <EventDetails fragmentRef={data.node} className={classes.settingsSection} />,
                            },
                            {
                                title: 'General',
                                description: 'Customize the event using various settings',
                                component: (
                                    <GenericSettings className={classes.settingsSection} fragmentRef={data.node} />
                                ),
                            },
                            {
                                title: 'Video',
                                description: 'Modify the list of video streams and their languages',
                                component: (
                                    <VideoEventSettings className={classes.settingsSection} fragmentRef={data.node} />
                                ),
                            },
                            {
                                title: 'Speaker',
                                description: 'Add and Modify speakers at this event',
                                component: (
                                    <SpeakerEventSettings className={classes.settingsSection} fragmentRef={data.node} />
                                ),
                            },
                            {
                                title: 'Moderators',
                                description: 'Designate individuals as moderators',
                                component: (
                                    <ModeratorEventSettings
                                        className={classes.settingsSection}
                                        fragmentRef={data.node}
                                    />
                                ),
                            },
                        ]}
                    />
                )}
            </div>
        </EventContext.Provider>
    );
}
