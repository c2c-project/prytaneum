import React from 'react';
import { CardHeader, Grid } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';
import { useTheme } from '@material-ui/core/styles';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { QueueActions } from 'reducers';
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
    const reorder = React.useCallback((list: Question[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }, []);
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

function Queue({ questions, bufferLength, onFlushBuffer }: Props) {
    const [reorder, getListStyle, itemStyle] = useStyledQueue();
    const dispatch = useDispatch<Dispatch<QueueActions>>();
    const { current } = useSelector((state) => state.queue);
    const classes = useListStyles();
    const [townhall] = useTownhall();

    const [hidePast, setHidePast] = React.useState(false);

    const goNextEndpoint = React.useCallback(() => nextQuestion(townhall._id), [townhall]);
    const goPrevEndpoint = React.useCallback(() => prevQuestion(townhall._id), [townhall]);

    const [runNext] = useEndpoint(goNextEndpoint, { minWaitTime: 0 });
    const [runPrev] = useEndpoint(goPrevEndpoint, { minWaitTime: 0 });

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const newState = reorder(questions, result.source.index, result.destination.index);
            dispatch({ type: 'playlist-queue-order', payload: newState });
            // eslint-disable-next-line
            void updateQueueOrder(townhall._id, newState);
        },
        [questions, reorder, dispatch, townhall]
    );

    const handleClick = (dir: -1 | 1) => () => {
        if (dir === -1) runPrev();
        else runNext();
    };

    const draggableCards = React.useMemo(() => questions.slice(current + 1), [questions, current]);
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
                    <DraggableList questions={draggableCards} itemStyle={itemStyle} offset={current + 1} />
                </DropArea>
            </DragDropContext>
        </Grid>
    );
}

export default React.memo(Queue);
