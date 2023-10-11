import React, { useMemo } from 'react';
import { Avatar, Typography, CardHeader, CardHeaderProps } from '@mui/material';
import { graphql, useFragment } from 'react-relay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import type { LiveFeedbackAuthorFragment$key } from '@local/__generated__/LiveFeedbackAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';

export type LiveFeedbackAuthorProps = {
    fragmentRef: LiveFeedbackAuthorFragment$key;
} & CardHeaderProps;

export const LIVE_FEEDBACK_AUTHOR_FRAGMENT = graphql`
    fragment LiveFeedbackAuthorFragment on EventLiveFeedback @argumentDefinitions(eventId: { type: "ID!" }) {
        createdBy {
            id
            firstName
            lastName
            avatar
            moderatorOf(eventId: $eventId)
        }
        createdAt
    }
`;

/**
 * Simple wrapper to CardHeader material ui component
 */
export function LiveFeedbackAuthor({ fragmentRef, ...props }: LiveFeedbackAuthorProps) {
    const authorData = useFragment(LIVE_FEEDBACK_AUTHOR_FRAGMENT, fragmentRef);
    const isModerator = authorData.createdBy?.moderatorOf === true;
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
    // make author name given available data
    const createAuthorName = () => {
        let authorName = 'Unknown User';
        if (authorData.createdBy && authorData.createdBy.firstName) {
            authorName = authorData.createdBy.firstName;
            if (authorData.createdBy.lastName) authorName = `${authorName} ${authorData.createdBy.lastName}`;
        }
        return authorName;
    };
    const authorName = createAuthorName();

    return (
        <CardHeader
            // get first letter of name to use as avatar
            avatar={<Avatar>{authorName[0]}</Avatar>}
            title={
                <React.Fragment>
                    <Typography>
                        {isModerator && <VerifiedUserIcon fontSize='small' />}
                        {authorName}
                    </Typography>
                </React.Fragment>
            }
            subheader={subheader}
            {...props}
        />
    );
}
