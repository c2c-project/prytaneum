import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useRouter } from 'next/router';
import { PasswordResetForm } from '@local/features/accounts/PasswordResetForm';

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

export default function ForgotPasswordReset() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <Grid container direction='column' className={classes.root} alignContent='center' justifyContent='center'>
            <Paper className={classes.paper}>
                <PasswordResetForm
                    onSuccess={() => router.push('/login')}
                    onFailure={() => router.push('/forgot-password')}
                    token={router.query.token}
                    tokenReady={router.isReady}
                />
            </Paper>
        </Grid>
    );
}
