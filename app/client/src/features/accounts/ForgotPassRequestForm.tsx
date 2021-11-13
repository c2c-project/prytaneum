/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-relay';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { useSnack, useForm } from '@local/features/core';
import { useRouter } from 'next/router';
import { ForgotPasswordFormMutation } from '@local/__generated__/ForgotPasswordFormMutation.graphql';
import { FORGOT_PASSWORD_FORM_MUTATION } from './ForgotPasswordForm';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

const initialState = {
    email: '',
};

export type TForgotPasswordForm = typeof initialState;

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(0, 1, 0, 1),
    },
}));

export function ForgotPassRequestForm({ onSuccess, onFailure }: Props) {
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit] = useMutation<ForgotPasswordFormMutation>(FORGOT_PASSWORD_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();

    // styling hook
    const classes = useStyles();

    const router = useRouter();

    function handleCommit(submittedForm: TForgotPasswordForm) {
        commit({
            variables: { input: submittedForm },
            onCompleted({ requestResetPassword }) {
                if (requestResetPassword.isError) {
                    displaySnack(requestResetPassword.message);
                } else {
                    router.push({
                        pathname: '/reset-password',
                        query: { token: requestResetPassword.body }
                    })
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

ForgotPassRequestForm.defaultProps = {
    onSuccess: null,
    onFailure: null,
};

ForgotPassRequestForm.propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
};
