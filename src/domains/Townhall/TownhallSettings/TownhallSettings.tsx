import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import type { TownhallSettings as SettingsType } from 'prytaneum-typings';

import history, { makeRelativeLink } from 'utils/history';
import LoadingButton from 'components/LoadingButton';
import CopyText from 'components/CopyText';
import Fab from 'components/Fab';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import SettingsMenu, { AccordionData } from 'components/SettingsMenu';
import useTownhall from 'hooks/useTownhall';

import TownhallForm from '../TownhallForm';
import ChatSettings from './ChatSettings';
import DataSettings from './DataSettings';
import QuestionFeedSettings from './QuestionFeedSettings';
import SpeakerSettings from './SpeakerSettings';
import ModeratorSettings from './ModeratorSettings';
import PreviewSettings from './PreviewSettings';
import VideoSettings from './VideoSettings';

import { configureTownhall } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
}));

// TODO: add mermaid diagram doc for this component since it is complex
export default function TownhallSettings() {
    const classes = useStyles();
    const [townhall] = useTownhall();
    const [state, setState] = React.useState<SettingsType>(townhall.settings);
    const [snack] = useSnack();
    const isDiff = React.useMemo(() => JSON.stringify(townhall.settings) !== JSON.stringify(state), [
        townhall.settings,
        state,
    ]);
    const handleChange = React.useCallback(<T extends keyof SettingsType>(key: T) => {
        return (value: SettingsType[T]) => {
            setState((prevState) => ({ ...prevState, [key]: value }));
        };
    }, []);
    const [save, isLoading] = useEndpoint(() => configureTownhall(townhall._id, state), {
        onSuccess: () => {
            snack('Saved!');
        },
    });

    const componentSubSections = React.useMemo(
        () => [
            {
                title: 'Breakout Rooms',
                component: <ChatSettings onChange={handleChange('chat')} value={state.chat} />,
            },
            {
                title: 'Question Feed',
                component: (
                    <QuestionFeedSettings onChange={handleChange('questionQueue')} value={state.questionQueue} />
                ),
            },
        ],
        [handleChange, state]
    );

    const inviteSubSections = React.useMemo(
        () => [
            {
                title: 'Join URL',
                component: <CopyText text={`${window.origin}/join/${townhall._id}`} />,
            },
            {
                title: 'Invitation Wizard',
                component: (
                    <Button
                        onClick={() => history.push(makeRelativeLink('/invite'))}
                        endIcon={<ChevronRight />}
                        variant='outlined'
                    >
                        Go To Invitation Wizard
                    </Button>
                ),
            },
        ],
        [townhall._id]
    );

    const config: AccordionData[] = React.useMemo(
        () => [
            {
                title: 'Form',
                description: 'Modify Townhall Form',
                component: <TownhallForm buttonText='Save' />,
            },
            {
                title: 'Video',
                description: 'Modify video settings',
                component: <VideoSettings value={state.video} onChange={handleChange('video')} />,
            },
            {
                title: 'Speakers',
                description: 'Add and Modify speakers at this event',
                component: <SpeakerSettings value={state.speakers} onChange={handleChange('speakers')} />,
            },
            {
                title: 'Components',
                description: 'Turn on and off optional components',
                component: (
                    <Grid container spacing={2}>
                        {componentSubSections.map(({ title, component }, idx) => (
                            <React.Fragment key={title}>
                                <Grid item xs={12}>
                                    <Typography variant='overline'>{title}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {component}
                                </Grid>
                                {idx !== componentSubSections.length - 1 && (
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                ),
            },
            {
                title: 'Moderators',
                description: 'Designate individuals as moderators',
                component: () => <ModeratorSettings value={state.moderators} onChange={handleChange('moderators')} />,
            },
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
        [componentSubSections, inviteSubSections, state, handleChange]
    );

    return (
        <div id='settings-id' className={classes.root}>
            <SettingsMenu config={config} title='Townhall Settings' />
            <LoadingButton loading={isLoading}>
                <Fab ZoomProps={{ in: isDiff }} onClick={save}>
                    <SaveIcon color='inherit' />
                </Fab>
            </LoadingButton>
        </div>
    );
}
