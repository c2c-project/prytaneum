import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import { useRouter } from 'next/router';

import { Event as OrgEvent, Scalars, useEventByIdQuery } from '@local/graphql-types';
import { LoadingButton } from '@local/components/LoadingButton';
import { CopyText } from '@local/components/CopyText';
import { Fab } from '@local/components/Fab';
import { useSnack } from '@local/hooks/useSnack';
import SettingsMenu, { AccordionData } from '@local/components/SettingsMenu';

import { EventForm } from '../EventForm';
import { MemoizedChatSettings } from './ChatSettings';
import DataSettings from './DataSettings';
import { MemoizedQuestionFeedSettings } from './QuestionFeedSettings';
import SpeakerSettings from './SpeakerSettings';
import ModeratorSettings from './ModeratorSettings';
import PreviewSettings from './PreviewSettings';
import { MemoizedVideoSettings } from './VideoSettings';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(0, 0, 2, 0),
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

// type SettingsType = {
//     [key in keyof OrgEvent]: OrgEvent[key] extends Scalars['Boolean'] ? boolean : never;
// };

export interface EventSettingsProps {
    event: OrgEvent;
}

// TODO: add mermaid diagram doc for this component since it is complex
export function EventSettings({ event }: EventSettingsProps) {
    const classes = useStyles();
    const router = useRouter();
    const [eventDetails, setEventDetails] = React.useState<OrgEvent>(event);
    const [snack] = useSnack();
    // const isDiff = React.useMemo(() => JSON.stringify(townhall.settings) !== JSON.stringify(state), [
    //     townhall.settings,
    //     state,
    // ]);
    const handleChange = React.useCallback(
        <T extends keyof OrgEvent>(key: T) => (value: OrgEvent[T]) => {
            setEventDetails((prevState) => ({ ...prevState, [key]: value }));
        },
        []
    );

    const componentsubSections = React.useMemo(
        () => [
            {
                title: 'Question Feed',
                component: (
                    <MemoizedQuestionFeedSettings
                        onChange={handleChange('isQuestionFeedVisible')}
                        value={eventDetails.isQuestionFeedVisible}
                    />
                ),
            },
        ],
        [handleChange, eventDetails]
    );

    const inviteSubSections = React.useMemo(
        () => [
            {
                title: 'Join URL',
                component: <CopyText text={`${window.origin}/events/${event.eventId}/live`} />,
            },
            {
                title: 'Invitation Wizard',
                component: (
                    <Button onClick={() => router.push('/invite')} endIcon={<ChevronRight />} variant='outlined'>
                        Go To Invitation Wizard
                    </Button>
                ),
            },
        ],
        [event.eventId, router]
    );

    const config: AccordionData[] = React.useMemo(
        () => [
            {
                title: 'Details',
                description: 'Modify Basic Event Details',
                component: (
                    <EventForm
                        variant='update'
                        eventId={event.eventId}
                        form={{
                            topic: event.topic,
                            title: event.title,
                            description: event.description,
                            startDateTime: event.startDateTime,
                            endDateTime: event.endDateTime,
                        }}
                    />
                ),
            },
            {
                title: 'Video',
                description: 'Modify video settings',
                component: <MemoizedVideoSettings value={eventDetails.videos} onChange={handleChange('videos')} />,
            },
            {
                title: 'Speakers',
                description: 'Add and Modify speakers at this event',
                component: <SpeakerSettings value={eventDetails.speakers} onChange={handleChange('speakers')} />,
            },
            {
                title: 'Components',
                description: 'Turn on and off optional components',
                component: (
                    <Grid container spacing={2}>
                        {componentsubSections.map(({ title, component }, idx) => (
                            <React.Fragment key={title}>
                                <Grid item xs={12}>
                                    <Typography variant='overline'>{title}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {component}
                                </Grid>
                                {idx !== componentsubSections.length - 1 && (
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                ),
            },
            // TODO:
            // {
            //     title: 'Moderators',
            //     description: 'Designate individuals as moderators',
            //     component: () => (
            //         <ModeratorSettings value={eventDetails.moderators} onChange={handleChange('moderators')} />
            //     ),
            // },
            {
                title: 'Invite',
                description: 'Manage invitations',
                component: (
                    <Grid container spacing={2}>
                        {inviteSubSections.map(({ title, component }) => (
                            <React.Fragment key={title}>
                                <Grid item xs={12}>
                                    <Typography variant='body1'>{title}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {component}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                ),
            },
            {
                title: 'Data',
                description: 'Export data from this townhall',
                component: <DataSettings />,
            },
            {
                title: 'Preview',
                description: 'View townhall as different types of users',
                component: <PreviewSettings />,
            },
        ],
        [componentsubSections, inviteSubSections, eventDetails, handleChange]
    );

    return (
        <div id='settings-id' className={classes.root}>
            <SettingsMenu config={config} title='Townhall Settings' />
            {/* <LoadingButton loading={isLoading}> */}
            <Fab ZoomProps={{ in: false }}>
                <SaveIcon color='inherit' />
            </Fab>
            {/* </LoadingButton> */}
        </div>
    );
}
