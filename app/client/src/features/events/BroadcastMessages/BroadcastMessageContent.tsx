import { graphql, useFragment } from 'react-relay';
import { CardContent, CardContentProps, Typography, TypographyProps } from '@mui/material';

import type { BroadcastMessageContentFragment$key } from '@local/__generated__/BroadcastMessageContentFragment.graphql';
export type BroadcastMessageContentProps = {
    fragmentRef: BroadcastMessageContentFragment$key;
    typographyProps?: TypographyProps;
} & CardContentProps;

export const BROADCAST_MESSAGE_CONTENT_FRAGMENT = graphql`
    fragment BroadcastMessageContentFragment on EventBroadcastMessage {
        broadcastMessage
    }
`;

export function BroadcastMessageContent({ fragmentRef, typographyProps = {}, ...props }: BroadcastMessageContentProps) {
    const broadcastMessageContentData = useFragment(BROADCAST_MESSAGE_CONTENT_FRAGMENT, fragmentRef);

    return (
        <CardContent {...props} sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
            <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                {broadcastMessageContentData.broadcastMessage}
            </Typography>
        </CardContent>
    );
}
