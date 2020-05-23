import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useSnack from '../../../hooks/useSnack';
import useEndpoint from '../../../hooks/useEndpoint';

export default function VerificationPage() {
    const history = useHistory();
    const { userId } = useParams();
    const [snack] = useSnack();
    const [verify] = useEndpoint('/api/users/verification', 'POST');
    React.useEffect(() => {
        verify
            .onStatus(200, () => {
                snack('Successfully Verified!', 'success');
                history.push('/login');
            })
            .onStatus('_', (res) => {
                snack(`Error: ${res.statusText}`, 'error');
                history.push('/login');
                // Figure out best way to handle problem in the page
            })
            .send({ userId });
    }, []);

    // TODO: implement some sort of verification page for verification failure with ability to re-send link?
    return <div />;
}
