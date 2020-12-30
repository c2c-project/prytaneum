import React from 'react';
import { Fade, Chip, Badge, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Townhall } from 'prytaneum-typings';

import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import TownhallChat from '../TownhallChat';
import Information from '../TownhallPane';
import { TownhallContext } from '../Contexts/Townhall';
import { Panes } from '../types';
import { PaneContext } from '../Contexts/Pane';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    navigation: {
        paddingBottom: theme.spacing(2),
    },
    chipContainer: {
        marginBottom: theme.spacing(2),
    },
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    hidden: {
        display: 'none',
    },
    chip: {
        marginRight: theme.spacing(1),
        border: '1px solid grey',
        ...theme.typography.subtitle2,
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(1),
        },
    },
    paneContainer: {
        width: '100%',
        flexBasis: '100%',
    },
}));

function buildPanes(townhall: Townhall) {
    const panes: Partial<Record<Panes, JSX.Element>> = {
        Information: <Information />,
    };
    if (townhall.settings.questionQueue.transparent)
        panes['Question Feed'] = (
            <>
                <AskQuestion />
                <QuestionFeed style={{ padding: 0 }} />
            </>
        );

    if (townhall.settings.chat.enabled) panes.Chat = <TownhallChat />;
    return panes;
}

export default function TownhallPanes() {
    const townhall = React.useContext(TownhallContext);
    const panes = React.useMemo(() => buildPanes(townhall), [townhall]);
    type PaneKey = keyof typeof panes;
    const classes = useStyles();
    const [state, setState] = React.useState<PaneKey>('Information');
    const [context] = React.useContext(PaneContext);

    function getClassName(key: string) {
        return key === state
            ? classes.innerContainer
            : clsx([classes.innerContainer, classes.hidden]);
    }

    const options = Object.keys(panes) as PaneKey[];

    // TODO: make the new chip tabs accessible
    return (
        <Grid
            container
            className={classes.root}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            {options.length > 1 && (
                <Grid item xs='auto'>
                    <div className={classes.chipContainer}>
                        {options.map((option) => (
                            <Badge
                                key={option}
                                badgeContent={context[option]}
                                overlap='circle'
                                color='secondary'
                            >
                                <Chip
                                    aria-selected={option === state}
                                    aria-controls={`${option}-panel`}
                                    role='tab'
                                    className={classes.chip}
                                    key={option}
                                    label={option}
                                    color={
                                        option === state ? 'primary' : 'default'
                                    }
                                    onClick={() => setState(option)}
                                />
                            </Badge>
                        ))}
                    </div>
                </Grid>
            )}
            <Grid item xs='auto' className={classes.paneContainer}>
                <div className={classes.outerContainer}>
                    {Object.entries(panes).map(([key, value]) => (
                        <Fade in={key === state} key={key} timeout={400}>
                            <div
                                id={`${key}-panel`}
                                role='tabpanel'
                                className={getClassName(key)}
                            >
                                {value}
                            </div>
                        </Fade>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
}
