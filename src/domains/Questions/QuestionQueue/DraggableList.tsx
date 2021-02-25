import React from 'react';

import type { Question } from 'prytaneum-typings';

import DraggableCard from './DraggableCard';

interface Props {
    questions: Question[];
    itemStyle: (d: boolean) => React.CSSProperties;
}

/**
 * counterpart to static list although it is slightly different
 * in functionality, the "droppablearea" component is higher up in the tree already
 * so all we need to do here is map over the items
 */
export default React.memo(({ questions, itemStyle }: Props) => {
    return (
        <>
            {questions.map((question, index) => (
                <DraggableCard
                    key={question._id}
                    question={question}
                    isCurrent={false}
                    itemStyle={itemStyle}
                    index={index}
                    draggable
                />
            ))}
        </>
    );
});
