import React from 'react';
import { Fade, Chip, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Townhall } from 'prytaneum-typings';

import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import Pane from 'components/Pane';
import PaneContent from 'components/PaneContent';
import PaneNavigation from 'components/PaneNavigation';
import TownhallChat from '../TownhallChat';
import Information from '../TownhallPane';
import { TownhallContext } from '../Contexts/Townhall';
import { Panes } from '../types';
import { PaneContext } from '../Contexts/Pane';

// source for constants and other seemingly random variables https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Badge/Badge.js
const RADIUS_STANDARD = 10;

const useStyles = makeStyles((theme) => ({
    badge: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: RADIUS_STANDARD,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        padding: theme.spacing(0, 1),
        minWidth: RADIUS_STANDARD * 2,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(2),
    },
    navigation: {
        paddingBottom: theme.spacing(2),
    },
    container: {
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
                <QuestionFeed />
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
        <Pane>
            {options.length > 1 ? (
                <PaneNavigation>
                    <div className={classes.container}>
                        {options.map((option) => (
                            <Badge
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
                </PaneNavigation>
            ) : (
                <></>
            )}
            <PaneContent>
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
            </PaneContent>
        </Pane>
    );
}
