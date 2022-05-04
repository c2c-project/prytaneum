import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, InputAdornment, IconButton, Link as MUILink, Grid, Typography, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useMutation, graphql } from 'react-relay';

import { LoginFormMutation } from '@local/__generated__/LoginFormMutation.graphql';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useSnack, useForm } from '@local/core';

const useStyles = makeStyles((theme) => ({
    link: {
        padding: theme.spacing(0.5, 0, 0, 0),
    },
    buttonGroup: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
    divider: {
        maxWidth: '75%',
        marginLeft: '12.5%',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
}));

interface Props {
    onSuccess?: () => void;
    close?: () => void;
    secondaryActions?: React.ReactNode;
}

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
    const classes = useStyles();
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
            <Form className={classes.form} onSubmit={handleSubmit(commitMutation)}>
                <FormContent>
                    <TextField
                        data-test-id='login-email-text'
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
                            data-test-id='login-password-text'
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
                                    className={classes.link}
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
                <Grid container item direction='column' className={classes.buttonGroup}>
                    <LoadingButton loading={isLoading}>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='secondary'
                            disabled={form.password.length === 0 || form.email.length === 0}
                        >
                            Login
                        </Button>
                    </LoadingButton>
                    {secondaryActions && (
                        <>
                            {/* <Divider className={classes.divider} /> */}
                            {secondaryActions}
                        </>
                    )}
                </Grid>
            </Form>
        </Grid>
    );
}

LoginForm.defaultProps = {
    onSuccess: undefined,
    demo: false,
};

LoginForm.propTypes = {
    onSuccess: PropTypes.func,
};
