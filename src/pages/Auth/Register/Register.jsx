/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import RegisterForm from 'domains/Auth/RegisterForm';

import routes from '../routes';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();

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
                        <RegisterForm
                            onSuccess={() => history.push(routes.login)}
                        />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
