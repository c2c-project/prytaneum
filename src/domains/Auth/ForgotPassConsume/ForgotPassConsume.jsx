import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import useSnack from '../../../hooks/useSnack';
import useEndpoint from '../../../hooks/useEndpoint';
import API from '../api';

export default function VerificationPage() {
    const history = useHistory();
    const { userId } = useParams();
    const [snack] = useSnack();
    const _request = React.useCallback(() => API.verifyEmail(userId), [userId]);

    const [request] = useEndpoint(_request, {
        onSuccess: () => {
            snack('Successfully Verified!', 'success');
            history.push('/login');
        },
        onFailure: (err) => {
            const { reason } = err;
            snack(`Error: ${reason}`, 'error');
            history.push('/login');
        },
    });

    React.useEffect(() => {
        request(userId);
    }, []);

    return <Loader />;
}
