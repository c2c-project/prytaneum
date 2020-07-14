/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import useSnack from 'hooks/useSnack';

import API from '../api';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

export default function RegisterForm({ onSuccess, onFailure }: Props) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
    });
    const builtRequest = React.useCallback(() => API.register(form), [form]);
    const [sendRequest, isLoading] = useEndpoint(builtRequest, {
        onSuccess: () => {
            snack('Successfully registered!', 'success');
            onSuccess();
        },
        onFailure,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
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
                        id='email'
                        required
                        fullWidth
                        variant='outlined'
                        type='email'
                        value={form.email}
                        onChange={(e) => handleChange(e, 'email')}
                        label='Email'
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
                    <TextField
                        id='confirm-password'
                        required
                        fullWidth
                        variant='outlined'
                        type='password'
                        value={form.confirmPass}
                        onChange={(e) => handleChange(e, 'confirmPass')}
                        label='Confirm Password'
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Register
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}

RegisterForm.defaultProps = {
    onFailure: null,
};

RegisterForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
