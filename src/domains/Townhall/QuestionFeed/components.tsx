import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Divider,
    Tooltip,
    Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import EditIcon from '@material-ui/icons/Edit';
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PushPinIcon from '@material-ui/icons/PushPin';

import { formatDate } from 'utils/format';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}));

interface QuestionProps {
    children: JSX.Element | string;
    user: string;
    timestamp: string;
    divider?: boolean;
    actionBar: JSX.Element;
}

interface QuestionLabelProps {
    labels: string[];
}

function QuestionLabels({ labels }: QuestionLabelProps) {
    return (
        <>
            {labels.map((label) => (
                <Chip key={label} label={label} />
            ))}
        </>
    );
}

export type UserAction = 'Like' | 'Modify Question' | 'Reply';
interface UserBarProps {
    onClick: (a: UserAction) => void;
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
                <Tooltip title='Modify Question'>
                    <IconButton onClick={() => onClick('Modify Question')}>
                        <EditIcon fontSize='small' />
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

export function ModBar() {
    return (
        <Grid container>
            <Grid container item xs={12}>
                <QuestionLabels labels={['Off topic', 'Asked', 'etc']} />
            </Grid>
            <Grid item xs={12} container justify='space-evenly'>
                <Grid item xs='auto'>
                    <Tooltip title='Queue Question'>
                        <IconButton>
                            <QueueIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs='auto'>
                    <Tooltip title='Remove From Queue'>
                        <IconButton>
                            <RemoveFromQueueIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}

export function Question({
    children,
    user,
    timestamp,
    divider,
    actionBar,
}: QuestionProps) {
    const date = React.useMemo(() => formatDate(timestamp, 'p-P'), [timestamp]);
    const [time, month] = date.split('-');
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2'>{user}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{children}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color='textSecondary'>
                    {time}
                    &nbsp; &middot; &nbsp;
                    {month}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {actionBar}
            </Grid>
            {divider && (
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            )}
        </Grid>
    );
}

Question.defaultProps = {
    divider: false,
};

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
