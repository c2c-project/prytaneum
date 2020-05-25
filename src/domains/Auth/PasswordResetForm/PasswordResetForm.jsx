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

export default function PasswordResetForm({ token, onSuccess }) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [form, setForm] = React.useState({
        password: '',
        confirmPassword: '',
    });
    const _request = React.useCallback(
        () => API.forgotPassConsume(token, form),
        [form, token]
    );
    const [request, isLoading] = useEndpoint(_request, {
        onSuccess: () => {
            snack('Successfully reset password!');
            onSuccess();
        },
    });
    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        request();
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
                        value={form.confirmPassword}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                        label='Confirm Password'
                    />
                </Grid>
                <Grid container item xs={12} justify='space-between'>
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Submit
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}

PasswordResetForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
