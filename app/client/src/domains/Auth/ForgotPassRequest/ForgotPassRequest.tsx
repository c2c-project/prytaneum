import * as React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import BackIcon from '@material-ui/icons/ArrowBack';

import { TextField } from '@local/components/TextField';
import { useSnack } from '@local/hooks/useSnack';
// import useEndpoint from '@local/hooks/useEndpoint';

import API from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    btnGroup: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
    divider: {
        width: '75%',
        marginLeft: '12.5%',
    },
}));
interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

/** Function to request a password reset, calls onSuccess if worked, otherwise, calls onFailure
 * @category @local/domains/Auth
 * @constructor ForgotPassRequest
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export default function ForgotPassRequest({ onSuccess, onFailure }: Props) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [form, setForm] = React.useState({
        email: '',
    });
    const router = useRouter();
    // const builtRequest = React.useCallback(() => API.forgotPassRequest(form), [form]);
    // const [sendRequest] = useEndpoint(builtRequest, {
    //     onSuccess: () => {
    //         snack(`Email sent to ${form.email}`);
    //         onSuccess();
    //     },
    //     onFailure,
    // });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // sendRequest();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.root} alignContent='center'>
                <Grid item xs={12}>
                    <TextField
                        id='email'
                        variant='outlined'
                        type='email'
                        value={form.email}
                        onChange={(e) => handleChange(e, 'email')}
                        label='Email'
                        autoFocus
                    />
                </Grid>
                <Grid container item direction='column' justify='flex-end' className={classes.btnGroup}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Send Reset Email
                    </Button>
                    <Divider className={classes.divider} />
                    <Button
                        fullWidth
                        onClick={() => router.push('/login')}
                        variant='outlined'
                        color='primary'
                        startIcon={<BackIcon />}
                    >
                        Back To Login
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
