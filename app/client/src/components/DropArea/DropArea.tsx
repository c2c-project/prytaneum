/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Droppable, DroppableProvided, DroppableProps } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';

interface Props {
    getStyle?: (isDraggingOver: boolean) => React.CSSProperties;
    children: React.ReactNodeArray | React.ReactNode;
}

export default function DropArea(props: Omit<DroppableProps, 'children'> & Props) {
    const { children, getStyle, ...rest } = props;

    return (
        <Droppable {...rest}>
            {(provided: DroppableProvided) => (
                <Grid
                    container
                    direction='column'
                    // recommended method from the library maintainer itself
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    ref={provided.innerRef}
                    // also recommended method from the library
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.droppableProps}
                >
                    {children}
                    {provided.placeholder}
                </Grid>
            )}
        </Droppable>
    );
}

DropArea.defaultProps = {
    getStyle: undefined,
};
