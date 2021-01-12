import React from 'react';
import { Typography, Avatar, Paper, Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';

import history from 'utils/history';
import ForgotPassRequestForm from 'domains/Auth/ForgotPassRequest';

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
            // boxShadow: theme.shadows[10],
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    nav: {
        paddingTop: theme.spacing(2),
    },
}));

export default function ForgotPassRequest() {
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
                    <RefreshIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Forgot Password
                </Typography>
                <div className={classes.form}>
                    <ForgotPassRequestForm
                        onSuccess={() => {
                            history.push('/login');
                        }}
                    />
                </div>
            </Paper>
        </Grid>
    );
}
