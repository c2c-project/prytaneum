import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { Card, CardContent, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { LiveFeedbackReplyFragment$key } from '@local/__generated__/LiveFeedbackReplyFragment.graphql';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';

export const LIVE_FEEDBACK_REPLY_FRAGMENT = graphql`
    fragment LiveFeedbackReplyFragment on EventLiveFeedback @argumentDefinitions(eventId: { type: "ID!" }) {
        id
        message
        ...LiveFeedbackAuthorFragment @arguments(eventId: $eventId)
    }
`;

export interface Props {
    fragmentRef: LiveFeedbackReplyFragment$key;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 2, 2, 2),
        border: `1px solid ${theme.palette.divider}`,
    },
    content: {
        margin: theme.spacing(-2, 0, 0, 0),
    },
}));

export function LiveFeedbackReply({ fragmentRef, className }: Props) {
    const data = useFragment(LIVE_FEEDBACK_REPLY_FRAGMENT, fragmentRef);
    const classes = useStyles();

    return (
        <Card className={clsx(className, classes.root)} elevation={0}>
            <LiveFeedbackAuthor fragmentRef={data} />
            <CardContent className={classes.content}>
                <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                    {data.message}
                </Typography>
            </CardContent>
        </Card>
    );
}
