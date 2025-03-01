import * as React from 'react';
import { InputAdornment, IconButton, Link as MUILink, Grid, Typography, TextField, Divider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useMutation, graphql } from 'react-relay';

import { LoginFormMutation } from '@local/__generated__/LoginFormMutation.graphql';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useSnack, useForm } from '@local/core';
import { GoogleLogin } from './GoogleLogin';

interface TLoginForm {
    [index: string]: string;
    email: string;
    password: string;
}

const LOGIN_FORM_MUTATION = graphql`
    mutation LoginFormMutation($input: LoginForm!) {
        login(input: $input) {
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
    close?: () => void;
    secondaryActions?: React.ReactNode;
}

const intialState: TLoginForm = { email: '', password: '' };
/** Function to request a password reset, calls onSuccess if worked, otherwise, calls onFailure
 * @category @local/domains/Auth
 * @constructor ForgotPassRequest
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export function LoginForm({ onSuccess, close, secondaryActions }: Props) {
    const { displaySnack } = useSnack();
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, handleSubmit, handleChange] = useForm(intialState);
    const [commit, isLoading] = useMutation<LoginFormMutation>(LOGIN_FORM_MUTATION);

    const commitMutation = (submittedForm: TLoginForm) => {
        commit({
            variables: {
                input: submittedForm,
            },
            onCompleted({ login }) {
                if (login.isError) displaySnack(login.message, { variant: 'error' });
                else {
                    if (onSuccess) onSuccess();
                }
            },
        });
    };

    return (
        <Grid data-test-id='login-form' container justifyContent='center'>
            <Grid item container xs={12} direction='column' alignItems='center'>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component='h1' variant='h6'>
                    Login
                </Typography>
            </Grid>
            <Form onSubmit={handleSubmit(commitMutation)}>
                <FormContent>
                    <TextField
                        id='login-email'
                        required
                        type='email'
                        value={form.email}
                        helperText={errors.email}
                        error={Boolean(errors.email)}
                        onChange={handleChange('email')}
                        label='Email'
                        autoFocus
                    />
                    <>
                        <TextField
                            id='login-password'
                            required
                            error={Boolean(errors.password)}
                            type={isPassVisible ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange('password')}
                            helperText={errors.password}
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
                                            {isPassVisible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container justifyContent='flex-end'>
                            <Link href='/forgot-password' passHref>
                                <MUILink
                                    sx={{ padding: (theme) => theme.spacing(0.5, 0, 0, 0) }}
                                    color='primary'
                                    underline='hover'
                                    onClick={() => {
                                        if (close) close();
                                    }}
                                >
                                    Forgot Password?
                                </MUILink>
                            </Link>
                        </Grid>
                    </>
                </FormContent>
                <Grid container item direction='column' sx={{ '& > *': { margin: (theme) => theme.spacing(1, 0) } }}>
                    <LoadingButton
                        loading={isLoading}
                        data-test-id='login-form-submit'
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='secondary'
                        disabled={form.password.length === 0 || form.email.length === 0}
                    >
                        Login
                    </LoadingButton>
                    {secondaryActions && (
                        <>
                            {/* <Divider className={classes.divider} /> */}
                            {secondaryActions}
                        </>
                    )}
                    <div style={{ width: '100%', marginTop: '1rem' }}>
                        <Divider textAlign='center'>or</Divider>
                    </div>
                    <GoogleLogin />
                </Grid>
            </Form>
        </Grid>
    );
}
