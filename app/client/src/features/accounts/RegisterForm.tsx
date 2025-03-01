/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import { IconButton, InputAdornment, Grid, Typography, TextField, Divider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { graphql, useMutation } from 'react-relay';
import * as Yup from 'yup';

import type { RegisterFormMutation } from '@local/__generated__/RegisterFormMutation.graphql';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useUser } from '@local/features/accounts';
import { useSnack } from '@local/core';
import { useFormik } from 'formik';
import { GoogleLogin } from './GoogleLogin';

export type TRegisterForm = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
};

type TRegisterSchema = {
    [key in keyof TRegisterForm]: Yup.AnySchema;
};

const registerValidationSchema = Yup.object().shape<TRegisterSchema>({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password too short')
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
});

const REGISTER_FORM_MUTATION = graphql`
    mutation RegisterFormMutation($input: RegistrationForm!) {
        register(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

interface Props {
    onSuccess?: () => void;
    onFailure?: () => void;
    secondaryActions?: React.ReactNode;
}

export function RegisterForm({ onSuccess, onFailure, secondaryActions }: Props) {
    // form state hooks
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [commit, isLoading] = useMutation<RegisterFormMutation>(REGISTER_FORM_MUTATION);

    const { setUser } = useUser();
    const { displaySnack } = useSnack();

    function handleCommit(submittedForm: TRegisterForm) {
        commit({
            variables: { input: submittedForm },
            onCompleted({ register }) {
                if (register.isError) {
                    displaySnack(register.message, { variant: 'error' });
                    if (onFailure) onFailure();
                } else {
                    setUser(register.body);
                    if (onSuccess) onSuccess();
                }
            },
            onError: onFailure,
        });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik<TRegisterForm>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: handleCommit,
    });

    const isAllInputsValid = React.useMemo(() => {
        return Object.values(errors).every((error) => !error);
    }, [errors]);

    return (
        <Grid data-test-id='register-form' container justifyContent='center'>
            <Grid container item xs={12} direction='column' alignItems='center'>
                <Typography component='h1' variant='h6'>
                    Create New Account
                </Typography>
            </Grid>
            <Form onSubmit={handleSubmit}>
                <FormContent>
                    <TextField
                        id='register-first-name'
                        helperText={errors.firstName}
                        required
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        label='First Name'
                        autoFocus
                        error={Boolean(errors.firstName)}
                    />
                    <TextField
                        id='register-last-name'
                        helperText={errors.lastName}
                        required
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        label='Last Name'
                        error={Boolean(errors.lastName)}
                    />
                    <TextField
                        id='register-email'
                        helperText={errors.email || 'We will never share your email'}
                        required
                        type='email'
                        value={values.email}
                        onChange={handleChange('email')}
                        label='Email'
                        error={Boolean(errors.email)}
                    />
                    <TextField
                        id='register-password'
                        data-test-id='register-password'
                        name='password'
                        required
                        error={Boolean(errors.password)}
                        helperText={
                            errors.password ||
                            'Passwords must be at least 8 characters long and contain at least one lowercase letter, capital letter, number, and symbol.'
                        }
                        type={isPassVisible ? 'text' : 'password'}
                        value={values.password}
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
                                        size='large'
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
                        data-test-id='register-confirm-password'
                        name='confirmPassword'
                        required
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        type={isPassVisible ? 'text' : 'password'}
                        value={values.confirmPassword}
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
                                        size='large'
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
                <Grid
                    container
                    item
                    direction='column'
                    sx={{
                        '& > *': {
                            margin: (theme) => theme.spacing(1, 0),
                        },
                    }}
                >
                    <LoadingButton
                        loading={isLoading}
                        data-test-id='register-form-submit'
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='secondary'
                        disabled={!isAllInputsValid || values.firstName === ''}
                    >
                        Create Account
                    </LoadingButton>
                    {secondaryActions && <>{secondaryActions}</>}
                    <div style={{ width: '100%', marginTop: '1rem' }}>
                        <Divider textAlign='center'>or</Divider>
                    </div>
                    <GoogleLogin />
                </Grid>
            </Form>
        </Grid>
    );
}
