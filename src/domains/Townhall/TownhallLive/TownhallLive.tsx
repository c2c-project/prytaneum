import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';

import Paper from 'components/Paper';
import VideoPlayer from 'components/VideoPlayer';
import Dialog, { DialogProps } from 'components/Dialog';
import { DeviceContext } from 'contexts/Device';
import QuestionForm from './TownhallQuestionForm';
import { TownhallContext } from '../Contexts/Townhall';

const useDesktopStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: theme.custom.borderRadius,
        padding: theme.spacing(3),
    },
}));

const useMobileStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingBottom: theme.spacing(3),
    },
    button: {
        padding: `0px ${theme.spacing(1)}px 0px ${theme.spacing(1)}px`,
    },
}));

interface LiveProps {
    onClickAsk: () => void;
}

function MobileLive({ onClickAsk }: LiveProps) {
    const townhall = React.useContext(TownhallContext);
    const classes = useMobileStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={classes.item}>
                    <VideoPlayer url={townhall.url} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={clsx([classes.button, classes.item])}
                >
                    <Button
                        onClick={onClickAsk}
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Ask a Question
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

function DesktopLive({ onClickAsk }: LiveProps) {
    const townhall = React.useContext(TownhallContext);
    const classes = useDesktopStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <VideoPlayer url={townhall.url} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={onClickAsk}
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Ask a Question
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
const useDialogStyles = makeStyles((theme) => ({
    spacing: {
        padding: theme.spacing(3),
    },
}));
type QuestionDialogProps = Omit<DialogProps, 'children'>;
function QuestionDialog(props: QuestionDialogProps) {
    const { open, onClose } = props;
    const [animEnded, setAnimEnded] = React.useState(false);
    const classes = useDialogStyles();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title='Question Form'
            onEntered={() => setAnimEnded(true)}
            onExit={() => setAnimEnded(false)}
        >
            <Container maxWidth='md'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.spacing} />
                        <QuestionForm focus={animEnded} />
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
}

export default function TownhallLive() {
    const device = React.useContext(DeviceContext);
    const [open, setOpen] = React.useState(false);
    const onClose = () => setOpen(false);
    const DialogWithProps = <QuestionDialog open={open} onClose={onClose} />;

    const onClickAsk = () => setOpen(true);
    switch (device) {
        case 'desktop':
            return (
                <>
                    <DesktopLive onClickAsk={onClickAsk} />
                    {DialogWithProps}
                </>
            );
        case 'mobile':
            return (
                <>
                    <MobileLive onClickAsk={onClickAsk} />
                    {DialogWithProps}
                </>
            );
        default:
            return (
                <>
                    <DesktopLive onClickAsk={onClickAsk} />
                    {DialogWithProps}
                </>
            );
    }
}
