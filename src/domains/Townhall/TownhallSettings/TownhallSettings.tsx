import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';

import history, { makeRelativeLink } from 'utils/history';
import SettingsMenu, { AccordionData } from 'components/SettingsMenu';
import TownhallForm from '../TownhallForm';
import JoinUrl from '../JoinUrl';
import {
    ChatSettings,
    CreditsSettings,
    QuestionFeedSettings,
    Moderators,
    ExportData,
    Preview,
} from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const componentSections = [
    {
        title: 'Chat',
        component: <ChatSettings />,
    },
    {
        title: 'Credits',
        component: <CreditsSettings />,
    },
    {
        title: 'Question Queue',
        component: <QuestionFeedSettings />,
    },
    // TODO:
    // {
    //     title: 'Links',
    //     component: <Links />,
    // },
];

const inviteSections = [
    {
        title: 'Join URL',
        component: <JoinUrl />,
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
];

const config: AccordionData[] = [
    {
        title: 'Form',
        description: 'Modify Townhall Form',
        component: <TownhallForm buttonText='Save' />,
    },
    {
        title: 'Components',
        description: 'Turn on and off optional components',
        component: (
            <Grid container spacing={2}>
                {componentSections.map(({ title, component }, idx) => (
                    <React.Fragment key={title}>
                        <Grid item xs={12}>
                            <Typography variant='overline'>{title}</Typography>
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
        description: 'Designate question queue moderators',
        component: <Moderators />,
    },
    {
        title: 'Invite',
        description: 'Manage invitations',
        component: (
            <Grid container spacing={2}>
                {inviteSections.map(({ title, component }) => (
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
        component: <ExportData />,
    },
    {
        title: 'Preview',
        description: 'Preview the townhall as...',
        component: <Preview />,
    },
];

export default function TownhallSettings() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SettingsMenu config={config} title='Townhall Settings' />
        </div>
    );
}
