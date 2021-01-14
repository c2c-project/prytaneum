import React from 'react';
import { Avatar, Typography, Grid, Paper } from '@material-ui/core';
import AccountCirlceOutline from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';

import RegisterForm from 'domains/Auth/RegisterForm';
import history from 'utils/history';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
            marginTop: '-10vh',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 1),
            paddingTop: '10vh',
            height: '100%',
            borderRadius: 0,
        },
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

    return (
        <Grid
            container
            alignContent='center'
            className={classes.root}
            justify='center'
        >
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCirlceOutline />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Register
                </Typography>
                <div className={classes.form}>
                    <RegisterForm onSuccess={() => history.push('/app/home')} />
                </div>
            </Paper>
        </Grid>
    );
}
