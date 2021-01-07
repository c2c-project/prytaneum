/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';
import clsx from 'clsx';

import StaticCard from './StaticCard';
import useListStyles from './useListStyles';

interface InnerProps {
    questions: Question[];
    className: string;
}

const StaticListInner = React.memo(({ questions, className }: InnerProps) => {
    return (
        <>
            {questions.map((question, idx) => (
                <StaticCard
                    key={question._id}
                    question={question}
                    className={className}
                    style={{
                        filter:
                            idx !== questions.length - 1
                                ? 'brightness(.7)'
                                : undefined,
                    }}
                    current={idx === questions.length - 1} // this is always the current question
                />
            ))}
        </>
    );
});

interface WrapperProps {
    questions: Question[];
}
/**
 * counterpart to draggable list
 */
export default React.memo(({ questions }: WrapperProps) => {
    const classes = useListStyles();
    return (
        <Droppable droppableId='disabled-area' isDropDisabled>
            {(provided: DroppableProvided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.listItem}
                >
                    {/* only re-render if the students array reference changes */}
                    <StaticListInner
                        questions={questions}
                        className={clsx([classes.card, classes.listItem])}
                    />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
});
