import React from 'react';

import type { Question } from 'prytaneum-typings';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';

import usePlaylist from '../usePlaylist';
import QuestionCard from '../QuestionCard';

export interface CarouselProps {
    question: Question | undefined;
    onClickNext: () => void;
    onClickPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },

    flex: {
        flex: '1 1 100%',
        padding: theme.spacing(0, 1),
    },
    hide: {
        visibility: 'hidden',
    },
}));

export function QuestionCarousel({ question, onClickNext, onClickPrev, hasNext, hasPrev }: CarouselProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={clsx({ [classes.hide]: !hasPrev })}>
                <IconButton color='secondary' onClick={onClickPrev}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <div className={classes.flex}>
                {question && <QuestionCard CardProps={{ elevation: 0 }} question={question} />}
                {!question && <Typography>No Question to display yet</Typography>}
            </div>
            <div className={clsx({ [classes.hide]: !hasNext })}>
                <IconButton color='secondary' onClick={onClickNext}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default function CurrentQuestion() {
    const [playlist] = usePlaylist();
    const [position, setPosition] = React.useState(playlist.position);

    function handleClick(dir: -1 | 1) {
        return () => {
            if (position + dir < 0) return;
            if (position + dir > playlist.queue.length) return;
            setPosition(position + dir);
        };
    }

    return (
        <QuestionCarousel
            question={playlist.queue[position]}
            onClickPrev={handleClick(-1)}
            onClickNext={handleClick(1)}
            hasNext={position < playlist.position}
            hasPrev={position > 0}
        />
    );
}
