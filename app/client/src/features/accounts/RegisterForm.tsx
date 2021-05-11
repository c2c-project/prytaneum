/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, InputAdornment, Grid, Divider } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import BackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useRegisterMutation } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { LoadingButton } from '@local/components/LoadingButton';
import { useSnack } from '@local/hooks/useSnack';
import { useForm } from '@local/hooks/useForm';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
};

const useStyles = makeStyles((theme) => ({
    btnGroup: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
    divider: {
        width: '75%',
        marginLeft: '12.5%',
    },
}));
export default function RegisterForm({ onSuccess, onFailure }: Props) {
    // form state hooks
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);

    // styling hook
    const classes = useStyles();

    // request hook
    const [register, { data, loading }] = useRegisterMutation({
        variables: { input: form },
        onCompleted: onSuccess,
        onError: onFailure,
    });
    // const [, setUser] = useUser();

    // user feedback
    const [snack] = useSnack();

    // navigation
    const router = useRouter();

    return (
        <Form onSubmit={handleSubmit(register)}>
            <FormContent>
                <TextField
                    id='register-first-name'
                    helperText={errors.firstName}
                    required
                    value={form.firstName}
                    onChange={handleChange('firstName')}
                    label='First Name'
                    autoFocus
                    error={Boolean(errors.firstName)}
                />
                <TextField
                    id='register-last-name'
                    helperText={errors.lastName}
                    required
                    value={form.lastName}
                    onChange={handleChange('lastName')}
                    label='Last Name'
                    error={Boolean(errors.lastName)}
                />
                <TextField
                    id='register-email'
                    // eslint-disable-next-line quotes
                    helperText={errors.email || "We'll never share your email"}
                    required
                    type='email'
                    value={form.email}
                    onChange={handleChange('email')}
                    label='Email'
                    error={Boolean(errors.email)}
                />
                <TextField
                    id='register-password'
                    required
                    error={Boolean(errors.password)}
                    helperText={errors.password || 'Passwords must be at least 8 characters'}
                    type={isPassVisible ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    label='Password'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setIsPassVisible(!isPassVisible)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge='end'
                                >
                                    {isPassVisible ? (
                                        <VisibilityOff color={errors.password ? 'error' : undefined} />
                                    ) : (
                                        <Visibility color={errors.password ? 'error' : undefined} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id='register-confirm-password'
                    required
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    type={isPassVisible ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    label='Confirm Password'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setIsPassVisible(!isPassVisible)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge='end'
                                >
                                    {isPassVisible ? (
                                        <VisibilityOff color={errors.confirmPassword ? 'error' : undefined} />
                                    ) : (
                                        <Visibility color={errors.confirmPassword ? 'error' : undefined} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormContent>
            <Grid container item direction='column' className={classes.btnGroup}>
                <LoadingButton loading={loading}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Register
                    </Button>
                </LoadingButton>
                <Divider className={classes.divider} />
                <Button
                    fullWidth
                    onClick={() => router.push('/login')}
                    variant='outlined'
                    color='primary'
                    startIcon={<BackIcon />}
                >
                    Back To Login
                </Button>
            </Grid>
        </Form>
    );
}

RegisterForm.defaultProps = {
    onFailure: null,
};

RegisterForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
