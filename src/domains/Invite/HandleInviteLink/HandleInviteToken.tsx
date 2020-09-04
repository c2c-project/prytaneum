import React, { useEffect } from 'react';
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
    const apiRequest = React.useCallback(() => API.loginWithJWT(token), [
        token,
    ]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}
