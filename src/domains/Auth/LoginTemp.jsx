/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import useSnack from '../../hooks/useSnack';
import useEndPoint from '../../hooks/useEndpoint';

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
    const [form, setForm] = React.useState({
        username: '',
    });
    const [snack] = useSnack();
    const [loginTemporarily] = useEndPoint(
        '/api/users/login-temporary',
        'POST'
    );

    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginTemporarily
            .onStatus(200, (res) => {
                res.json().then(({ jwt }) => {
                    window.localStorage.setItem('jwt', jwt);
                    history.push('/app/sessions/list');
                });
            })
            .onStatus('_', (res) => {
                snack(`Error: ${res.statusText}`, 'error');
            })
            .send(form);
    };
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
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                spacing={2}
                                className={classes.root}
                                alignContent='center'
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        type='username'
                                        required
                                        value={form.username}
                                        onChange={(e) =>
                                            handleChange(e, 'username')
                                        }
                                        label='Username'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
