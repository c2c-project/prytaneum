import React from 'react';
import { CardHeader, useTheme, Grid } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';

import DropArea from 'components/DropArea';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import QueueControls from './QueueControls';
import DraggableList from './DraggableList';
import StaticList from './StaticList';
import useListStyles from './useListStyles';
import { updateQueueOrder, nextQuestion, prevQuestion } from '../api';

interface Props {
    questions: Question[];
    bufferLength: number;
    onFlushBuffer: () => void;
}

/**
 * abstracting most of the styling/generic logic away
 */
function useStyledQueue() {
    const theme = useTheme();
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
    return [reorder, getListStyle, itemStyle] as const;
}

function Queue({ questions: _questions, bufferLength, onFlushBuffer }: Props) {
    const [reorder, getListStyle, itemStyle] = useStyledQueue();
    const classes = useListStyles();
    const [townhall] = useTownhall();
    const [current, setCurrent] = React.useState(
        townhall.state.playlist.position.current
    );
    const [questions, setQuestions] = React.useState(_questions);
    const [hidePast, setHidePast] = React.useState(false);
    // const reorderEndpoint = React.useCallback(
    //     () => updateQueueOrder(townhall._id, questions),
    //     [townhall._id, questions]
    // );
    const goNextEndpoint = React.useCallback(() => nextQuestion(townhall._id), [
        townhall,
    ]);
    const goPrevEndpoint = React.useCallback(() => prevQuestion(townhall._id), [
        townhall,
    ]);
    // const [runUpdateQueue] = useEndpoint(reorderEndpoint, { minWaitTime: 0 });
    const [runNext] = useEndpoint(goNextEndpoint, { minWaitTime: 0 });
    const [runPrev] = useEndpoint(goPrevEndpoint, { minWaitTime: 0 });

    React.useEffect(() => {
        if (_questions.length !== questions.length) setQuestions(_questions);
    }, [_questions, questions]);

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const newState = reorder(
                questions,
                result.source.index,
                result.destination.index
            );
            // FIXME: just bad lol
            // eslint-disable-next-line no-void
            void updateQueueOrder(townhall._id, newState);
            setQuestions(newState);
        },
        [questions, reorder, townhall]
    );

    const handleClick = (dir: -1 | 1) => () => {
        if (dir === -1) runPrev();
        else runNext();
        if (current + dir >= questions.length) {
            return setCurrent(0);
        }
        if (current + dir < 0) return setCurrent(questions.length - 1);
        return setCurrent(current + dir);
    };

    const draggableCards = React.useMemo(() => questions.slice(current + 1), [
        questions,
        current,
    ]);
    const staticCards = React.useMemo(() => {
        if (hidePast) {
            if (questions[current]) return [questions[current]];
            return [];
        }
        return questions.slice(0, current + 1);
    }, [questions, current, hidePast]);

    return (
        <Grid container direction='column' wrap='nowrap'>
            <QueueControls
                onClickNext={handleClick(1)}
                onClickPrev={handleClick(-1)}
                className={classes.listItem}
                onClickRefresh={onFlushBuffer}
                bufferLength={bufferLength}
                onClickToggleVisibility={() => setHidePast(!hidePast)}
                hidePast={hidePast}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <DropArea getStyle={getListStyle} droppableId='droppable'>
                    <CardHeader
                        title='Queue'
                        titleTypographyProps={{
                            variant: 'h6',
                        }}
                    />
                    <StaticList questions={staticCards} />
                    <DraggableList
                        questions={draggableCards}
                        itemStyle={itemStyle}
                        offset={current + 1}
                    />
                </DropArea>
            </DragDropContext>
        </Grid>
    );
}

export default React.memo(Queue);
