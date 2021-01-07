import React from 'react';
import { Fade, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Townhall } from 'prytaneum-typings';
import { motion } from 'framer-motion';

import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import QuestionQueue from 'domains/Questions/QuestionQueue';
import TownhallChat from '../TownhallChat';
import Information from '../TownhallPane';
import { TownhallContext } from '../../../contexts/Townhall';
import { Panes } from '../types';
import useIsModerator from '../useIsModerator';
import StyledTab from './StyledTab';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
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
    paneContainer: {
        width: '100%',
        flexBasis: '100%',
    },
}));

function buildPanes(townhall: Townhall, isModerator: boolean) {
    const panes: Partial<Record<Panes, JSX.Element>> = {
        Information: <Information />,
    };
    if (isModerator) {
        panes['Question Queue'] = <QuestionQueue />;
    }
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

const makeTransition = (idx: number) => ({
    delay: (idx + 1) * 0.1,
    type: 'spring',
    damping: 12,
    stiffness: 150,
});

export default function TownhallPanes() {
    const townhall = React.useContext(TownhallContext);
    const isModerator = useIsModerator();
    const panes = React.useMemo(() => buildPanes(townhall, isModerator), [
        townhall,
        isModerator,
    ]);
    type PaneKey = keyof typeof panes;
    const classes = useStyles();
    const [state, setState] = React.useState<PaneKey>('Information');

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
                <Grid item xs='auto' className={classes.chipContainer}>
                    {options.map((option, idx) => (
                        <StyledTab
                            key={option}
                            label={option}
                            index={idx}
                            value={option}
                            onClick={() => setState(option)}
                            selected={option === state}
                        />
                    ))}
                </Grid>
            )}
            <Grid item xs='auto' className={classes.paneContainer}>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={makeTransition(0)}
                    className={classes.outerContainer}
                >
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
                </motion.div>
            </Grid>
        </Grid>
    );
}
