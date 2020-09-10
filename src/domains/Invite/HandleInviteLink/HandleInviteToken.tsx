import React, { useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from '@material-ui/core/CircularProgress';

import useEndpoint from 'hooks/useEndpoint';

import API from '../api';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    token: string;
}

export default function HandleInviteToken({
    onSuccess,
    onFailure,
    token,
}: Props): JSX.Element {
    const loginRequest = useCallback(() => API.loginWithJWT(token), [token]);
    const [sendLoginRequest] = useEndpoint(loginRequest, {
        onSuccess() {
            onSuccess();
        },
        onFailure,
    });
    const validateRequest = useCallback(() => API.validateJWT(token), [token]);
    const [sendValidateRequest] = useEndpoint(validateRequest, {
        onSuccess() {
            sendLoginRequest();
        },
        onFailure,
    });
    useEffect(() => {
        sendValidateRequest();
    }, [sendValidateRequest]);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}
