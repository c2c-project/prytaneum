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

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

/** Function to create a temporary login form
 * @category Domains/Auth
 * @constructor LoginTempForm
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example 
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export default function LoginTempForm({ onSuccess, onFailure }: Props) {
    const classes = useStyles();
    const [form, setForm] = React.useState({
        username: '',
    });
    const builtRequest = React.useCallback(() => API.loginTemp(form.username), [
        form,
    ]);
    const [sendRequest, isLoading] = useEndPoint(builtRequest, {
        onSuccess,
        onFailure,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: string
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
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
