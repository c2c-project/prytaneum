import React, { useEffect, useCallback } from 'react';
import Loader from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useEndpoint from 'hooks/useEndpoint';
import API from '../api';
import { InviteForm, InvitePreview } from '../types';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    inviteForm: InviteForm;
    file: File | undefined;
    preview: InvitePreview;
}

export default function CreateInvite({
    onSuccess,
    onFailure,
    inviteForm,
    file,
    preview,
}: Props): JSX.Element {
    const apiRequest = useCallback(
        () => API.createInvite(inviteForm, file, preview),
        [inviteForm, file]
    );
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });
    useEffect(() => {
        sendRequest();
    }, []);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}
