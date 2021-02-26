import React from 'react';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReorderIcon from '@material-ui/icons/Reorder';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import type { Question } from 'prytaneum-typings';

import ResponsiveDialog from 'components/ResponsiveDialog';
import QuestionCard from '../QuestionCard';
import DndQuestions from './DndQuestions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(2),
        maxWidth: 700,
    },
    title: {
        marginLeft: theme.spacing(2),
        // fontSize: 14,
    },
    divider: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    empty: {
        margin: theme.spacing(5, 0),
    },
    item: {
        width: '100%',
    },
}));

export interface Props {
    queue: Question[];
    current: number;
    onClickNext: () => void;
    onClickPrev: () => void;
}

function QueuePreview({ queue, current, onClickNext, onClickPrev }: Props) {
    const classes = useStyles();
    const currentQuestion = queue[current];
    const nextQuestion = queue[current + 1];
    const hasPrevious = Boolean(queue[current - 1]);
    const [open, setOpen] = React.useState(false);

    return (
        <Grid container component={Paper} className={classes.root} justify='center' alignContent='flex-start'>
            <Grid container justify='space-around'>
                <Typography variant='body2'>
                    <b>{queue.length - (current < 0 ? 0 : current + 1)}</b>
                    &nbsp;Remaining
                </Typography>
                <Typography variant='body2'>
                    <b>{current + 1}</b>
                    &nbsp;Asked (Includes Current)
                </Typography>
            </Grid>
            <Divider className={classes.divider} />
            <Grid item xs={12}>
                <Typography className={classes.title} align='left' variant='h6'>
                    Current
                </Typography>
            </Grid>
            {currentQuestion && (
                <QuestionCard
                    stats
                    className={classes.item}
                    CardProps={{ elevation: 0 }}
                    question={currentQuestion}
                    quote={currentQuestion.quote}
                />
            )}
            {!currentQuestion && (
                <Typography color='textSecondary' variant='body2' className={classes.empty}>
                    There is no current question to display
                </Typography>
            )}
            <Grid container item justify='flex-end'>
                <Button startIcon={<SkipPreviousIcon />} onClick={onClickPrev} disabled={!hasPrevious}>
                    Previous Question
                </Button>
                <Button variant='outlined' disabled={!nextQuestion} startIcon={<SkipNextIcon />} onClick={onClickNext}>
                    Next Question
                </Button>
            </Grid>
            <Divider className={classes.divider} />
            <Grid item xs={12}>
                <Typography className={classes.title} align='left' variant='h6'>
                    Up Next
                </Typography>
            </Grid>

            {nextQuestion && (
                <QuestionCard
                    className={classes.item}
                    stats
                    CardProps={{ elevation: 0 }}
                    question={nextQuestion}
                    quote={nextQuestion.quote}
                />
            )}
            {!nextQuestion && (
                <Typography color='textSecondary' variant='body2' className={classes.empty}>
                    There is no question to display
                </Typography>
            )}

            <Grid container item justify='flex-end'>
                <Button variant='outlined' startIcon={<ReorderIcon />} onClick={() => setOpen(true)}>
                    Reorder
                </Button>
            </Grid>
            <ResponsiveDialog title='In Queue' fullScreen open={open} onClose={() => setOpen(false)}>
                <DndQuestions queue={queue} position={current} />
            </ResponsiveDialog>
        </Grid>
    );
}

QueuePreview.defaultProps = {};

QueuePreview.propTypes = {};

export default React.memo(QueuePreview);
