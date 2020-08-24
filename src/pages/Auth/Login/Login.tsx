import React from 'react';
import {
    Slide,
    Container,
    Link as MUILink,
    Grid,
    Typography,
    Avatar,
    Box,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Paper from 'components/Paper';
import LoginForm from 'domains/Auth/LoginForm';
import banner from 'assets/spp-banner.png';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <MUILink
                color='inherit'
                to='https://material-ui.com/'
                component={Link}
            >
                Your Website
            </MUILink>
            <p>{new Date().getFullYear()}</p>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    React.useEffect(() => {});
    return (
        // <Container maxWidth='xs'>
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
            <Grid container>
                <Grid item xs>
                    <MUILink
                        to={forgotPassRoute}
                        variant='body2'
                        component={Link}
                    >
                        Forgot password?
                    </MUILink>
                </Grid>
                <Grid item>
                    <MUILink
                        to={registerRoute}
                        variant='body2'
                        component={Link}
                    >
                        Don&#39;t have an account? Sign Up
                    </MUILink>
                </Grid>
            </Grid>
        </div>
        // <Box mt={8}>
        //     <Copyright />
        // </Box>
        // </Container>
    );
}
