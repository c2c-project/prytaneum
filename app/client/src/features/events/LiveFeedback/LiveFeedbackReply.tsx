import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LiveFeedbackReplyFragment$key } from '@local/__generated__/LiveFeedbackReplyFragment.graphql';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';



export const LIVE_FEEDBACK_REPLY_FRAGMENT = graphql`
    fragment LiveFeedbackReplyFragment on EventLiveFeedback {
        id
        message
        ...LiveFeedbackAuthorFragment
    }
`;

export interface Props {
    fragmentRef: LiveFeedbackReplyFragment$key;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export function LiveFeedbackReply({ fragmentRef, className }: Props) {
    const data = useFragment(LIVE_FEEDBACK_REPLY_FRAGMENT, fragmentRef);
    const classes = useStyles();

    return (
        <Card className={clsx(className, classes.root)} elevation={0}>
            <LiveFeedbackAuthor fragmentRef={data} />
            <CardContent>
                <Typography style={{ wordBreak: 'break-word' }}>
                    {data.message}
                </Typography>
            </CardContent>
        </Card>
    );
}
