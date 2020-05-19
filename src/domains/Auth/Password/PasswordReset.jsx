import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import useSnack from '../../../hooks/useSnack';
import PasswordForm from './PasswordForm';
import useEndpoint from '../../../hooks/useEndpoint';

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

export default function ResetPasswordPage() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useParams();
    const [snack] = useSnack();
    const [resetPass] = useEndpoint(
        '/api/users/consume-password-reset-token',
        'POST'
    );

    const handleSubmit = (form) => {
        resetPass
            .onStatus(200, () => {
                history.push('/login');
                snack('Password Changed', 'success');
            })
            .onStatus('_', (res) => {
                snack(`Error: ${res.statusText}`, 'error');
            })
            .send({ form, token });
    };

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
                        <PasswordForm onSubmit={handleSubmit} />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
