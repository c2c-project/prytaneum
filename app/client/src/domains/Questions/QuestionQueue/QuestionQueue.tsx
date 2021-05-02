import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import useTownhall from 'hooks/useTownhall';
import useEndpoint from 'hooks/useEndpoint';
import useQuestionQueue from './useQuestionQueue';
import QueuePreview from './QueuePreview';
import { nextQuestion, prevQuestion } from '../api';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
    },
}));

export default function QuestionQueue() {
    const [{ queue, current }] = useQuestionQueue();
    const [townhall] = useTownhall();
    const classes = useStyles();

    const goNextEndpoint = React.useCallback(() => nextQuestion(townhall._id), [townhall]);
    const goPrevEndpoint = React.useCallback(() => prevQuestion(townhall._id), [townhall]);

    const [runNext] = useEndpoint(goNextEndpoint, { minWaitTime: 0 });
    const [runPrev] = useEndpoint(goPrevEndpoint, { minWaitTime: 0 });

    const handleClick = (dir: -1 | 1) => () => {
        if (dir === -1) runPrev();
        else runNext();
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <QueuePreview
                    onClickNext={handleClick(1)}
                    onClickPrev={handleClick(-1)}
                    queue={queue}
                    current={current}
                />
            </Grid>
        </div>
    );
}
