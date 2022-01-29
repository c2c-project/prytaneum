/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Card, List, ListItem } from '@material-ui/core';
import { graphql, useMutation } from 'react-relay';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import type { QuestionQueueMutation } from '@local/__generated__/QuestionQueueMutation.graphql';
import type {
    useQuestionQueueFragment$data,
    useQuestionQueueFragment$key,
} from '@local/__generated__/useQuestionQueueFragment.graphql';
import DragArea from '@local/components/DragArea';
import DropArea from '@local/components/DropArea';
import { ArrayElement } from '@local/utils/ts-utils';
import { QuestionAuthor, QuestionStats, QuestionContent, QuestionQuote } from '../../Questions';
import { NextQuestionButton } from './NextQuestionButton';
import { useEvent } from '../../useEvent';
import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';
import { QuestionActions } from '../../Questions/QuestionActions';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { FilterList } from '@material-ui/icons';

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
        paddingTop: theme.spacing(0.5),
        borderRadius: '10px'
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
    questionActions: {
        display: 'flex',
        justifyContent: 'center',
        padding: 'theme.spacing(1) 0',
        width: '10rem',
    },
    filler: {
        visibility: 'hidden'
    },
    relative: {
        position: 'relative'
    },
    nextQuestion: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        position: 'absolute',
        top: theme.spacing(-1),
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#F5C64F',
        '&:hover': {
            background: '#E6B035',
        }
    },
    helperText: {
        width: '100%',
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
        color: '#B5B5B5'
    },
    listFilter: {
        flex: 1,
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
                    question
                    createdBy {
                        firstName
                    }
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
                                question: list[sourceIdx].node.question,
                                createdBy: {
                                    firstName: list[sourceIdx].node.createdBy?.firstName || 'Unknown User',
                                    id: list[sourceIdx].node.id
                                },
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
            margin: theme.spacing(0, 0, 0, 0),
            filter: isDragging ? 'drop-shadow(0 0 0.5rem #F5C64F50)' : '',
        }),
        [theme]
    );
    return [reorder, getListStyle, itemStyle] as const;
}

export function QuestionQueue({ fragmentRef }: QuestionQueueProps) {
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const { questionQueue, connections } = useQuestionQueue({ fragmentRef });
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
    // const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
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

    const accessors = React.useMemo<Accessors<ArrayElement<typeof enqueuedQuestions>>[]>(
        () => [
            (q) => q?.node.question || '', // question text itself
            (q) => q?.node.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(enqueuedQuestions, accessors);

    return (
        <>
            <ListFilter
                className={classes.listFilter}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
            />
            <Grid className={classes.helperText}>
                <Typography variant='caption'>
                    Drag and drop questions to re-order queue
                </Typography>
            </Grid>
            <DragDropContext onDragEnd={onDragEnd}>
                <DropArea getStyle={getListStyle} droppableId='droppable'>
                    {enqueuedQuestions.filter(question => filteredList.includes(question)).map((question, idx) => (
                        <DragArea
                            getStyle={itemStyle}
                            key={question.node.id}
                            index={idx}
                            draggableId={question.node.id}
                        >
                            <ListItem disableGutters className={classes.relative}>
                                { question === nextQuestion &&
                                    <NextQuestionButton
                                        color='primary'
                                        disabled={!canGoForward}
                                        variant='contained'
                                        className={classes.nextQuestion}
                                    />
                                }
                                <Card className={classes.item}>
                                    <QuestionAuthor fragmentRef={question.node} />
                                    <QuestionContent fragmentRef={question.node} />
                                    <Grid container alignItems='center' justify='space-between'>
                                        <QuestionStats fragmentRef={question.node} />
                                        <QuestionActions
                                            className={classes.questionActions}
                                            like={Boolean(false)}
                                            quote={Boolean(false)}
                                            queue={Boolean(true)}
                                            connections={connections}
                                            fragmentRef={question.node}
                                        />
                                        <span className={classes.filler}>
                                            <QuestionStats fragmentRef={question.node} />
                                        </span>
                                    </Grid>
                                </Card>
                            </ListItem>
                        </DragArea>
                    )) ?? []}
                </DropArea>
            </DragDropContext>
            <List>
                {questionRecord.slice(0, -1).map((question) => (
                    <ListItem key={question.node.id} disableGutters>
                        <Card className={classes.item}>
                            <QuestionAuthor fragmentRef={question.node} />
                            <QuestionContent fragmentRef={question.node} />
                            <QuestionStats fragmentRef={question.node} />
                        </Card>
                    </ListItem>
                )) ?? []}
            </List>
        </>
    );
}
