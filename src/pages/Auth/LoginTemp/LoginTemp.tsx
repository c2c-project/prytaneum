/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import Paper from 'components/Paper';
import LoginTempForm from 'domains/Auth/LoginTempForm';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        marginTop: '-64px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
}));

export default function Loginpage() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Container maxWidth='md' className={classes.root}>
            <Grow in timeout={300}>
                <Grid
                    container
                    direction='column'
                    className={classes.root}
                    alignContent='center'
                    justify='center'
                >
                    <Paper className={classes.paper}>
                        <LoginTempForm
                            onSuccess={() => history.push('/app/home')} // TODO: change this
                        />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
