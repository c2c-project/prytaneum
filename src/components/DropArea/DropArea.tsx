/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DroppableProps,
} from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';

interface Props {
    getStyle?: (isDraggingOver: boolean) => React.CSSProperties;
    children: React.ReactNodeArray | React.ReactNode;
}

export default function DropArea(
    props: Omit<DroppableProps, 'children'> & Props
) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { children, getStyle, ...rest } = props;
    return (
        <Droppable {...rest}>
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
