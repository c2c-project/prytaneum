import React from 'react';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form } from '@local/components/Form';
import { useForm, useSnack } from '@local/core';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { PasswordResetRequestFormMutation } from '@local/__generated__/PasswordResetRequestFormMutation.graphql';
import { LoadingButton } from '@local/components/LoadingButton';
import { FormContent } from '@local/components/FormContent';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

const initialState = {
    email: '',
};

export type TPasswordResetRequestForm = typeof initialState;

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
}));

const PASSWORD_RESET_REQUEST_FORM_MUTATION = graphql`
    mutation PasswordResetRequestFormMutation($input: ResetPasswordRequestForm!) {
        resetPasswordRequest(input: $input) {
            isError
            message
            body
        }
    }
`;

export function PasswordResetRequestForm({ onSuccess, onFailure }: Props) {
    const classes = useStyles();
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit, isLoading] = useMutation<PasswordResetRequestFormMutation>(PASSWORD_RESET_REQUEST_FORM_MUTATION);
    const { displaySnack } = useSnack();

    function handleCommit(submittedForm: TPasswordResetRequestForm) {
        commit({
            variables: { input: submittedForm },
            onCompleted({ resetPasswordRequest }) {
                if (resetPasswordRequest.isError) {
                    displaySnack(resetPasswordRequest.message, { variant: 'error' });
                    if (onFailure) onFailure();
                } else {
                    displaySnack('Success! Please check your email for the password reset link.', {
                        variant: 'success',
                    });
                    if (onSuccess) onSuccess();
                }
            },
        });
    }

    return (
        <Grid container justifyContent='center'>
            <Grid container item xs={12} direction='column' alignItems='center'>
                <Typography component='h1' variant='h6'>
                    Reset Password Request
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        aria-label='Enter your email'
                        id='password-reset-request-email'
                        helperText={errors.email}
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        label='Email'
                        autoFocus
                        error={Boolean(errors.email)}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid container item direction='column' className={classes.btnGroup}>
                    <LoadingButton loading={isLoading}>
                        <Button fullWidth type='submit' variant='contained' color='secondary'>
                            Submit
                        </Button>
                    </LoadingButton>
                </Grid>
            </Form>
        </Grid>
    );
}
