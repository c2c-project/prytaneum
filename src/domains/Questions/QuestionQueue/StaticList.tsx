/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';
import { AnimateSharedLayout } from 'framer-motion';
import clsx from 'clsx';

import StaticCard from './StaticCard';
import useListStyles from './useListStyles';

interface SharedProps {
    questions: Question[];
}

const StaticListInner = React.memo(
    ({ questions }: SharedProps) => {
        const classes = useListStyles();
        return (
            <AnimateSharedLayout>
                {questions.map((question, idx) => (
                    <StaticCard
                        key={question._id}
                        question={question}
                        className={clsx([classes.card, classes.listItem])}
                        style={{
                            filter:
                                idx !== questions.length - 1
                                    ? 'brightness(.7)'
                                    : undefined,
                        }}
                        current={idx === questions.length - 1} // this is always the current question
                    />
                ))}
            </AnimateSharedLayout>
        );
    },
    /**
     * somewhat clever; all that should ever change is the size,
     * so we can just compare to know if we should update
     */
    (prevProps, nextProps) =>
        prevProps.questions.length === nextProps.questions.length
);

/**
 * counterpart to draggable list
 */
export const StaticListWrapper = React.memo(({ questions }: SharedProps) => {
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
                    <StaticListInner questions={questions} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
});

export default StaticListWrapper;
