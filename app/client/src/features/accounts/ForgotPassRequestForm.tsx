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
import { ForgotPasswordFormMutation } from '@local/__generated__/ForgotPasswordFormMutation.graphql';
import { FORGOT_PASSWORD_FORM_MUTATION } from './ForgotPasswordForm';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

const initialState = {
    email: '',
    newPassword: '',
    confirmNewPassword: '',
};

export type TForgotPasswordForm = typeof initialState;

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(0, 1, 0, 1),
    },
}));

export function ForgotPassRequestForm({ onSuccess, onFailure }: Props) {
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit] = useMutation<ForgotPasswordFormMutation>(FORGOT_PASSWORD_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();

    // styling hook
    const classes = useStyles();

    function handleCommit(submittedForm: TForgotPasswordForm) {
        commit({
            variables: { input: submittedForm },
            onCompleted({ resetPassword }) {
                if (resetPassword.isError) {
                    displaySnack(resetPassword.message);
                    if (onFailure) onFailure();
                } else {
                    displaySnack('Password changed successfully!');
                    if (onSuccess) onSuccess();
                }
            },
            onError: onFailure,
        });
    }

    return (
        <Grid container justify='center'>
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your email' }}
                        label='Enter your email'
                        helperText={errors.email}
                        error={Boolean(errors.email)}
                        required
                        type='email'
                        variant='outlined'
                        value={form.email}
                        onChange={handleChange('email')}
                        spellCheck={false}
                    />
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
                                            <VisibilityOff color={errors.password ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.password ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Reset password
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
}

ForgotPassRequestForm.defaultProps = {
    onFailure: null,
};

ForgotPassRequestForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
