import { useMemo } from 'react';
import { Avatar, Typography, CardHeader, CardHeaderProps } from '@mui/material';
import { graphql, useFragment } from 'react-relay';

import type { BroadcastMessageAuthorFragment$key } from '@local/__generated__/BroadcastMessageAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';

export const BROADCAST_MESSAGE_AUTHOR_FRAGMENT = graphql`
    fragment BroadcastMessageAuthorFragment on EventBroadcastMessage {
        createdBy {
            id
            firstName
            lastName
            avatar
        }
        createdAt
    }
`;

export type BroadcastMessageProps = {
    fragmentRef: BroadcastMessageAuthorFragment$key;
} & CardHeaderProps;

/**
 * Simple wrapper to CardHeader material ui component
 */
export function BroadcastMessageAuthor({ fragmentRef, ...props }: BroadcastMessageProps) {
    const authorData = useFragment(BROADCAST_MESSAGE_AUTHOR_FRAGMENT, fragmentRef);
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
            // get first letter of name to display
            avatar={<Avatar>{authorName[0]}</Avatar>}
            title={<Typography>{authorName} [Moderator]</Typography>}
            subheader={subheader}
            {...props}
        />
    );
}
