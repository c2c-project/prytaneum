import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    IconButton,
    Divider,
    Tooltip,
    Chip,
    Button,
    Container,
    Popper,
    ClickAwayListener,
    Paper,
} from '@material-ui/core';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PushPinIcon from '@material-ui/icons/PushPin';
import PlayIcon from '@material-ui/icons/PlayArrow';

import TextField from 'components/TextField';
import { formatDate } from 'utils/format';
import { Question as QuestionType, QuestionState } from '../types';

const useStyles = makeStyles<Theme, Pick<QuestionProps, 'isModerator'>>(
    (theme) => ({
        root: {
            padding: theme.spacing(1),
        },
        user: ({ isModerator }) => ({
            cursor: isModerator ? 'pointer' : 'auto',
        }),
        paper: {
            padding: theme.spacing(1),
        },
    })
);

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

interface QuestionProps {
    children: JSX.Element | string;
    user: string;
    timestamp: string;
    divider?: boolean;
    actionBar: JSX.Element;
    isModerator?: boolean;
}

export function Question({
    children,
    user,
    timestamp,
    divider,
    actionBar,
    isModerator,
}: QuestionProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(
        null
    );
    const date = React.useMemo(() => formatDate(timestamp, 'p-P'), [timestamp]);
    const [time, month] = date.split('-');
    const classes = useStyles({ isModerator });
    // TODO: optimize -- each question has it's own instance of popper, which is inefficient
    return (
        <Grid container className={classes.root} spacing={1}>
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement='bottom'
            >
                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                    <Paper className={classes.paper}>
                        TODO: User Profile todo with mod actions possibly
                    </Paper>
                </ClickAwayListener>
            </Popper>
            <Grid item xs={12}>
                <Typography
                    onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
                    className={classes.user}
                    variant='subtitle2'
                >
                    {user}
                </Typography>
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
    isModerator: undefined,
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

interface QuestionFormProps {
    quote?: QuestionType;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export function QuestionForm({ onSubmit, quote, onCancel }: QuestionFormProps) {
    const [question, setQuestion] = React.useState('');
    const theme = useTheme();
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (onSubmit) onSubmit();
    }

    function handleCancel() {
        if (onCancel) onCancel();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h4'>Question Form</Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label='Your Question...'
                                autoFocus
                                multiline
                                value={question}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setQuestion(value);
                                }}
                            />
                        </Grid>
                        {quote && (
                            <Grid container item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: '25px',
                                    }}
                                >
                                    <Question
                                        user={quote.meta.user.name}
                                        timestamp={quote.meta.timestamp}
                                        actionBar={<div />}
                                    >
                                        {quote.question}
                                    </Question>
                                </Grid>
                            </Grid>
                        )}
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                type='submit'
                                color='primary'
                                disableElevation
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <div style={{ padding: theme.spacing(0, 1) }} />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disableElevation
                            >
                                Ask
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

QuestionForm.defaultProps = {
    quote: '',
    onSubmit: undefined,
    onCancel: undefined,
};

QuestionForm.propTypes = {
    quote: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};

export function EmptyMessage() {
    return (
        <Container maxWidth='sm'>
            <Typography variant='h5' component='div' align='center'>
                <p>Nothing to display here :(</p>
                <Typography variant='body1' align='center'>
                    Click or tap the button above to start asking questions!
                </Typography>
            </Typography>
        </Container>
    );
}

interface ReplyFormProps {
    reply: QuestionType;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export function ReplyForm({ reply, onSubmit, onCancel }: ReplyFormProps) {
    const [question, setQuestion] = React.useState('');
    const theme = useTheme();
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (onSubmit) onSubmit();
    }

    function handleCancel() {
        if (onCancel) onCancel();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h4'>{`Reply to ${reply.meta.user.name}`}</Typography>
                {reply && (
                    <Typography variant='body2'>
                        This will not show up in the normal question feed. If
                        you meant to quote this person while asking your own
                        question, then click on the
                        <QuoteIcon fontSize='small' />
                        instead of the
                        <ReplyIcon fontSize='small' />
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item xs={12}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: '25px',
                                }}
                            >
                                <Question
                                    user={reply.meta.user.name}
                                    timestamp={reply.meta.timestamp}
                                    actionBar={<div />}
                                >
                                    {reply.question}
                                </Question>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Your Reply...'
                                autoFocus
                                multiline
                                value={question}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setQuestion(value);
                                }}
                            />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                type='submit'
                                color='primary'
                                disableElevation
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <div style={{ padding: theme.spacing(0, 1) }} />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disableElevation
                            >
                                Reply
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

ReplyForm.defaultProps = {
    onSubmit: undefined,
    onCancel: undefined,
};

ReplyForm.propTypes = {
    reply: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};
