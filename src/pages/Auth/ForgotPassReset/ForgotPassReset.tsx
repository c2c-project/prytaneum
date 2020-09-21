import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import history from 'utils/history';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

interface Props {
    token: string;
}

// TODO: verify token from the routing itself and don't render this component if there's no token, handle redirect in routing
export default function ForgotPasswordReset({ token }: Props) {
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
                        <PasswordResetForm
                            token={token}
                            onSuccess={() => history.push('/auth/login')}
                        />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
