import React from 'react';
import { Button, Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Dialog, { DialogProps } from 'components/Dialog';
import QuestionForm from './TownhallQuestionForm';

function EmptyMessage() {
    return (
        <Container maxWidth='xs'>
            <Typography variant='h5' component='div' align='center'>
                <p>Nothing to display here :(</p>
                <Typography variant='body1' align='center'>
                    Click or tap the button above to start asking questions!
                </Typography>
            </Typography>
        </Container>
    );
}

function MyQuestionsFeed() {
    return <EmptyMessage />;
}

const useDialogStyles = makeStyles((theme) => ({
    spacing: {
        padding: theme.spacing(3),
    },
}));

type QuestionDialogProps = Omit<DialogProps, 'children'>;
function QuestionDialog(props: QuestionDialogProps) {
    const { open, onClose } = props;
    const classes = useDialogStyles();

    return (
        <Dialog open={open} onClose={onClose} title='Question Form'>
            <Container maxWidth='md'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.spacing} />
                        <QuestionForm onSubmit={onClose} />
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
}

const useFeedStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '90%',
        marginLeft: '5%',
    },
}));

export default React.forwardRef(function MyQuestions(props, ref) {
    const [open, setOpen] = React.useState(false);
    const classes = useFeedStyles();

    return (
        <div className={classes.root} ref={ref}>
            <QuestionDialog open={open} onClose={() => setOpen(false)} />
            <Button
                className={classes.button}
                onClick={() => setOpen(true)}
                fullWidth
                variant='contained'
                color='primary'
            >
                Ask a Question
            </Button>
            <div className={classes.root}>
                <MyQuestionsFeed />
            </div>
        </div>
    );
});
