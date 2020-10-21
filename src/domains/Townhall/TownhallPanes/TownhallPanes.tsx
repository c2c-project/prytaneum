import React from 'react';
import { Paper, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Pane, PaneContent, PaneNavigation } from './Panes';

import QuestionFeed from '../QuestionFeed';
import Chat from '../Chat';
import PaneSelect from '../PaneSelect';
import AskQuestion from '../AskQuestion';

const useStyles = makeStyles((theme) => ({
    navigation: {
        paddingBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

export default function TownhallPanes() {
    const panes = React.useMemo(
        () => ({
            'Question Feed': (
                <div>
                    <AskQuestion />
                    <QuestionFeed />
                </div>
            ),
            Chat: (
                <div>
                    <Chat />
                </div>
            ),
            Users: <div>USERS TODO</div>,
            Stats: <div>TODO</div>,
        }),
        []
    );
    type PaneKey = keyof typeof panes;
    const classes = useStyles();
    const [state, setState] = React.useState<PaneKey>('Chat');

    return (
        <Pane>
            <PaneNavigation>
                <Paper className={classes.paper}>
                    <PaneSelect
                        options={Object.keys(panes)} // TODO: finish pane select
                        value={state}
                        label='Select Pane'
                        onChange={(e) => {
                            const copy = e.target;
                            setState(copy.value as PaneKey);
                        }}
                    />
                </Paper>
            </PaneNavigation>
            <PaneContent>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {Object.entries(panes).map(([key, value]) => (
                        <Fade
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                display: key === state ? 'inherit' : 'none',
                            }}
                            in={key === state}
                            key={key}
                            timeout={400}
                        >
                            {value}
                        </Fade>
                    ))}
                </div>
            </PaneContent>
        </Pane>
    );
}
