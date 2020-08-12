import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';

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

/**
 * Function to hanlde forgotten password requests by calling the API
 * and rendering the text boxes
 * @constructor ForgotPassRequest
 * @category Domains/Auth
 * @component
 * @example 
 * ForGotPassExaMple()
 * @param {"() => void, () => void"} props props.onSuccess is the function to use if successful <br><br>
 *                       props.onFailure is the function to use if failed
 */
export default function ForgotPassRequest({ onSuccess, onFailure }: Props) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [form, setForm] = React.useState({
        email: '',
    });
    const builtRequest = React.useCallback(() => API.forgotPassRequest(form), [
        form,
    ]);
    const [sendRequest] = useEndpoint(builtRequest, {
        onSuccess: () => {
            snack(`Email sent to ${form.email}`, 'success');
            onSuccess();
        },
        onFailure,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
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
                        id='email'
                        required
                        fullWidth
                        variant='outlined'
                        type='email'
                        value={form.email}
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
