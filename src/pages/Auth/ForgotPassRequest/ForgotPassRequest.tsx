import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';

import history from 'utils/history';
import ForgotPassRequestForm from 'domains/Auth/ForgotPassRequest';

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

export default function ForgotPassRequest() {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <RefreshIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Forgot Password
            </Typography>
            <div className={classes.form}>
                <ForgotPassRequestForm
                    onSuccess={() => {
                        history.push('/auth/login');
                    }}
                />
            </div>
        </div>
    );
}
