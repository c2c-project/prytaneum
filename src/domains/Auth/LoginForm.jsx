import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useEndpoint from '../../hooks/useEndpoint';
import LoadingButton from '../../components/LoadingButton';
import { login } from './auth-api';

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
    const request = React.useCallback(
        () => login(form.username, form.password),
        [form]
    );
    const [requestLogin, isLoading, response] = useEndpoint(request);

    const parseResponse = () => {
        const { status } = response;
        if (status === 200) {
            afterSubmit();
        }
    };

    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    React.useEffect(() => {
        if (response) {
            parseResponse();
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        requestLogin();
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
                        id='username'
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
                        id='password'
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
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Login
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}

LoginForm.propTypes = {
    afterSubmit: PropTypes.func.isRequired,
};
