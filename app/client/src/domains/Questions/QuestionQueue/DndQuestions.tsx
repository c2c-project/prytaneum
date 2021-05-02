import React from 'react';
import { DialogContent, Container, Typography } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';
import { useTheme } from '@material-ui/core/styles';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { QueueActions } from 'reducers';
import DropArea from 'components/DropArea';
import useTownhall from 'hooks/useTownhall';
import DraggableList from './DraggableList';
import { updateQueueOrder } from '../api';

interface Props {
    queue: Question[];
    position: number;
    // bufferLength: number;
    // onFlushBuffer: () => void;
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

function DndQuestions({ queue, position }: Props) {
    const [reorder, getListStyle, itemStyle] = useStyledQueue();
    const dispatch = useDispatch<Dispatch<QueueActions>>();
    const [townhall] = useTownhall();
    const unaskedQuestions = React.useMemo(() => queue.slice(position + 1), [queue, position]);
    const askedQuestions = React.useMemo(() => queue.slice(0, position + 1), [queue, position]);

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const newState = reorder(unaskedQuestions, result.source.index, result.destination.index);
            dispatch({ type: 'playlist-queue-order', payload: [...askedQuestions, ...newState] });

            // eslint-disable-next-line
            void updateQueueOrder(townhall._id, [...askedQuestions, ...newState]);
        },
        [askedQuestions, unaskedQuestions, reorder, dispatch, townhall]
    );

    return (
        <DialogContent style={{ overflowY: 'scroll' }}>
            <Container maxWidth='md'>
                {unaskedQuestions.length > 0 ? (
                    <>
                        <Typography align='center'>Drag and drop the questions below to reorder</Typography>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <DropArea getStyle={getListStyle} droppableId='droppable'>
                                <DraggableList questions={unaskedQuestions} itemStyle={itemStyle} />
                            </DropArea>
                        </DragDropContext>
                    </>
                ) : (
                    <Typography>No questions to display</Typography>
                )}
            </Container>
        </DialogContent>
    );
}

export default React.memo(DndQuestions);
