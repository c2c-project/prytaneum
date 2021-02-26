import React from 'react';
import type { Question } from 'prytaneum-typings';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Divider, Grid, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { incrementQueue, decrementQueue, jumpToCurrent } from 'reducers';
import usePlaylist from '../usePlaylist';
import QuestionCard from '../QuestionCard';

export interface CarouselProps {
    question: Question | undefined;
    onClickNext: () => void;
    onClickPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
    onClickJump: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },

    flex: {
        flex: '1 1 100%',
        padding: theme.spacing(0, 1),
        width: '100%',
    },
    hide: {
        visibility: 'hidden',
    },
}));

export function QuestionCarousel({ question, onClickNext, onClickPrev, hasNext, hasPrev, onClickJump }: CarouselProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <div className={classes.flex}> */}
            {question && (
                <QuestionCard
                    className={classes.flex}
                    CardProps={{ elevation: 0 }}
                    question={question}
                    quote={question.quote}
                />
            )}
            {!question && <Typography>No Question to display yet</Typography>}
            {/* </div> */}
            <Divider />
            <Grid container justify='space-between'>
                <IconButton onClick={onClickPrev} disabled={!hasPrev}>
                    <ChevronLeftIcon />
                </IconButton>
                <Button disabled={!hasNext} onClick={onClickJump}>
                    Go to Current
                </Button>
                <IconButton onClick={onClickNext} disabled={!hasNext}>
                    <ChevronRightIcon />
                </IconButton>
            </Grid>
        </div>
    );
}

export default function CurrentQuestion() {
    const [playlist, dispatch] = usePlaylist();
    const { position, queue, max } = playlist;

    function handleClick(dir: -1 | 1) {
        return () => {
            if (position + dir < 0) return;
            if (position + dir > queue.length) return;
            dispatch(dir === 1 ? incrementQueue() : decrementQueue());
        };
    }

    return (
        <QuestionCarousel
            question={queue[position]}
            onClickPrev={handleClick(-1)}
            onClickNext={handleClick(1)}
            hasNext={position < max}
            hasPrev={position > 0}
            onClickJump={() => dispatch(jumpToCurrent())}
        />
    );
}
