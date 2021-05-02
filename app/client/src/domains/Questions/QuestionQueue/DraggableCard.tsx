import React from 'react';
import type { Question } from 'prytaneum-typings';

import DragArea from 'components/DragArea';
import QuestionCard from '../QuestionCard';
import useListStyles from './useListStyles';

interface Props {
    question: Question;
    index: number;
    itemStyle: (isDragging: boolean) => React.CSSProperties;
    isCurrent: boolean;
    draggable: boolean;
}

/**
 * renders a single draggable card
 */
export default React.memo(({ question, index, itemStyle, isCurrent, draggable }: Props) => {
    const classes = useListStyles();
    const getStyle: (d: boolean) => React.CSSProperties = React.useMemo(() => {
        if (draggable || isCurrent) return itemStyle;
        return (dragging) => ({
            ...itemStyle(dragging),
            filter: 'brightness(.7)',
        });
    }, [draggable, isCurrent, itemStyle]);
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
                    avatar: undefined,
                    subheader: undefined,
                }}
                className={classes.listItem}
                question={question}
                stats
            />
        </DragArea>
    );
});
