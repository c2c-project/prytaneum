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

export default function ForgotPassRequest() {
    const classes = useStyles();
    const history = useHistory();
    const [form, setForm] = React.useState({
        email: '',
    });
    // const { token } = useParams();
    const [snack] = useSnack();
    const [requestPasswordReset] = useEndpoint(
        '/api/users/request-password-reset',
        'POST'
    );

    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        requestPasswordReset
            .onStatus(200, () => {
                history.push('/login');
                snack('Email sent', 'success');
            })
            .onStatus('_', (res) => {
                snack(`Error: ${res.statusText}`, 'error');
            })
            .send({ form });
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
                                        type='email'
                                        value={form.password}
                                        onChange={(e) =>
                                            handleChange(e, 'email')
                                        }
                                        label='Email'
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
                                        Send Reset Email
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
