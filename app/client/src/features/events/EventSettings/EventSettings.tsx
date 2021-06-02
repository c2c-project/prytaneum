/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import { useRouter } from 'next/router';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Event as OrgEvent, Scalars } from '@local/graphql-types';
import { LoadingButton } from '@local/components/LoadingButton';
import { CopyText } from '@local/components/CopyText';
import { Fab } from '@local/components/Fab';
import { useSnack, useEvent } from '@local/hooks';
import SettingsMenu, { AccordionData } from '@local/components/SettingsMenu';
import type { EventSettingsQuery } from '@local/__generated__/EventSettingsQuery.graphql';

import { EventForm } from '../EventForm';
import { MemoizedChatSettings } from './ChatSettings';
// import DataSettings from './DataSettings';
import { MemoizedQuestionFeedSettings } from './QuestionFeedSettings';
// import SpeakerSettings from './SpeakerSettings';
import ModeratorSettings from './ModeratorSettings';
// import PreviewSettings from './PreviewSettings';
import { VideoEventSettings } from '../Videos';
import { SpeakerEventSettings } from '../Speakers';
import { GenericSettings } from './GenericSettings';
import { EventDetails } from './EventDetails';
import { ModeratorEventSettings } from '../Moderation';

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

export const EVENT_SETTINGS_QUERY = graphql`
    query EventSettingsQuery($input: ID!) {
        node(id: $input) {
            id
            ... on Event {
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

// type SettingsType = {
//     [key in keyof OrgEvent]: OrgEvent[key] extends Scalars['Boolean'] ? boolean : never;
// };

// TODO: add mermaid diagram doc for this component since it is complex
export function EventSettings({ queryRef }: Props) {
    const classes = useStyles();
    const router = useRouter();
    // const [eventDetails] = useEvent();
    const [snack] = useSnack();
    const data = usePreloadedQuery(EVENT_SETTINGS_QUERY, queryRef);

    // const inviteSubSections = React.useMemo(
    //     () => [
    //         {
    //             title: 'Join URL',
    //             component: <CopyText text={`${window.origin}/events/${eventDetails.id}/live`} />,
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
    //     [eventDetails.id, router]
    // );

    const config: AccordionData[] = React.useMemo(
        () =>
            data.node
                ? [
                      {
                          title: 'Details',
                          description: 'Update basic event details',
                          component: <EventDetails fragmentRef={data.node} className={classes.settingsSection} />,
                      },
                      {
                          title: 'General',
                          description: 'Customize the event using various settings',
                          component: <GenericSettings className={classes.settingsSection} fragmentRef={data.node} />,
                      },
                      {
                          title: 'Video',
                          description: 'Modify the list of video streams and their languages',
                          component: <VideoEventSettings className={classes.settingsSection} fragmentRef={data.node} />,
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
                          component: () => (
                              <ModeratorEventSettings className={classes.settingsSection} fragmentRef={data.node} />
                          ),
                      },
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
                  ]
                : [],
        [data.node, classes.settingsSection]
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
