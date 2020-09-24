import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextField from 'components/TextField';
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

interface Form {
    email: string;
    password: string;
}

export default function LoginForm({ onSuccess }: Props) {
    const classes = useStyles();

    const [form, setForm] = React.useState<Form>({
        email: '',
        password: '',
    });
    const [isPassVisible, setIsPassVisible] = React.useState(false);

    const builtRequest = React.useCallback(
        () => API.login(form.email, form.password),
        [form]
    );

    const [sendRequest, isLoading] = useEndpoint(builtRequest, {
        onSuccess,
    });

    const handleChange = (key: keyof Form) => (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
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
                        type='email'
                        value={form.email}
                        onChange={handleChange('email')}
                        label='Email'
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='password'
                        required
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        label='Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() =>
                                            setIsPassVisible(!isPassVisible)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
