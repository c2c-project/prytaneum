import React from 'react';
import { Grid, Typography, Avatar, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from 'domains/Auth/LoginForm';
import useIsMounted from 'hooks/useIsMounted';
import useUser from 'hooks/useUser';

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    nav: {
        paddingTop: theme.spacing(2),
    },
}));

interface Props {
    onLogin?: () => void;
}

export default function Login({ onLogin }: Props) {
    const classes = useStyles();
    const [user] = useUser();
    const [getIsMounted] = useIsMounted();
    React.useEffect(() => {
        if (onLogin && user && getIsMounted) onLogin();
    }, [onLogin, user, getIsMounted]);

    return (
        <Grid container alignContent='center' className={classes.root} justify='center'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <div className={classes.form}>
                    <LoginForm onSuccess={onLogin} />
                </div>
            </Paper>
        </Grid>
    );
}

Login.defaultProps = {
    onLogin: undefined,
};
