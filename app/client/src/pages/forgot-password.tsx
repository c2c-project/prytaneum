import React from 'react';
import { PasswordResetRequestForm } from '@local/features/accounts/PasswordResetRequestForm';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            // boxShadow: theme.shadows[10],
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: 0,
        },
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();

    return (
        <Grid container direction='column' className={classes.root} alignContent='center' justifyContent='center'>
            <Paper className={classes.paper}>
                <PasswordResetRequestForm onSuccess={() => null} onFailure={() => null} />
            </Paper>
        </Grid>
    );
}
