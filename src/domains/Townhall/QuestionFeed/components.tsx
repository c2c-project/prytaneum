import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Tooltip,
    Chip,
    Container,
    Card,
    Zoom,
    CardContent,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PushPinIcon from '@material-ui/icons/PushPin';
import PlayIcon from '@material-ui/icons/PlayArrow';

import { QuestionProps } from '../QuestionFeedItem';
import { QuestionState } from '../types';

interface QuestionLabelProps {
    labels: string[];
}

function QuestionLabels({ labels }: QuestionLabelProps) {
    const theme = useTheme();
    return (
        <>
            {labels.map((label) => (
                <Grid
                    item
                    key={label}
                    style={{ paddingRight: theme.spacing(1) }}
                >
                    <Chip label={label} />
                </Grid>
            ))}
        </>
    );
}

export type UserActionTypes = 'Like' | 'Quote' | 'Reply';
interface UserBarProps {
    onClick: (a: UserActionTypes) => void;
}

export function UserBar({ onClick }: UserBarProps) {
    return (
        <Grid container justify='space-evenly'>
            <Grid item xs='auto'>
                <Tooltip title='Like'>
                    <IconButton onClick={() => onClick('Like')}>
                        <ThumbUpIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs='auto'>
                <Tooltip title='Quote'>
                    <IconButton onClick={() => onClick('Quote')}>
                        <QuoteIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs='auto'>
                <Tooltip title='Reply'>
                    <IconButton onClick={() => onClick('Reply')}>
                        <ReplyIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Grid>
            {/* <Grid item xs='auto'>
                <Tooltip title='More Options'>
                    <IconButton>
                        <VertMenu fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Grid> */}
        </Grid>
    );
}

export type ModActionTypes =
    | 'Set Current'
    | 'Remove From Queue'
    | 'Queue Question';

interface ModBarProps {
    questionState: QuestionState;
    onClick: (s: ModActionTypes) => void;
    labels: string[];
}

export function ModBar({ questionState, labels, onClick }: ModBarProps) {
    const getComponent = () => {
        if (questionState === 'IN_QUEUE') {
            return (
                <>
                    <Grid item xs='auto'>
                        <Tooltip title='Use as Current'>
                            <IconButton onClick={() => onClick('Set Current')}>
                                <PlayIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs='auto'>
                        <Tooltip title='Remove From Queue'>
                            <IconButton
                                onClick={() => onClick('Remove From Queue')}
                            >
                                <RemoveFromQueueIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </>
            );
        }
        if (questionState === 'ASKED') {
            return <div />;
        }
        if (questionState === 'CURRENT') {
            return <div />;
        }
        return (
            <Grid item xs='auto'>
                <Tooltip title='Queue Question'>
                    <IconButton onClick={() => onClick('Queue Question')}>
                        <QueueIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Grid>
        );
    };
    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={1}>
                <QuestionLabels labels={labels} />
            </Grid>
            <Grid item xs={12} container justify='space-evenly'>
                {getComponent()}
            </Grid>
        </Grid>
    );
}

interface CurrentQuestionProps {
    children: React.ReactElement<QuestionProps>;
}

export function CurrentQuestion({ children }: CurrentQuestionProps) {
    return (
        <Grid container style={{ backgroundColor: 'rgba(255,255,20,.1)' }}>
            <Grid item xs={12} container justify='center' alignItems='center'>
                <PushPinIcon fontSize='small' />
                <Typography variant='overline'>Current Question</Typography>
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

export function EmptyMessage() {
    return (
        <Zoom in>
            <Card>
                <CardContent>
                    <Typography variant='h5' paragraph align='center'>
                        Nothing to display here :(
                    </Typography>
                    <Typography variant='body1' align='center'>
                        Click or tap the button above to start asking questions!
                    </Typography>
                </CardContent>
            </Card>
        </Zoom>
    );
}
