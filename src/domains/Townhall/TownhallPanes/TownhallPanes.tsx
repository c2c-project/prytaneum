import React from 'react';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Pane, PaneContent, PaneNavigation } from './Panes';

import QuestionFeed from '../QuestionFeed';
import Chat from '../Chat';
import PaneSelect from '../PaneSelect';
import AskQuestion from '../AskQuestion';
import Information from '../Information';

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

export default function TownhallPanes() {
    const panes = React.useMemo(
        () => ({
            'Question Feed': (
                <>
                    <AskQuestion />
                    <QuestionFeed />
                </>
            ),
            Chat: <Chat />,
            // TODO:
            // Users: <div>USERS TODO</div>,
            // Stats: <div>TODO</div>,
            Information: <Information />,
        }),
        []
    );
    type PaneKey = keyof typeof panes;
    const classes = useStyles();
    const [state, setState] = React.useState<PaneKey>('Chat');

    function getClassName(key: string) {
        return key === state
            ? classes.innerContainer
            : clsx([classes.innerContainer, classes.hidden]);
    }

    return (
        <Pane>
            <PaneNavigation>
                <div className={classes.container}>
                    <PaneSelect
                        options={Object.keys(panes)} // TODO: finish pane select
                        value={state}
                        label='Select Pane'
                        onChange={(e) => {
                            const copy = e.target;
                            setState(copy.value as PaneKey);
                        }}
                    />
                </div>
            </PaneNavigation>
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
