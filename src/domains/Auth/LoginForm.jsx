import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useSnack from '../../hooks/useSnack';
import useEndpoint from '../../hooks/useEndpoint';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function LoginForm({ afterSubmit }) {
    const classes = useStyles();
    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });
    const [snack] = useSnack();
    const [login] = useEndpoint('/api/users/login', 'POST');

    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login
            .onStatus(200, () => {
                // window.localStorage.setItem('jwt', jwt);
                // console.log(res);
                // history.push('/app/sessions/list');
                afterSubmit();
            })
            .onStatus('_', () => {
                snack('Failed login, please try again!', 'error');
            })
            .send(form);
    };

    return (
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
                        onChange={(e) => handleChange(e, 'username')}
                        label='Username'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        type='password'
                        value={form.password}
                        onChange={(e) => handleChange(e, 'password')}
                        label='Password'
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
    );
}

LoginForm.propTypes = {
    afterSubmit: PropTypes.func.isRequired,
};
