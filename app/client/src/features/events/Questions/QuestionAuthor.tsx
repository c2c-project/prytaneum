import { useMemo } from 'react';
import { Typography, CardHeader, CardHeaderProps } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';

import type { QuestionAuthorFragment$key } from '@local/__generated__/QuestionAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';

export type QuestionAuthorProps = {
    fragmentRef: QuestionAuthorFragment$key;
} & CardHeaderProps;

export const QUESTION_AUTHOR_FRAGMENT = graphql`
    fragment QuestionAuthorFragment on EventQuestion {
        createdBy {
            id
            firstName
            avatar
        }
        createdAt
    }
`;

/**
 * Simple wrapper to CardHeader material ui component
 */
export function QuestionAuthor({ fragmentRef, ...props }: QuestionAuthorProps) {
    const authorData = useFragment(QUESTION_AUTHOR_FRAGMENT, fragmentRef);
    const [time, month] = useMemo(() => {
        if (authorData.createdAt) return formatDate(authorData.createdAt, 'p-P').split('-');
        return ['', ''];
    }, [authorData]);
    const subheader = useMemo(
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
        <CardHeader
            title={<Typography>{authorData.createdBy?.firstName ?? 'Unknown User'}</Typography>}
            subheader={subheader}
            {...props}
        />
    );
}
