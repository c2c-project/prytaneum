import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Card, Button, List, ListItem } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';
import ReorderIcon from '@material-ui/icons/Reorder';

import type { QueueControlsFragment$key } from '@local/__generated__/QueueControlsFragment.graphql';
import CommentArrowLeft from '@local/icons/CommentArrowLeft';
import { ResponsiveDialog } from '@local/components';
import { QuestionAuthor, QuestionStats, QuestionContent } from '../../Questions';
import { DndQuestions } from './DndQuestions';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
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

interface QueueControlsProps {
    fragmentRef: QueueControlsFragment$key;
}

export const QUESTION_CONTROLS_FRAGMENT = graphql`
    fragment QueueControlsFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        currentQuestion
        queuedQuestions(first: $first, after: $after) @connection(key: "QueueControlsFragment_queuedQuestions") {
            edges {
                cursor
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
                    position
                }
            }
        }
        ...DndQuestionsFragment
    }
`;

export function QueueControls({ fragmentRef }: QueueControlsProps) {
    const data = useFragment(QUESTION_CONTROLS_FRAGMENT, fragmentRef);
    const classes = useStyles();
    const { totQuestions, currQuestionIdx } = React.useMemo(
        () => ({
            totQuestions: data.queuedQuestions?.edges?.length ?? 0,
            currQuestionIdx:
                data.queuedQuestions?.edges?.findIndex(({ node }) => node.position === data.currentQuestion) ?? 0,
        }),
        [data]
    );

    const { currentQuestion, nextQuestion, pastQuestions } = React.useMemo(
        () => ({
            currentQuestion: data.queuedQuestions?.edges && data.queuedQuestions.edges[currQuestionIdx],
            nextQuestion:
                data.queuedQuestions?.edges && data.queuedQuestions.edges.length > currQuestionIdx + 1
                    ? data.queuedQuestions.edges[currQuestionIdx + 1]
                    : null,
            pastQuestions: data.queuedQuestions?.edges?.slice(0, currQuestionIdx) ?? [],
        }),
        [currQuestionIdx, data]
    );

    const [open, setOpen] = React.useState(false);
    const [showPast, setShowPast] = React.useState(false);

    return (
        <Grid container component={Paper} className={classes.root} justify='center' alignContent='flex-start'>
            <Grid container justify='space-around'>
                <Typography variant='body2'>
                    <b>{currQuestionIdx === -1 ? totQuestions : totQuestions - currQuestionIdx - 1}</b>
                    &nbsp;Remaining
                </Typography>
                <Typography variant='body2'>
                    <b>{currQuestionIdx + 1}</b>
                    &nbsp;Asked (Includes Current)
                </Typography>
                <Divider className={classes.divider} />
                <Grid item xs={12}>
                    <Typography className={classes.title} align='left' variant='h6'>
                        Current
                    </Typography>
                </Grid>
            </Grid>
            {currentQuestion && (
                <Card>
                    <QuestionAuthor fragmentRef={currentQuestion.node} />
                    <QuestionContent fragmentRef={currentQuestion.node} />
                    <QuestionStats fragmentRef={currentQuestion.node} />
                </Card>
            )}
            {!currentQuestion && (
                <Typography color='textSecondary' variant='body2' className={classes.empty}>
                    There is no current question to display
                </Typography>
            )}
            <Grid container item justify='space-between'>
                <PreviousQuestionButton disabled={pastQuestions.length === 0} />
                <NextQuestionButton
                    disabled={currQuestionIdx === -1 ? true : Boolean(totQuestions - currQuestionIdx - 1)}
                    variant='outlined'
                />
            </Grid>
            <Divider className={classes.divider} />
            <Grid item xs={12}>
                <Typography className={classes.title} align='left' variant='h6'>
                    Up Next
                </Typography>
            </Grid>
            {nextQuestion && (
                <Card>
                    <QuestionAuthor fragmentRef={nextQuestion.node} />
                    <QuestionContent fragmentRef={nextQuestion.node} />
                    <QuestionStats fragmentRef={nextQuestion.node} />
                </Card>
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
                        <ListItem key={question.node.id}>
                            <Card>
                                <QuestionAuthor fragmentRef={question.node} />
                                <QuestionContent fragmentRef={question.node} />
                                <QuestionStats fragmentRef={question.node} />
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </ResponsiveDialog>
            <ResponsiveDialog title='In Queue' fullScreen open={open} onClose={() => setOpen(false)}>
                <DndQuestions fragmentRef={data} position={data.currentQuestion ?? 0} />
            </ResponsiveDialog>
        </Grid>
    );
}
