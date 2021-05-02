import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import InviteForm from './InviteForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: '500px',
        maxWidth: '100%',
        padding: theme.spacing(3),
    },
}));

export default function Invite() {
    const classes = useStyles();
    return (
        <Container maxWidth='md'>
            <Paper className={classes.paper}>
                <InviteForm />
            </Paper>
        </Container>
    );
}
