import * as React from 'react';
import { Paper, Grid, Typography, Divider, Button, List, ListItem, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReorderIcon from '@material-ui/icons/Reorder';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { graphql, useFragment } from 'react-relay';

import type { QueuePreviewFragment$key } from '@local/__generated__/QueuePreviewFragment.graphql';
import CommentArrowLeft from '@local/icons/CommentArrowLeft';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { QuestionAuthor, QuestionContent } from '@local/features/events/Questions';
import QuestionCard from '../../Questions/QuestionCard';
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

export const QUEUE_PREVIEW_FRAGMENT = graphql`
    fragment QueuePreviewFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        queuedQuestions(first: $first, after: $after) @connection(key: "QueuePreviewFragment_queuedQuestions") {
            edges {
                cursor
                node {
                    id
                    position
                    ...QuestionCardFragment
                }
            }
        }
    }
`;

export interface QueuePreviewProps {
    fragmentRef: QueuePreviewFragment$key;
    current: number;
    onClickNext: () => void;
    onClickPrev: () => void;
}

function QueuePreview({ fragmentRef, current, onClickNext, onClickPrev }: QueuePreviewProps) {
    const data = useFragment(QUEUE_PREVIEW_FRAGMENT, fragmentRef);
    const classes = useStyles();
    // const currentQuestion = queue[current];
    // const nextQuestion = queue[current + 1];
    // const hasPrevious = Boolean(queue[current - 1]);
    // const pastQuestions = React.useMemo(() => queue.slice(0, current), [queue, current]);
    const [open, setOpen] = React.useState(false);
    const [showPast, setShowPast] = React.useState(false);
    console.log(data);

    return (
        <Grid container component={Paper} className={classes.root} justify='center' alignContent='flex-start'>
            {/* <Grid container justify='space-around'>
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
                <Card>
                    <QuestionAuthor />
                    <QuestionContent />
                </Card>
                // <QuestionCard
                //     stats
                //     className={classes.item}
                //     CardProps={{ elevation: 0 }}
                //     question={currentQuestion}
                //     quote={currentQuestion.quote}
                // />
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

            <Grid container item justify='space-between'>
                <Button variant='outlined' startIcon={<CommentArrowLeft />} onClick={() => setShowPast(true)}>
                    Past Questions
                </Button>
                <Button variant='outlined' startIcon={<ReorderIcon />} onClick={() => setOpen(true)}>
                    In Queue
                </Button>
            </Grid>
            <ResponsiveDialog title='Past Questions' fullScreen open={showPast} onClose={() => setShowPast(false)}>
                {pastQuestions.length === 0 && (
                    <Typography align='center' variant='h5'>
                        No Questions to display
                    </Typography>
                )}
                <List>
                    {pastQuestions.map((question) => (
                        <ListItem key={question._id}>
                            <QuestionCard stats className={classes.item} question={question} quote={question.quote} />
                        </ListItem>
                    ))}
                </List>
            </ResponsiveDialog>
            <ResponsiveDialog title='In Queue' fullScreen open={open} onClose={() => setOpen(false)}>
                <DndQuestions queue={queue} position={current} />
            </ResponsiveDialog> */}
        </Grid>
    );
}

export default React.memo(QueuePreview);
