/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useEndPoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';

import API from '../api';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function LoginTempForm({ onSuccess, onFailure }) {
    const classes = useStyles();
    const [form, setForm] = React.useState({
        username: '',
    });
    const _request = React.useCallback(() => API.loginTemp(form.username), [
        form,
    ]);
    const [request, isLoading] = useEndPoint(_request, {
        onSuccess,
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
                        id='username'
                        fullWidth
                        variant='outlined'
                        type='username'
                        required
                        value={form.username}
                        onChange={(e) => handleChange(e, 'username')}
                        label='Username'
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Login
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}

LoginTempForm.defaultProps = {
    onFailure: null,
};

LoginTempForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
};
