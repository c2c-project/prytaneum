import React from 'react';

import type { Question } from 'prytaneum-typings';

import QuestionCard from '../QuestionCard';
import CustomLabel from './CustomLabel';

interface Props {
    question: Question;
    className?: string;
    style?: React.CSSProperties;
    current: boolean;
}

/**
 * static meaning this card cannot be dragged
 */
const StaticCard = ({ question, className, style, current }: Props) => {
    return (
        <QuestionCard
            key={question._id}
            CardHeaderProps={{
                action: undefined,
                avatar: undefined,
                subheader: undefined,
            }}
            className={className}
            question={question}
            style={style}
        >
            <CustomLabel key='ptr' isIn={current} />
        </QuestionCard>
    );
};

StaticCard.defaultProps = {
    className: undefined,
    style: undefined,
};

export default React.memo(StaticCard);
