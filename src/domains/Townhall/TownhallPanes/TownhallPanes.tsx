import React from 'react';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Townhall } from 'prytaneum-typings';

import QuestionFeed from 'domains/Questions/QuestionFeed';
import AskQuestion from 'domains/Questions/AskQuestion';
import { Pane, PaneContent, PaneNavigation } from './Panes';
import Chat from '../Chat';
import PaneSelect from '../PaneSelect';
import Information from '../Information';
import { TownhallContext } from '../Contexts/Townhall';
import { Panes } from '../types';

const useStyles = makeStyles((theme) => ({
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

    if (townhall.settings.chat.enabled) panes.Chat = <Chat />;
    return panes;
}

export default function TownhallPanes() {
    const townhall = React.useContext(TownhallContext);
    const panes = React.useMemo(() => buildPanes(townhall), [townhall]);
    type PaneKey = keyof typeof panes;
    const classes = useStyles();
    const [state, setState] = React.useState<PaneKey>('Information');

    function getClassName(key: string) {
        return key === state
            ? classes.innerContainer
            : clsx([classes.innerContainer, classes.hidden]);
    }

    const options = Object.keys(panes);

    return (
        <Pane>
            {options.length > 1 ? (
                <PaneNavigation>
                    <div className={classes.container}>
                        <PaneSelect
                            options={options} // TODO: finish pane select
                            value={state}
                            label='Select Pane'
                            onChange={(e) => {
                                const copy = e.target;
                                setState(copy.value as PaneKey);
                            }}
                        />
                    </div>
                </PaneNavigation>
            ) : (
                <></>
            )}
            <PaneContent>
                <div className={classes.outerContainer}>
                    {Object.entries(panes).map(([key, value]) => (
                        <Fade in={key === state} key={key} timeout={400}>
                            <div className={getClassName(key)}>{value}</div>
                        </Fade>
                    ))}
                </div>
            </PaneContent>
        </Pane>
    );
}
