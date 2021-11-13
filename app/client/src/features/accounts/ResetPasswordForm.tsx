/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, InputAdornment, Grid } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-relay';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { useSnack, useForm } from '@local/features/core';
import { useRouter } from 'next/router';
import { ResetPasswordRequestMutation } from '@local/__generated__/ResetPasswordRequestMutation.graphql';
import { RESET_PASSWORD_FORM_MUTATION } from './ResetPasswordRequest';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

const initialState = {
    newPassword: '',
    confirmNewPassword: '',
};

export type TResetPasswordForm = typeof initialState;

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(0, 1, 0, 1),
    },
}));

export function ResetPasswordForm({ onSuccess, onFailure }: Props) {
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit] = useMutation<ResetPasswordRequestMutation>(RESET_PASSWORD_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();

    // styling hook
    const classes = useStyles();

    const router = useRouter();

    function handleCommit(submittedForm: TResetPasswordForm) {
        commit({
            variables: { 
                input: {
                    token: router.query.token ? String(router.query.token) : '',
                    ...submittedForm
                } 
            },
            onCompleted({ resetPassword }) {
                if (resetPassword.isError) {
                    if (resetPassword.message === 'Invalid token.') {
                        displaySnack('Error: Invalid token. Redirecting back to homepage.');
                        router.push('/')
                    }
                    else {
                        displaySnack(resetPassword.message);
                    }
                } else {
                    displaySnack('Password changed successfully!');
                    if (onSuccess) onSuccess();
                }
            },
            onError: onFailure,
        });
    }

    React.useEffect(() => {
        if (!router.query.token) {
            displaySnack('Error: No token found. Redirecting back to homepage.');
            router.push('/')
        }
    }, [displaySnack, router]);

    return (
        <Grid container justify='center'>
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                {/* {router.query} */}
                <FormContent>
                    <TextField
                        label='Enter your new password'
                        helperText={errors.newPassword || 'Passwords must be at least 8 characters and contain both lowercase and uppercase letters, at least one number, and at least one special character (e.g. -+_!@#$%^&*., ?)'}
                        error={Boolean(errors.newPassword)}
                        required
                        variant='outlined'
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.newPassword}
                        onChange={handleChange('newPassword')}
                        spellCheck={false}
                        InputProps={{
                            'aria-label': 'Enter your new password',
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.newPassword ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.newPassword ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label='Confirm your new password'
                        helperText={errors.confirmNewPassword}
                        error={Boolean(errors.confirmNewPassword)}
                        required
                        variant='outlined'
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.confirmNewPassword}
                        onChange={handleChange('confirmNewPassword')}
                        spellCheck={false}
                        InputProps={{
                            'aria-label': 'Enter your new password',
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.confirmNewPassword ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.confirmNewPassword ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Confirm
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
}

ResetPasswordForm.defaultProps = {
    onFailure: null,
};

ResetPasswordForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
