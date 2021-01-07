/* eslint-disable @typescript-eslint/unbound-method */ // looked at source code, using how they recommend
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    CardHeader,
    useTheme,
    Grid,
    IconButton,
    Card,
    CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    DragDropContext,
    DropResult,
    Droppable,
    DroppableProvided,
} from 'react-beautiful-dnd';
import { motion, AnimateSharedLayout } from 'framer-motion';
import type { Question } from 'prytaneum-typings';
import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import clsx from 'clsx';

import DropArea from 'components/DropArea';
import DragArea from 'components/DragArea';
import CurrQuestionLabel from '../CurrQuestionLabel';
import QuestionCard from '../QuestionCard';

interface Props {
    questions: Question[];
}
const useStyles = makeStyles((theme) => ({
    card: {
        position: 'relative',
        overflow: 'visible',

        // NOTE: leaving this here so that this comment makes sense
        // setting margin here will cause the drop to hang for a bit
        // instead set the margin on the dragarea
        // margin: 7,
    },
    item: {
        marginBottom: theme.spacing(3),
    },
}));

const MovingPointer = React.memo(
    function ({ isIn }: { isIn: boolean }) {
        return (
            <div>
                {isIn && (
                    <motion.div
                        layoutId='question-queue'
                        initial={false}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            flex: 0,
                            top: -16,
                        }}
                        transition={{ ease: 'easeInOut' }}
                    >
                        <CurrQuestionLabel />
                    </motion.div>
                )}
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.isIn === nextProps.isIn
);

const DraggableCard = React.memo(
    ({
        question,
        index,
        itemStyle,
        cardStyle,
        isCurrent,
        draggable,
    }: {
        question: Question;
        index: number;
        itemStyle: (isDragging: boolean) => React.CSSProperties;
        cardStyle: string;
        isCurrent: boolean;
        draggable: boolean;
    }) => {
        const getStyle: (
            d: boolean
        ) => React.CSSProperties = React.useMemo(() => {
            if (draggable || isCurrent) return itemStyle;
            return (dragging) => ({
                ...itemStyle(dragging),
                filter: 'brightness(.7)',
            });
        }, [draggable, isCurrent]);
        const icon: React.ReactNode = React.useMemo(() => {
            if (!draggable || isCurrent) return undefined;
            return <DragHandleIcon />;
        }, [draggable, isCurrent]);
        return (
            <DragArea
                key={question._id}
                draggableId={question._id}
                index={index}
                getStyle={getStyle}
                isDragDisabled={!draggable}
            >
                <QuestionCard
                    CardHeaderProps={{
                        action: icon,
                        avatar: undefined,
                        subheader: undefined,
                    }}
                    className={cardStyle}
                    question={question}
                >
                    <MovingPointer key='ptr' isIn={isCurrent} />
                </QuestionCard>
            </DragArea>
        );
    }
);

const Controls = React.memo(
    ({
        onClickNext,
        onClickPrev,
        className,
    }: {
        onClickNext: () => void;
        onClickPrev: () => void;
        className: string;
    }) => {
        return (
            <Card className={className}>
                <CardHeader title='Controls' />
                <CardActions>
                    <IconButton onClick={onClickPrev}>
                        <PrevIcon />
                    </IconButton>
                    <IconButton onClick={onClickNext}>
                        <NextIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
);

const DraggableCards = React.memo(
    ({
        questions,
        itemStyle,
        className,
        offset,
    }: {
        questions: Question[];
        itemStyle: (d: boolean) => React.CSSProperties;
        className: string;
        offset: number;
    }) => {
        return (
            <>
                {questions.map((question, index) => (
                    <DraggableCard
                        key={question._id}
                        question={question}
                        cardStyle={className}
                        isCurrent={false}
                        itemStyle={itemStyle}
                        index={index + offset}
                        draggable
                    />
                ))}
            </>
        );
    }
);

const NotDraggableCards = React.memo(
    ({
        questions,
        className,
    }: {
        questions: Question[];
        className: string;
    }) => {
        return (
            <>
                {questions.map((question, idx) => (
                    <QuestionCard
                        key={question._id}
                        CardHeaderProps={{
                            action: undefined,
                            avatar: undefined,
                            subheader: undefined,
                        }}
                        className={className}
                        question={question}
                        style={{
                            filter:
                                idx !== questions.length - 1
                                    ? 'brightness(.7)'
                                    : undefined,
                        }}
                    >
                        <MovingPointer
                            key='ptr'
                            isIn={idx === questions.length - 1}
                        />
                    </QuestionCard>
                ))}
            </>
        );
    }
);

export default function DndList({ questions }: Props) {
    const theme = useTheme();
    const classes = useStyles();
    const [current, setCurrent] = React.useState(0);
    const [state, setState] = React.useState(questions);
    const reorder = React.useCallback(
        (list: Question[], startIndex: number, endIndex: number) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        },
        []
    );

    const getListStyle = React.useCallback(
        (isDraggingOver: boolean): React.CSSProperties => ({
            background: isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: theme.spacing(2),
            // width: 320,
            borderRadius: theme.custom.borderRadius,
            boxShadow: theme.shadows[10],
        }),
        [theme]
    );

    const itemStyle = React.useCallback(
        (isDragging: boolean): React.CSSProperties => ({
            userSelect: 'none',
            margin: theme.spacing(0, 0, 4, 0),
            filter: isDragging
                ? `drop-shadow(0 0 .75rem ${theme.palette.secondary.light})`
                : '',
        }),
        [theme]
    );

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const newState = reorder(
                state,
                result.source.index,
                result.destination.index
            );

            if (result.source.index !== current) {
                // if the destination is after or where the current pointer is,
                // and the source is before where the point is,
                // decrement the pointer
                if (
                    result.destination.index >= current &&
                    result.source.index < current
                )
                    setCurrent((prev) => prev - 1);
                // if the destination is before or equal to where
                // the current pointer is and the source is after
                // the current pointer, increment pointer
                else if (
                    result.destination.index <= current &&
                    result.source.index > current
                )
                    setCurrent((prev) => prev + 1);
            } else setCurrent(result.destination.index);

            setState(newState);
        },
        [state, reorder]
    );

    const handleClick = (dir: -1 | 1) => () => {
        if (current + dir >= state.length) return setCurrent(0);
        if (current + dir < 0) return setCurrent(state.length - 1);
        return setCurrent(current + dir);
    };

    const draggableCards = React.useMemo(() => state.slice(current + 1), [
        state,
        current,
    ]);
    const notDraggableCards = React.useMemo(() => state.slice(0, current + 1), [
        state,
        current,
    ]);

    return (
        <Grid container direction='column' wrap='nowrap'>
            <Controls
                onClickNext={handleClick(1)}
                onClickPrev={handleClick(-1)}
                className={classes.item}
            />
            <div style={{ paddingBottom: theme.spacing(3) }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <DropArea getStyle={getListStyle} droppableId='droppable'>
                        <AnimateSharedLayout>
                            <CardHeader
                                title='Queue'
                                titleTypographyProps={{
                                    variant: 'h6',
                                }}
                            />
                            <Droppable
                                droppableId='disabled-area'
                                isDropDisabled
                            >
                                {(provided: DroppableProvided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={classes.item}
                                    >
                                        {/* only re-render if the students array reference changes */}
                                        <NotDraggableCards
                                            questions={notDraggableCards}
                                            className={clsx([
                                                classes.card,
                                                classes.item,
                                            ])}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <DraggableCards
                                questions={draggableCards}
                                itemStyle={itemStyle}
                                className={classes.card}
                                offset={current + 1}
                            />
                        </AnimateSharedLayout>
                    </DropArea>
                </DragDropContext>
            </div>
        </Grid>
    );
}
