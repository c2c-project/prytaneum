/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import AccountCirlceOutline from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';

import RegisterForm from 'domains/Auth/RegisterForm';
import history from 'utils/history';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
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

export default function RegisterPage() {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <AccountCirlceOutline />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Register
            </Typography>
            <div className={classes.form}>
                <RegisterForm
                    onSuccess={() => history.push('/login')}
                    onFailure={() => history.push('/login')}
                />
            </div>
        </div>
    );
}
