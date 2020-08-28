import React, { useEffect, useCallback } from 'react';
import Loader from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useEndpoint from 'hooks/useEndpoint';
import API from '../api';
import { InviteForm } from '../types';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    inviteForm: InviteForm;
    file: File | undefined;
    sendPreview: boolean;
    previewEmail: string;
}

export default function CreateInvite({
    onSuccess,
    onFailure,
    inviteForm,
    file,
    sendPreview,
    previewEmail,
}: Props): JSX.Element {
    const apiRequest = useCallback(
        () => API.createInvite(inviteForm, file, sendPreview, previewEmail),
        [inviteForm, file]
    );
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: (value) => {
            console.log('Success', value);
            onSuccess();
        },
        onFailure: (e) => {
            console.log('Fail', e);
            onFailure();
        },
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
