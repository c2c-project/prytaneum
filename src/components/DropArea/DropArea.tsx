import React from 'react';
import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    getStyle?: (isDraggingOver: boolean) => React.CSSProperties;
    dropId: string;
}

export default function DropArea({ children, getStyle, dropId }: Props) {
    return (
        <Droppable droppableId={dropId}>
            {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
            ) => {
                return (
                    <Card
                        // recommended method from the library maintainer itself
                        // eslint-disable-next-line @typescript-eslint/unbound-method
                        ref={provided.innerRef}
                        style={
                            getStyle
                                ? getStyle(snapshot.isDraggingOver)
                                : undefined
                        }
                        // also recommende method from the library
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...provided.droppableProps}
                    >
                        {children}
                        {provided.placeholder}
                    </Card>
                );
            }}
        </Droppable>
    );
}

DropArea.defaultProps = {
    getStyle: undefined,
};
