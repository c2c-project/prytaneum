import React from 'react';
import { Link as MUILink, Grid, Typography, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from 'domains/Auth/LoginForm';

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

interface Props {
    onLogin: () => void;
    registerRoute: string;
    forgotPassRoute: string;
}

export default function Login({
    onLogin,
    registerRoute,
    forgotPassRoute,
}: Props) {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Sign in
            </Typography>
            <div className={classes.form}>
                <LoginForm onSuccess={onLogin} />
            </div>
            <Grid container className={classes.nav}>
                <Grid item xs>
                    <MUILink
                        href={forgotPassRoute}
                        variant='body2'
                        component='a'
                    >
                        Forgot password?
                    </MUILink>
                </Grid>
                <Grid item>
                    <MUILink
                        href={registerRoute}
                        variant='body2'
                        component='a'
                    >
                        Don&#39;t have an account? Sign Up
                    </MUILink>
                </Grid>
            </Grid>
        </div>
    );
}
