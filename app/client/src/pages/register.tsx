import * as React from 'react';
import { Avatar, Typography, Grid, Paper } from '@material-ui/core';
import AccountCirlceOutline from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { RegisterForm } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        maxWidth: 425,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <Grid container alignContent='center' className={classes.root} justify='center'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCirlceOutline />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Register
                </Typography>
                <div className={classes.form}>
                    <RegisterForm onSuccess={() => router.push('/app/home')} />
                </div>
            </Paper>
        </Grid>
    );
}
