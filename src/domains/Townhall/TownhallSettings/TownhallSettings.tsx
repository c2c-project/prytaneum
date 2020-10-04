import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Typography,
    Divider,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TownhallForm from '../TownhallForm';
import JoinUrl from '../JoinUrl';
import {
    ChatSettings,
    CreditsSettings,
    QuestionFeedSettings,
    Links,
    Moderators,
    ExportData,
    Preview,
} from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    title: {
        padding: theme.spacing(2),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

interface Config {
    title: string;
    description: string;
    component: React.ReactNode;
}

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
    {
        title: 'Links',
        component: <Links />,
    },
];

const config: Config[] = [
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
                {componentSections.map(({ title, component }) => (
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
        title: 'Moderators',
        description: 'Designate question queue moderators',
        component: <Moderators />,
    },
    {
        title: 'Invite',
        description: 'Manage invitations',
        component: (
            <Grid container spacing={3}>
                <Grid
                    container
                    item
                    xs={12}
                    justify='space-between'
                    alignItems='center'
                >
                    <Grid item xs='auto'>
                        <Typography variant='body1'>Join URL</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <JoinUrl />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
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
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (
        event: React.ChangeEvent<unknown>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant='h4'>
                Settings
            </Typography>
            {config.map(({ title, description, component }) => (
                <Accordion
                    key={title}
                    expanded={expanded === title}
                    onChange={handleChange(title)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${title}-content`}
                        id={`${title}-header`}
                    >
                        <Typography className={classes.heading}>
                            {title}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {description}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>{component}</AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
