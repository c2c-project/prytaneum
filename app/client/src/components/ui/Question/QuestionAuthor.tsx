import { useMemo } from 'react';
import { Avatar, Typography, CardHeader, CardHeaderProps } from '@mui/material';
import { graphql, useFragment } from 'react-relay';

import type { QuestionAuthorFragment$key } from '@local/__generated__/QuestionAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';
import { getHashedColor } from '@local/core/getHashedColor';

export type QuestionAuthorProps = {
    fragmentRef: QuestionAuthorFragment$key;
} & CardHeaderProps;

export const QUESTION_AUTHOR_FRAGMENT = graphql`
    fragment QuestionAuthorFragment on EventQuestion {
        createdBy {
            id
            firstName
            lastName
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

    const authorName = useMemo(() => {
        let _authorName = 'Unknown User';
        if (authorData.createdBy && authorData.createdBy.firstName) {
            _authorName = authorData.createdBy.firstName;
            if (authorData.createdBy.lastName) _authorName = `${_authorName} ${authorData.createdBy.lastName}`;
        }
        return _authorName;
    }, [authorData.createdBy]);
    const avatarColor = useMemo(() => {
        return getHashedColor(authorName);
    }, [authorName]);

    return (
        <CardHeader
            // get first letter of name to display
            avatar={<Avatar sx={{ bgcolor: avatarColor }}>{authorName[0]}</Avatar>}
            title={<Typography>{authorName}</Typography>}
            subheader={subheader}
            {...props}
        />
    );
}
