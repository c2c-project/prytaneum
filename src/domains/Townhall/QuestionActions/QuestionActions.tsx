import React from 'react';
import { Grid, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PlayIcon from '@material-ui/icons/PlayArrow';

const actions = {
    Like: <ThumbUpIcon fontSize='small' />,
    Quote: <QuoteIcon fontSize='small' />,
    Reply: <ReplyIcon fontSize='small' />,
    'Set Current': <PlayIcon fontSize='small' />,
    'Remove From Queue': <RemoveFromQueueIcon fontSize='small' />,
    'Queue Question': <QueueIcon fontSize='small' />,
};

interface Props<T> {
    // feels kinda dirty but w/e
    actionKeys: T[];
    onClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        key: T
    ) => void;
}

export default function QuestionActions<T extends keyof typeof actions>({
    actionKeys,
    onClick,
}: Props<T>) {
    return (
        <Grid container justify='space-evenly'>
            {actionKeys.map((key) => (
                <Grid item xs='auto' key={key} style={{ flexGrow: 1 }}>
                    <Button
                        color='inherit'
                        onClick={(e) => onClick(e, key)}
                        endIcon={actions[key]}
                        fullWidth
                    >
                        {key}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
}
