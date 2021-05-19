import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import { useRouter } from 'next/router';

import { Event as OrgEvent, Scalars } from '@local/graphql-types';
import { LoadingButton } from '@local/components/LoadingButton';
import { CopyText } from '@local/components/CopyText';
import { Fab } from '@local/components/Fab';
import { useSnack, useEvent } from '@local/hooks';
import SettingsMenu, { AccordionData } from '@local/components/SettingsMenu';

import { EventForm } from '../EventForm';
import { MemoizedChatSettings } from './ChatSettings';
// import DataSettings from './DataSettings';
import { MemoizedQuestionFeedSettings } from './QuestionFeedSettings';
// import SpeakerSettings from './SpeakerSettings';
import ModeratorSettings from './ModeratorSettings';
// import PreviewSettings from './PreviewSettings';
import { EventSettings as VideoSettings } from '../Videos';
import { EventSettings as SpeakerSettings } from '../Speakers';
import { GenericSettings } from './GenericSettings';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
    settingsSection: {
        padding: theme.spacing(2),
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

// TODO: add mermaid diagram doc for this component since it is complex
export function EventSettings() {
    const classes = useStyles();
    const router = useRouter();
    const [eventDetails] = useEvent();
    const [snack] = useSnack();

    // const inviteSubSections = React.useMemo(
    //     () => [
    //         {
    //             title: 'Join URL',
    //             component: <CopyText text={`${window.origin}/events/${eventDetails.eventId}/live`} />,
    //         },
    //         {
    //             title: 'Invitation Wizard',
    //             component: (
    //                 <Button onClick={() => router.push('/invite')} endIcon={<ChevronRight />} variant='outlined'>
    //                     Go To Invitation Wizard
    //                 </Button>
    //             ),
    //         },
    //     ],
    //     [eventDetails.eventId, router]
    // );

    const config: AccordionData[] = React.useMemo(
        () => [
            {
                title: 'General Settings',
                description: 'Customize the event using various settings',
                component: <GenericSettings className={classes.settingsSection} />,
            },
            {
                title: 'Details',
                description: 'Update basic event details',
                component: (
                    <EventForm
                        title={false}
                        variant='update'
                        eventId={eventDetails.eventId}
                        form={{
                            // TODO: maybe validate and display a pop up that something went wrong instead of having defaults like this
                            topic: eventDetails.topic || '',
                            title: eventDetails.title || '',
                            description: eventDetails.description || '',
                            startDateTime: eventDetails.startDateTime || new Date(),
                            endDateTime: eventDetails.endDateTime || new Date(),
                        }}
                        className={classes.settingsSection}
                    />
                ),
            },
            {
                title: 'Video',
                description: 'Modify the list of video streams and their languages',
                component: (
                    <VideoSettings className={classes.settingsSection} videos={eventDetails.videos || undefined} />
                ),
            },
            {
                title: 'Speakers',
                description: 'Add and Modify speakers at this event',
                component: (
                    <SpeakerSettings
                        className={classes.settingsSection}
                        speakers={eventDetails.speakers || undefined}
                    />
                ),
            },
            // {
            //     title: 'Components',
            //     description: 'Turn on and off optional components',
            //     component: (
            //         <Grid container>
            //             {componentsubSections.map(({ title, component }, idx) => (
            //                 <React.Fragment key={title}>
            //                     <Typography variant='overline'>{title}</Typography>
            //                     <Grid item xs={12}>
            //                         {component}
            //                     </Grid>
            //                     {idx !== componentsubSections.length - 1 && (
            //                         <Grid item xs={12}>
            //                             <Divider />
            //                         </Grid>
            //                     )}
            //                 </React.Fragment>
            //             ))}
            //         </Grid>
            //     ),
            // },
            // TODO:
            // {
            //     title: 'Moderators',
            //     description: 'Designate individuals as moderators',
            //     component: () => (
            //         <ModeratorSettings value={eventDetails.moderators} onChange={handleChange('moderators')} />
            //     ),
            // },
            // {
            //     title: 'Invite',
            //     description: 'Manage invitations',
            //     component: (
            //         <Grid container>
            //             {inviteSubSections.map(({ title, component }) => (
            //                 <React.Fragment key={title}>
            //                     <Typography variant='overline'>{title}</Typography>
            //                     <Grid item xs={12}>
            //                         {component}
            //                     </Grid>
            //                 </React.Fragment>
            //             ))}
            //         </Grid>
            //     ),
            // },
        ],
        [eventDetails, classes.settingsSection]
    );

    return (
        <div id='settings-id' className={classes.root}>
            <SettingsMenu config={config} title='Event Settings' />
            {/* <LoadingButton loading={isLoading}> */}
            <Fab ZoomProps={{ in: false }}>
                <SaveIcon color='inherit' />
            </Fab>
            {/* </LoadingButton> */}
        </div>
    );
}
