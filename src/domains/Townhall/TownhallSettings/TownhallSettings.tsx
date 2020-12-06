import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import type { TownhallSettings as SettingsType } from 'prytaneum-typings';

import history, { makeRelativeLink } from 'utils/history';
import LoadingButton from 'components/LoadingButton';
import Fab from 'components/Fab';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import SettingsMenu, { AccordionData } from 'components/SettingsMenu';
import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';
import TownhallForm from '../TownhallForm';
import JoinUrl from '../JoinUrl';
import {
    ChatSettings,
    // CreditsSettings,
    QuestionFeedSettings,
    Moderators,
    ExportData,
    Preview,
    Speakers,
} from './components';
import { configureTownhall } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
}));

export default function TownhallSettings() {
    const classes = useStyles();
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState<SettingsType>(townhall.settings);
    const [snack] = useSnack();
    const isDiff = React.useMemo(
        () => JSON.stringify(townhall.settings) !== JSON.stringify(state),
        [townhall.settings, state]
    );
    const handleChange = React.useCallback(
        <T extends keyof SettingsType>(key: T) => {
            return (value: SettingsType[T]) => {
                setState((prevState) => ({ ...prevState, [key]: value }));
            };
        },
        []
    );
    const [save, isLoading] = useEndpoint(
        () => configureTownhall(townhall._id, state),
        {
            onSuccess: () => {
                snack('Saved!');
            },
        }
    );

    const componentSections = React.useMemo(
        () => [
            {
                title: 'Chat',
                component: (
                    <ChatSettings
                        onChange={handleChange('chat')}
                        value={state.chat}
                    />
                ),
            },
            // {
            //     title: 'Credits',
            //     component: (
            //         <CreditsSettings
            //             onChange={handleChange('credits')}
            //             value={state.credits}
            //         />
            //     ),
            // },
            {
                title: 'Question Queue',
                component: (
                    <QuestionFeedSettings
                        onChange={handleChange('questionQueue')}
                        value={state.questionQueue}
                    />
                ),
            },
            // TODO:
            // {
            //     title: 'Links',
            //     component: <Links />,
            // },
        ],
        [handleChange, state]
    );

    const inviteSections = React.useMemo(
        () => [
            {
                title: 'Join URL',
                component: <JoinUrl />,
            },
            {
                title: 'Invitation Wizard',
                component: (
                    <Button
                        onClick={() =>
                            history.push(makeRelativeLink('/invite'))
                        }
                        endIcon={<ChevronRight />}
                        variant='outlined'
                    >
                        Go To Invitation Wizard
                    </Button>
                ),
            },
        ],
        []
    );

    const config: AccordionData[] = React.useMemo(
        () => [
            {
                title: 'Form',
                description: 'Modify Townhall Form',
                component: <TownhallForm buttonText='Save' />,
            },
            {
                title: 'Speakers',
                description: 'Add and Modify speakers at this event',
                component: (
                    <Speakers
                        value={state.speakers}
                        onChange={handleChange('speakers')}
                    />
                ),
            },
            {
                title: 'Components',
                description: 'Turn on and off optional components',
                component: (
                    <Grid container spacing={2}>
                        {componentSections.map(({ title, component }, idx) => (
                            <React.Fragment key={title}>
                                <Grid item xs={12}>
                                    <Typography variant='overline'>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {component}
                                </Grid>
                                {idx !== componentSections.length - 1 && (
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
                component: () => (
                    <Moderators
                        value={state.moderators}
                        onChange={handleChange('moderators')}
                    />
                ),
            },
            {
                title: 'Invite',
                description: 'Manage invitations',
                component: (
                    <Grid container spacing={2}>
                        {inviteSections.map(({ title, component }) => (
                            <React.Fragment key={title}>
                                <Grid item xs={12}>
                                    <Typography variant='body1'>
                                        {title}
                                    </Typography>
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
                component: <ExportData />,
            },
            {
                title: 'Preview',
                description: 'View townhall as different types of users',
                component: <Preview />,
            },
        ],
        [componentSections, inviteSections, state, handleChange]
    );

    return (
        <div className={classes.root}>
            <SettingsMenu config={config} title='Townhall Settings' />
            <LoadingButton loading={isLoading}>
                <Fab zoomProps={{ in: isDiff }} onClick={save}>
                    <SaveIcon color='inherit' />
                </Fab>
            </LoadingButton>
        </div>
    );
}
