/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Card, Button, List, ListItem, DialogContent } from '@material-ui/core';
import { graphql, useMutation } from 'react-relay';
import ReorderIcon from '@material-ui/icons/Reorder';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import type { QuestionQueueMutation } from '@local/__generated__/QuestionQueueMutation.graphql';
import type {
    useQuestionQueueFragment$data,
    useQuestionQueueFragment$key,
} from '@local/__generated__/useQuestionQueueFragment.graphql';
import DragArea from '@local/components/DragArea';
import DropArea from '@local/components/DropArea';
import { ResponsiveDialog } from '@local/components';
import { ArrayElement } from '@local/utils/ts-utils';
import { QuestionAuthor, QuestionStats, QuestionContent, QuestionQuote } from '../../Questions';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';
import { useEvent } from '../../useEvent';
import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';

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
    fullWidth: {
        width: '100%',
    },
    currentQuestionWrapper: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
    },
    currentQuestionTitle: {
        marginBottom: theme.spacing(1),
        color: 'white',
    },
    dialogContent: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
    pastQuestionsContainer: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

type QuestionNode = ArrayElement<
    NonNullable<NonNullable<NonNullable<useQuestionQueueFragment$data['questionQueue']>['questionRecord']>['edges']>
>;

interface QuestionQueueProps {
    fragmentRef: useQuestionQueueFragment$key;
}

export const QUESTION_QUEUE_MUTATION = graphql`
    mutation QuestionQueueMutation($input: UpdateQuestionPosition!) @raw_response_type {
        updateQuestionPosition(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                }
            }
        }
    }
`;

/**
 * abstracting most of the styling/generic logic away
 */
function useStyledQueue({ eventId }: { eventId: string }) {
    const theme = useTheme();
    const [commit] = useMutation<QuestionQueueMutation>(QUESTION_QUEUE_MUTATION);
    const reorder = React.useCallback(
        (list: readonly QuestionNode[], sourceIdx: number, destinationIdx: number, minPosition: number) => {
            const isMovingTowardsStart = sourceIdx > destinationIdx;
            const maxIdx = isMovingTowardsStart ? destinationIdx : destinationIdx + 1;
            const minIdx = maxIdx - 1;

            // if maxIdx === list.length, then we're moving to the end of the list, hence special logic
            // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
            // at the very end may be messed up, but that's okay, the start is what's important
            const maxPos =
                maxIdx === list.length ? (list[list.length - 1].node.position ?? 0) + 1000 : list[maxIdx].node.position;

            // if minIdx === -1, then we're moving to the start of the list, hence special logic
            const minPos = minIdx === -1 ? minPosition : list[minIdx].node.position;

            if (!maxPos || minPos === null) return;

            // round b/c relay requires that int be an actual integer
            const newPosition = Math.round(minPos + (maxPos - minPos) / 2);

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: list[sourceIdx].node.id,
                        position: newPosition,
                    },
                },
                optimisticResponse: {
                    updateQuestionPosition: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: list[sourceIdx].cursor,
                            node: {
                                id: list[sourceIdx].node.id,
                                position: newPosition,
                            },
                        },
                    },
                },
            });
        },
        [commit, eventId]
    );
    const getListStyle = React.useCallback(
        (isDraggingOver: boolean): React.CSSProperties => ({
            background: isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: theme.spacing(2),
            borderRadius: theme.custom.borderRadius,
            boxShadow: theme.shadows[3],
        }),
        [theme]
    );

    const itemStyle = React.useCallback(
        (isDragging: boolean): React.CSSProperties => ({
            userSelect: 'none',
            margin: theme.spacing(0, 0, 4, 0),
            filter: isDragging ? `drop-shadow(0 0 .75rem ${theme.palette.secondary.light})` : '',
        }),
        [theme]
    );
    return [reorder, getListStyle, itemStyle] as const;
}

export function QuestionQueue({ fragmentRef }: QuestionQueueProps) {
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const questionQueue = useQuestionQueue({ fragmentRef });
    const recordConnection = React.useMemo(
        () => ({ connection: questionQueue?.questionRecord?.__id ?? '' }),
        [questionQueue?.questionRecord]
    );
    const enqueuedConnection = React.useMemo(
        () => ({ connection: questionQueue?.enqueuedQuestions?.__id ?? '' }),
        [questionQueue?.enqueuedQuestions]
    );

    const { eventId } = useEvent();
    const classes = useStyles();
    const ref = React.useRef<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [reorder, getListStyle, itemStyle] = useStyledQueue({ eventId });

    //
    // ─── SUBSCRIPTION HOOKS ─────────────────────────────────────────────────────────
    //
    useRecordPush(recordConnection);
    useRecordRemove(recordConnection);
    useRecordUnshift(recordConnection);
    useEnqueuedPush(enqueuedConnection);
    useEnqueuedRemove(enqueuedConnection);
    useEnqueuedUnshift(enqueuedConnection);

    //
    // ─── COMPUTED VALUES ────────────────────────────────────────────────────────────
    //
    const enqueuedQuestions = React.useMemo(
        () =>
            questionQueue?.enqueuedQuestions?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (a?.position ?? 0) - (b?.position ?? 0)) ?? [],
        [questionQueue]
    );
    const questionRecord = React.useMemo(
        () =>
            questionQueue?.questionRecord?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (a?.position ?? 0) - (b?.position ?? 0)) ?? [],
        [questionQueue]
    );
    const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
    const canGoForward = React.useMemo(() => enqueuedQuestions.length > 0, [enqueuedQuestions]);
    const currentQuestion = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord[questionRecord.length - 1] : null),
        [questionRecord]
    );
    const nextQuestion = React.useMemo(
        () => (canGoForward ? enqueuedQuestions[0] : null),
        [canGoForward, enqueuedQuestions]
    );

    //
    // ─── UTILITIES ──────────────────────────────────────────────────────────────────
    //
    const scrollToCurrent = () => {
        ref.current?.scrollIntoView();
    };

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination || !enqueuedQuestions) return;
            reorder(
                enqueuedQuestions,
                result.source.index,
                result.destination.index,
                currentQuestion?.node.position || 0
            );
        },
        [enqueuedQuestions, reorder, currentQuestion]
    );

    return (
        <Grid container component={Paper} className={classes.root} justify='center' alignContent='flex-start'>
            <Grid container justify='space-around'>
                <Typography variant='body2'>
                    <b>{enqueuedQuestions.length ?? 'Unknown'}</b>
                    &nbsp;Remaining
                </Typography>
                <Typography variant='body2'>
                    <b>{questionRecord.length ?? 'Unknown'}</b>
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
                <Card elevation={0} className={classes.fullWidth}>
                    <QuestionAuthor fragmentRef={currentQuestion.node} />
                    {currentQuestion.node.refQuestion && <QuestionQuote fragmentRef={currentQuestion.node.refQuestion} />}
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
                <PreviousQuestionButton disabled={!canGoBackward} />
                <NextQuestionButton disabled={!canGoForward} variant='outlined' />
            </Grid>
            <Divider className={classes.divider} />
            <Grid item xs={12}>
                <Typography className={classes.title} align='left' variant='h6'>
                    Up Next
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {nextQuestion && (
                    <Card elevation={0}>
                        <QuestionAuthor fragmentRef={nextQuestion.node} />
                        {nextQuestion.node.refQuestion && <QuestionQuote fragmentRef={nextQuestion.node.refQuestion} />}
                        <QuestionContent fragmentRef={nextQuestion.node} />
                        <QuestionStats fragmentRef={nextQuestion.node} />
                    </Card>
                )}
            </Grid>
            {!nextQuestion && (
                <Typography color='textSecondary' variant='body2' className={classes.empty}>
                    There is no question to display
                </Typography>
            )}

            <Grid container item justify='flex-end'>
                <Button variant='outlined' startIcon={<ReorderIcon />} onClick={() => setOpen(true)}>
                    In Queue
                </Button>
            </Grid>
            <ResponsiveDialog
                title='In Queue'
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                onEntered={scrollToCurrent}
            >
                <DialogContent className={classes.dialogContent}>
                    <Paper className={classes.pastQuestionsContainer}>
                        <Typography variant='h5'>Past Questions</Typography>
                        <List>
                            {questionRecord.slice(0, -1).map((question) => (
                                <ListItem key={question.node.id}>
                                    <Card className={classes.fullWidth}>
                                        <QuestionAuthor fragmentRef={question.node} />
                                        {question.node.refQuestion && <QuestionQuote fragmentRef={question.node.refQuestion} />}
                                        <QuestionContent fragmentRef={question.node} />
                                        <QuestionStats fragmentRef={question.node} />
                                    </Card>
                                </ListItem>
                            )) ?? []}
                        </List>
                    </Paper>
                    {currentQuestion && (
                        <Paper className={classes.currentQuestionWrapper} ref={ref}>
                            <Typography className={classes.currentQuestionTitle} variant='h5'>
                                Current Question
                            </Typography>
                            <Card>
                                <QuestionAuthor fragmentRef={currentQuestion.node} />
                                <QuestionContent fragmentRef={currentQuestion.node} />
                                <QuestionStats fragmentRef={currentQuestion.node} />
                            </Card>
                        </Paper>
                    )}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <DropArea getStyle={getListStyle} droppableId='droppable'>
                            <Typography variant='h5'>In Queue</Typography>
                            {enqueuedQuestions.map((question, idx) => (
                                <DragArea
                                    getStyle={itemStyle}
                                    key={question.node.id}
                                    index={idx}
                                    draggableId={question.node.id}
                                >
                                    <ListItem>
                                        <Card className={classes.fullWidth}>
                                            <QuestionAuthor fragmentRef={question.node} />
                                            {question.node.refQuestion && <QuestionQuote fragmentRef={question.node.refQuestion} />}
                                            <QuestionContent fragmentRef={question.node} />
                                            <QuestionStats fragmentRef={question.node} />
                                        </Card>
                                    </ListItem>
                                </DragArea>
                            )) ?? []}
                        </DropArea>
                    </DragDropContext>
                </DialogContent>
            </ResponsiveDialog>
        </Grid>
    );
}
