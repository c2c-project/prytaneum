import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useSnack from '../../../hooks/useSnack';
import useEndpoint from '../../../hooks/useEndpoint';
import API from '../api';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function ForgotPassRequest({ onSuccess, onFailure }) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [form, setForm] = React.useState({
        email: '',
    });
    const _request = React.useCallback(
        () => API.forgotPassRequest(form.email),
        [form]
    );
    const [request] = useEndpoint(_request, {
        onSuccess: () => {
            snack(`Email sent to ${form.email}`, 'success');
            onSuccess();
        },
        onFailure,
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
                        id='email'
                        required
                        fullWidth
                        variant='outlined'
                        type='email'
                        value={form.password}
                        onChange={(e) => handleChange(e, 'email')}
                        label='Email'
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <Button type='submit' variant='contained' color='primary'>
                        Send Reset Email
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

ForgotPassRequest.defaultProps = {
    onFailure: null,
};

ForgotPassRequest.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
