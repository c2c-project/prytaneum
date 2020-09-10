/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextField from 'components/TextField';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import useSnack from 'hooks/useSnack';

import API from '../api';
import { RegisterForm as RegisterFormType } from '../types';

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
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, setForm] = React.useState<RegisterFormType>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const builtRequest = React.useCallback(() => API.register(form), [form]);
    const [sendRequest, isLoading] = useEndpoint(builtRequest, {
        onSuccess: () => {
            snack('Successfully registered!', 'success');
            onSuccess();
        },
        onFailure,
    });

    const handleChange = (key: keyof RegisterFormType) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
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
                        id='email'
                        required
                        type='email'
                        value={form.email}
                        onChange={handleChange('email')}
                        label='Email'
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='password'
                        required
                        fullWidth
                        variant='outlined'
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        label='Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() =>
                                            setIsPassVisible(!isPassVisible)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='confirm-password'
                        required
                        fullWidth
                        variant='outlined'
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        label='Confirm Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() =>
                                            setIsPassVisible(!isPassVisible)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button
                                fullWidth
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
