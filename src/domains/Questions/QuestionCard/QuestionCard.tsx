/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Question } from 'prytaneum-typings';
import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Typography,
    CardProps,
    CardHeaderProps,
    CardContentProps,
} from '@material-ui/core';

import { formatDate } from 'utils/format';

export interface Props {
    question: Question;
    children?: React.ReactNode | React.ReactNodeArray;
    CardProps?: CardProps;
    CardHeaderProps?: CardHeaderProps;
    CardContentProps?: CardContentProps;
    style?: React.CSSProperties;
    className?: string;
    quote?: Question | null;
}

/**
 * Card is the root element
 */
function QuestionCard({
    question,
    children,
    CardProps: cardProps,
    CardContentProps: cardContentProps,
    CardHeaderProps: cardHeaderProps,
    style,
    className,
    quote,
}: Props) {
    const [time, month] = React.useMemo(
        () => formatDate(question.meta.createdAt, 'p-P').split('-'),
        [question.meta.createdAt]
    );
    const subheader = React.useMemo(
        () => (
            <Typography variant='caption' color='textSecondary'>
                {time}
                &nbsp; &middot; &nbsp;
                {month}
            </Typography>
        ),
        [time, month]
    );
    return (
        <Card raised style={style} className={className} {...cardProps}>
            <CardHeader
                title={question.meta.createdBy.name.first}
                subheader={subheader}
                avatar={
                    <Avatar>{question.meta.createdBy.name.first[0]}</Avatar>
                }
                {...cardHeaderProps}
            />
            {quote && (
                <QuestionCard
                    question={quote}
                    style={{ margin: '0 32px', border: '1px solid lightgrey' }}
                    CardProps={{ elevation: 0 }}
                />
            )}
            <CardContent {...cardContentProps}>
                <Typography>{question.question}</Typography>
            </CardContent>
            {children}
        </Card>
    );
}

QuestionCard.defaultProps = {
    children: undefined,
    CardProps: {},
    CardHeaderProps: {},
    CardContentProps: {},
    style: {},
    className: undefined,
};

export default React.memo(QuestionCard);
