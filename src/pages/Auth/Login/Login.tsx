import React from 'react';
import { useHistory } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import LoginForm from 'domains/Auth/LoginForm';
import banner from 'assets/spp-banner.png';

import routeNames from '../route-names';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        // not necessary anymore?
        // marginTop: '64-px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

export default function Login() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Container maxWidth='md' className={classes.root}>
            <Grow timeout={300} in>
                <Grid
                    container
                    direction='column'
                    className={classes.root}
                    alignContent='center'
                    justify='center'
                >
                    <Paper className={classes.paper}>
                        <img
                            className={classes.img}
                            src={banner}
                            alt='University of California Riverside School of Public Policy Logo'
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <LoginForm
                                    onSuccess={() => history.push('/app/home')} // TODO: CHANGE THIS
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                justify='space-between'
                            >
                                <Button
                                    onClick={() =>
                                        history.push(routeNames.register)
                                    }
                                >
                                    Register
                                </Button>
                                <Button
                                    aria-label='Forgot Password'
                                    onClick={() =>
                                        history.push(routeNames.forgotPassRequest)
                                    }
                                >
                                    Forgot Password?
                                </Button>
                                <Button
                                    onClick={() =>
                                        history.push(routeNames.loginTemp)
                                    }
                                >
                                    Temporarily Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
