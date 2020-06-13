import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import ForgotPassRequestForm from 'domains/Auth/ForgotPassRequest';

import routes from '../routes';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        // not necessary anymore?
        // marginTop: '64-px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
}));

export default function ForgotPassRequest() {
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
                        <ForgotPassRequestForm
                            onSuccess={() => {
                                history.push(routes.login);
                            }}
                        />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
