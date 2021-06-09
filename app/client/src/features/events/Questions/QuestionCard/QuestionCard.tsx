/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { graphql, useFragment } from 'react-relay';
import clsx from 'clsx';

import type { QuestionCardFragment$key } from '@local/__generated__/QuestionCardFragment.graphql';
import { formatDate } from '@local/utils/format';
import QuestionStats from './QuestionStats';

export interface Props {
    fragmentRef: QuestionCardFragment$key;
    children?: React.ReactNode | React.ReactNodeArray;
    CardProps?: CardProps;
    CardHeaderProps?: CardHeaderProps;
    CardContentProps?: CardContentProps;
    style?: React.CSSProperties;
    className?: string;
    quote?: boolean;
    /**
     * display stats for this question
     */
    stats?: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

export const QUESTION_CARD_FRAGMENT = graphql`
    fragment QuestionCardFragment on EventQuestion {
        id
        question
        refQuestion {
            id
            question
            createdBy {
                id
                firstName
            }
            createdAt
        }
        createdBy {
            id
            firstName
        }
        createdAt
    }
`;

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
export function QuestionCard({
    fragmentRef,
    children,
    CardProps: cardProps,
    CardContentProps: cardContentProps,
    CardHeaderProps: cardHeaderProps,
    style,
    className,
    quote = false,
    stats,
}: Props) {
    const classes = useStyles();
    const question = useFragment(QUESTION_CARD_FRAGMENT, fragmentRef);
    // const question = React.useMemo(() => (quote ? questionData.refQuestion : questionData), [questionData, quote]);
    const [time, month] = React.useMemo(
        () => (question?.createdAt ? formatDate(question?.createdAt, 'p-P').split('-') : ['', '']),
        [question?.createdAt]
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

    if (!question) return <div>loading...</div>;

    return (
        <div className={clsx(className, classes.root)} style={style}>
            <Card {...cardProps}>
                <CardHeader
                    title={question?.createdBy?.firstName}
                    subheader={subheader}
                    avatar={<Avatar>{question?.createdBy?.firstName?.charAt(0)}</Avatar>}
                    {...cardHeaderProps}
                />
                <CardContent {...cardContentProps}>
                    <Typography>{question.question}</Typography>
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
