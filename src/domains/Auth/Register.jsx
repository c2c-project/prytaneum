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
import useEndpoint from '../../hooks/useEndpoint';

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

export default function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
    });
    const [snack] = useSnack();
    const [register] = useEndpoint('/api/users/register', 'POST');

    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register
            .onStatus(200, () => {
                history.push('/login');
                snack('You may now login', 'success');
            })
            .onStatus('_', (res) => {
                snack(`Error: ${res.statusText}`, 'error');
            });
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
                        {/* <Grid container spacing={4}>
                            <Grid item xs={12}> */}
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                spacing={2}
                                className={classes.root}
                                alignContent='center'
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant='outlined'
                                        type='text'
                                        value={form.username}
                                        onChange={(e) =>
                                            handleChange(e, 'username')
                                        }
                                        label='Username'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant='outlined'
                                        type='email'
                                        value={form.email}
                                        onChange={(e) =>
                                            handleChange(e, 'email')
                                        }
                                        label='Email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant='outlined'
                                        type='password'
                                        value={form.password}
                                        onChange={(e) =>
                                            handleChange(e, 'password')
                                        }
                                        label='Password'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant='outlined'
                                        type='password'
                                        value={form.confirmPass}
                                        onChange={(e) =>
                                            handleChange(e, 'confirmPass')
                                        }
                                        label='Confirm Password'
                                    />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    justify='space-between'
                                >
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            history.push('/login');
                                        }}
                                        variant='text'
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        {/* </Grid>
                        </Grid> */}
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
