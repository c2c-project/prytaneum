import { useMemo } from 'react';
import { Typography, CardHeader, CardHeaderProps } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';

import type { LiveFeedbackAuthorFragment$key } from '@local/__generated__/LiveFeedbackAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';

export type LiveFeedbackAuthorProps = {
    fragmentRef: LiveFeedbackAuthorFragment$key;
} & CardHeaderProps;

export const LIVE_FEEDBACK_AUTHOR_FRAGMENT = graphql`
    fragment LiveFeedbackAuthorFragment on EventLiveFeedback {
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
export function LiveFeedbackAuthor({ fragmentRef, ...props }: LiveFeedbackAuthorProps) {
    const authorData = useFragment(LIVE_FEEDBACK_AUTHOR_FRAGMENT, fragmentRef);
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
