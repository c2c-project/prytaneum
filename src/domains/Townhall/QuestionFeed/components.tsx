import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Divider,
    Tooltip,
    Chip,
    Button,
    Container
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import QueueIcon from '@material-ui/icons/Queue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PushPinIcon from '@material-ui/icons/PushPin';

import Dialog from 'components/Dialog';
import TextField from 'components/TextField';
import { formatDate } from 'utils/format';
import { Question as QuestionType } from '../types';

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

export type UserAction = 'Like' | 'Quote' | 'Reply';
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

interface QuestionFormProps {
    // eslint-disable-next-line react/require-default-props
    quote?: QuestionType;
    // eslint-disable-next-line react/require-default-props
    onSubmit?: () => void;
}

export function QuestionForm({ onSubmit, quote }: QuestionFormProps) {
    const [question, setQuestion] = React.useState('');
    const theme = useTheme();
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (onSubmit) onSubmit();
    }

    return (
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
                <Grid item xs={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disableElevation
                    >
                        Ask
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

interface AskQuestionProps {
    // eslint-disable-next-line react/require-default-props
    quote?: QuestionType;
    // eslint-disable-next-line react/require-default-props
    onSubmit?: () => void;
}

export function AskQuestion({ quote }: AskQuestionProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const theme = useTheme();

    function handleclose() {
        setIsOpen(false);
    }

    React.useEffect(() => {
        if (quote) setIsOpen(true);
    }, [quote]);

    return (
        <div>
            <Button
                variant='contained'
                color='primary'
                fullWidth
                disableElevation
                onClick={() => setIsOpen(true)}
            >
                Ask A Question
            </Button>
            <Dialog open={isOpen} onClose={handleclose}>
                <Container
                    maxWidth='sm'
                    style={{ paddingTop: theme.spacing(2) }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Question Form</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <QuestionForm onSubmit={() => setIsOpen(false)} />
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}

