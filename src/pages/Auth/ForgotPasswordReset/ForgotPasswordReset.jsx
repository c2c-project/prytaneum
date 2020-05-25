import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import PasswordResetForm from 'domains/Auth/PasswordResetForm';

import routes from '../routes';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function ForgotPasswordReset() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useParams();

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
                        <PasswordResetForm
                            token={token}
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
