/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';

type Props = Omit<DraggableProps, 'children'> & {
    children: React.ReactNode | React.ReactNodeArray;
    getStyle?: (isDragging: boolean) => React.CSSProperties;
};

/**
 * all eslint ignores are due to implementation recommended from library
 */
export default function DragArea({ children, getStyle, ...rest }: Props) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Draggable {...rest}>
            {(innerProvided, innerSnapshot) => (
                <div
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    ref={innerProvided.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...innerProvided.draggableProps}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...innerProvided.dragHandleProps}
                    style={
                        getStyle
                            ? {
                                  ...getStyle(innerSnapshot.isDragging),
                                  ...innerProvided.draggableProps.style,
                              }
                            : innerProvided.draggableProps.style
                    }
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
}

DragArea.defaultProps = {
    getStyle: undefined,
};
