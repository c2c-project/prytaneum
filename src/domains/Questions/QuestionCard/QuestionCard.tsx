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
    Paper,
    Divider,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import { formatDate } from 'utils/format';
import QuestionStats from './QuestionStats';

export interface Props {
    question: Question;
    children?: React.ReactNode | React.ReactNodeArray;
    CardProps?: CardProps;
    CardHeaderProps?: CardHeaderProps;
    CardContentProps?: CardContentProps;
    style?: React.CSSProperties;
    className?: string;
    quote?: Question | null;
    /**
     * display stats for this question
     */
    stats?: boolean;
}

export function QuestionCardSkeleton() {
    return (
        <Paper style={{ width: '100%', padding: 8, marginBottom: 8 }}>
            <Skeleton variant='circle' width={40} height={40} style={{ marginBottom: 12 }} />
            <Skeleton variant='rect' width='100%' height={118} />
        </Paper>
    );
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
    stats,
}: Props) {
    const theme = useTheme();
    const [time, month] = React.useMemo(() => formatDate(question.meta.createdAt, 'p-P').split('-'), [
        question.meta.createdAt,
    ]);
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
        <div className={className} style={style}>
            <Card {...cardProps}>
                <CardHeader
                    title={question.meta.createdBy.name.first}
                    subheader={subheader}
                    avatar={<Avatar>{question.meta.createdBy.name.first[0]}</Avatar>}
                    {...cardHeaderProps}
                />
                {quote && (
                    <QuestionCard
                        question={quote}
                        style={{
                            margin: '0 32px',
                            border: '1px solid lightgrey',
                            borderRadius: theme.shape.borderRadius,
                        }}
                        CardProps={{ elevation: 0 }}
                    />
                )}
                <CardContent {...cardContentProps}>
                    <Typography>{question.question}</Typography>
                    {stats && (
                        <>
                            <Divider />
                            <QuestionStats question={question} />
                        </>
                    )}
                </CardContent>
                {children}
            </Card>
        </div>
    );
}

QuestionCard.defaultProps = {
    children: undefined,
    CardProps: {},
    CardHeaderProps: {},
    CardContentProps: {},
    style: {},
    className: undefined,
    stats: false,
};

export default React.memo(QuestionCard);
