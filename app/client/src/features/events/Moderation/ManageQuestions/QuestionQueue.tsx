/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Select, MenuItem, Grid, Typography, List, ListItem, IconButton, SelectProps } from '@mui/material';
import { graphql, useMutation } from 'react-relay';
import FilterListIcon from '@mui/icons-material/FilterList';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import type { QuestionQueueMutation } from '@local/__generated__/QuestionQueueMutation.graphql';
import type {
    useQuestionQueueFragment$data,
    useQuestionQueueFragment$key,
} from '@local/__generated__/useQuestionQueueFragment.graphql';
import { ArrayElement } from '@local/utils/ts-utils';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    useSensors,
    PointerSensor,
    useSensor,
    DragStartEvent,
    DragOverlay,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
    QuestionAuthor,
    QuestionStats,
    QuestionContent,
    QuestionQuote,
    QuestionCard,
} from '@local/components/ui/Question';
import { useEvent } from '../../useEvent';
import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';
import { useSnack } from '@local/core';
import { FragmentRefs } from 'relay-runtime';
import { QuestionActions } from '../../Questions/QuestionActions';

type QuestionNode = ArrayElement<
    NonNullable<NonNullable<NonNullable<useQuestionQueueFragment$data['questionQueue']>['questionRecord']>['edges']>
>;

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

type ProcessedQuestion = {
    id: string;
    cursor: string;
    node: {
        readonly createdBy: {
            readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly position: string;
        readonly question: string | null;
        readonly refQuestion: {
            readonly ' $fragmentSpreads': FragmentRefs<any>;
        } | null;
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
};

const SortableQuestion = ({ question, connections }: { question: ProcessedQuestion; connections: string[] }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.node.id });
    const style = { transition, transform: CSS.Transform.toString(transform) };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ ...style, padding: '0.5rem', width: '100%', borderRadius: '10px', position: 'relative' }}
        >
            <QuestionCard sx={{ paddingBottom: '.5rem' }}>
                <QuestionAuthor fragmentRef={question.node} />
                {question.node.refQuestion && <QuestionQuote fragmentRef={question.node.refQuestion} />}
                <QuestionContent fragmentRef={question.node} />
                <Grid container alignItems='center' justifyContent='space-between'>
                    <QuestionStats fragmentRef={question.node} />
                    <QuestionActions
                        style={{ display: 'flex', justifyContent: 'center', width: '10rem' }}
                        likeEnabled={Boolean(false)}
                        quoteEnabled={Boolean(false)}
                        queueEnabled={Boolean(true)}
                        deleteEnabled={Boolean(false)}
                        connections={connections}
                        fragmentRef={question.node}
                    />
                </Grid>
            </QuestionCard>
        </div>
    );
};

/**
 * abstracting most of the styling/generic logic away
 */
function useStyledQueue({ eventId }: { eventId: string }) {
    const theme = useTheme();
    const { displaySnack } = useSnack();
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
                maxIdx === list.length
                    ? (parseInt(list[list.length - 1].node.position) ?? 0) + 1000
                    : parseInt(list[maxIdx].node.position);

            // if minIdx === -1, then we're moving to the start of the list, hence special logic
            const minPos = minIdx === -1 ? minPosition : parseInt(list[minIdx].node.position);

            if (!maxPos || minPos === null) return;

            // round b/c relay requires that int be an actual integer
            const newPosition = Math.round(minPos + (maxPos - minPos) / 2);

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: list[sourceIdx].node.id,
                        position: newPosition.toString(),
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
                                    id: list[sourceIdx].node.id,
                                },
                                position: newPosition.toString(),
                            },
                        },
                    },
                },
                onCompleted: (res) => {
                    if (res.updateQuestionPosition.isError) {
                        displaySnack(res.updateQuestionPosition.message, { variant: 'error' });
                    }
                },
            });
        },
        [commit, displaySnack, eventId]
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

interface QuestionQueueProps {
    fragmentRef: useQuestionQueueFragment$key;
    isVisible: boolean;
}

export function QuestionQueue({ fragmentRef, isVisible }: QuestionQueueProps) {
    const theme = useTheme();
    const { displaySnack } = useSnack();
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const [queueIndex, setQueueIndex] = React.useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleQueueChange: SelectProps<number>['onChange'] = (e) => {
        e.preventDefault();
        // We already know this is a number,
        // the casting is required due to typescript types not merging correctly I believe
        setQueueIndex(e.target.value as unknown as number);
    };
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
    const [reorder] = useStyledQueue({ eventId });

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
                ?.sort(({ node: a }, { node: b }) => parseInt(a?.position) - parseInt(b?.position)) ?? [],
        [questionQueue]
    );
    const questionRecord = React.useMemo(
        () =>
            questionQueue?.questionRecord?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => parseInt(a?.position) - parseInt(b?.position)) ?? [],
        [questionQueue]
    );
    // const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
    // const canGoForward = React.useMemo(() => enqueuedQuestions.length > 0, [enqueuedQuestions]);
    const currentQuestion = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord[questionRecord.length - 1] : null),
        [questionRecord]
    );
    const prevQuestions = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord.slice(0, -1) : []), // removes current question from display in tab for previous questions
        [questionRecord]
    );

    //
    // ─── UTILITIES ──────────────────────────────────────────────────────────────────
    //

    const accessors = React.useMemo<Accessors<ArrayElement<typeof enqueuedQuestions>>[]>(
        () => [
            (q) => q?.node.question || '', // question text itself
            (q) => q?.node.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const prevAccessors = React.useMemo<Accessors<ArrayElement<typeof prevQuestions>>[]>(
        () => [
            (q) => q?.node.question || '', // question text itself
            (q) => q?.node.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(enqueuedQuestions, accessors);
    const [prevFilteredList, prevHandleSearch, prevHandleFilterChange] = useFilters(prevQuestions, prevAccessors);

    // need id at root of oject for dnd-kit sortable
    const processedList = React.useMemo(() => {
        return filteredList.map((question) => ({
            ...question,
            id: question.node.id,
        }));
    }, [filteredList]);

    const onDragStart = React.useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);

    const onDragEnd = React.useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            setActiveId(null);
            if (!over) return;
            if (active.id === over.id) return;
            if (filteredList.length !== enqueuedQuestions.length) {
                displaySnack('Cannot reorder while searching, please clear the search and try again.', {
                    variant: 'error',
                });
                return;
            }
            const oldIndex = enqueuedQuestions.findIndex((question) => question.node.id === active.id);
            const newIndex = enqueuedQuestions.findIndex((question) => question.node.id === over.id);
            reorder(enqueuedQuestions, oldIndex, newIndex, parseInt(currentQuestion?.node.position || '0'));
        },
        [currentQuestion?.node.position, displaySnack, enqueuedQuestions, filteredList.length, reorder]
    );

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container height={0} flex='1 1 100%'>
            <Grid item paddingTop='1rem' xs={12}>
                <Grid item container sx={{ paddingX: '0.5rem' }}>
                    <Select
                        value={queueIndex}
                        onChange={handleQueueChange}
                        sx={{
                            width: '7.5rem',
                            height: 'min-content',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 'small',
                            fontWeight: 600,
                            '& fieldset': {
                                borderRadius: '7px',
                            },
                        }}
                    >
                        <MenuItem
                            value={0}
                            sx={{ textTransform: 'uppercase', fontSize: 'small', fontWeight: 600, borderRadius: '5px' }}
                        >
                            Upcoming
                        </MenuItem>
                        <MenuItem
                            value={1}
                            sx={{ textTransform: 'uppercase', fontSize: 'small', fontWeight: 600, borderRadius: '5px' }}
                        >
                            Previous
                        </MenuItem>
                    </Select>
                    {/* TODO: add filter functionality */}
                    <IconButton sx={{ height: 'min-content', marginLeft: theme.spacing(0.5) }} size='large'>
                        <FilterListIcon />
                    </IconButton>
                    <ListFilter
                        style={{ flex: 1, marginLeft: theme.spacing(0.5) }}
                        onFilterChange={queueIndex === 0 ? () => handleFilterChange : () => prevHandleFilterChange}
                        onSearch={queueIndex === 0 ? handleSearch : prevHandleSearch}
                        isSearchOpen={true}
                        length={queueIndex === 0 ? filteredList.length : prevFilteredList.length}
                    />
                </Grid>
                {queueIndex === 0 ? (
                    <React.Fragment>
                        <Grid
                            sx={{
                                width: '100%',
                                paddingBottom: theme.spacing(2),
                                textAlign: 'center',
                                color: '#B5B5B5',
                            }}
                        >
                            <Typography variant='caption'>Drag and drop questions to re-order queue</Typography>
                        </Grid>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={onDragEnd}
                            onDragStart={onDragStart}
                            sensors={sensors}
                        >
                            <SortableContext items={processedList} strategy={verticalListSortingStrategy}>
                                {processedList.map((question) => (
                                    <SortableQuestion
                                        key={question.node.id}
                                        question={question}
                                        connections={connections}
                                    />
                                ))}
                            </SortableContext>
                            <DragOverlay>
                                {activeId ? (
                                    <SortableQuestion
                                        key={activeId}
                                        question={
                                            processedList.find(
                                                (question) => question.id === activeId
                                            ) as ProcessedQuestion
                                        }
                                        connections={connections}
                                    />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </React.Fragment>
                ) : (
                    <List>
                        {prevFilteredList.reverse().map((question) => (
                            <ListItem key={question.node.id} disableGutters>
                                <QuestionCard sx={{ width: '100%', paddingBottom: theme.spacing(2) }}>
                                    <QuestionAuthor fragmentRef={question.node} />
                                    {question.node.refQuestion && (
                                        <QuestionQuote fragmentRef={question.node.refQuestion} />
                                    )}
                                    <QuestionContent fragmentRef={question.node} />
                                    <QuestionStats fragmentRef={question.node} />
                                </QuestionCard>
                            </ListItem>
                        )) ?? []}
                    </List>
                )}
            </Grid>
        </Grid>
    );
}
