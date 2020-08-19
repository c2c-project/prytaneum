import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';

import API from '../api';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

interface Props {
    onSuccess: () => void;
}

/** Function to request a password reset, calls onSuccess if worked, otherwise, calls onFailure
 * @category Domains/Auth
 * @constructor ForgotPassRequest
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example 
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export default function LoginForm({ onSuccess }: Props) {
    const classes = useStyles();

    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });

    const builtRequest = React.useCallback(
        () => API.login(form.username, form.password),
        [form]
    );

    const [sendRequest, isLoading] = useEndpoint(builtRequest, {
        onSuccess,
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
                        required
                        fullWidth
                        variant='outlined'
                        type='text'
                        value={form.username}
                        onChange={(e) => handleChange(e, 'username')}
                        label='Username'
                        spellCheck={false}
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                    />
                </Grid>
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
                        spellCheck={false}
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
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

LoginForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};
