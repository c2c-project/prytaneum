/* eslint-disable @typescript-eslint/unbound-method */ // looked at source code, using how they recommend
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';

import DropArea from '../DropArea';
import DragArea from '../DragArea';

// fake data generator
const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

export default function DndList() {
    const theme = useTheme();
    const [state, setState] = React.useState({ items: getItems(10) });
    const reorder = React.useCallback((list: ReturnType<typeof getItems>, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }, []);

    const getListStyle = React.useCallback(
        (isDraggingOver: boolean): React.CSSProperties => ({
            background: isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: theme.spacing(2),
            width: 250,
            borderRadius: theme.custom.borderRadius,
            boxShadow: theme.shadows[10],
        }),
        [theme]
    );

    const itemStyle = React.useCallback(
        (isDragging: boolean): React.CSSProperties => ({
            userSelect: 'none',
            margin: theme.spacing(0, 0, 2, 0),
            filter: isDragging ? `drop-shadow(0 0 .75rem ${theme.palette.secondary.light})` : '',
        }),
        [theme]
    );

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const items = reorder(state.items, result.source.index, result.destination.index);

            setState({
                items,
            });
        },
        [state, reorder]
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DropArea getStyle={getListStyle} droppableId='droppable'>
                <CardHeader
                    title='Suggested'
                    titleTypographyProps={{
                        variant: 'h6',
                    }}
                    action={
                        <IconButton aria-label='settings'>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                {state.items.map((item, index) => (
                    <DragArea key={item.id} draggableId={item.id} index={index} getStyle={itemStyle}>
                        <Card>
                            <CardContent>{item.content}</CardContent>
                        </Card>
                    </DragArea>
                ))}
            </DropArea>
        </DragDropContext>
    );
}
