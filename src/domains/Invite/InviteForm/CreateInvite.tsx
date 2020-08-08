import React from 'react';
import Loader from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import useEndpoint from 'hooks/useEndpoint';
import { InviteForm, createInvite } from '../api';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    inviteForm: InviteForm;
    file: File | undefined;
}

export default function CreateInvite({
    onSuccess,
    onFailure,
    inviteForm,
    file,
}: Props): JSX.Element {
    const apiRequest = React.useCallback(() => createInvite(inviteForm, file), [
        inviteForm,
        file,
    ]);
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
    React.useEffect(() => {
        sendRequest();
    }, []);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}
