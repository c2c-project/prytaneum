import React, { useEffect, useState } from 'react';
import Loader from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { useParams, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import errors from 'utils/errors';
import useEndpoint from 'hooks/useEndpoint';

import API from '../api';

interface inviteTokenResult {
    email: string;
}

// jwt should contain email, check if account exists
// Different cases, using email to check if account exists
// Case 1: No account, redirect to register
// Case 2: account exists, redirect to login page
// Case 3: jwt invalid, display error message.
function consumeInviteToken(inviteToken: string): string | undefined {
    try {
        const JWT_SECRET = 'secret';
        // Decode the invite token
        const decoded = jwt.verify(
            inviteToken,
            JWT_SECRET
        ) as inviteTokenResult;
        console.log('decoded: ', decoded);
        const { email } = decoded;
        if (!email) {
            // Throw error as link contains invalid data
            errors.invalidEmail(); // TODO handle this error
            return undefined;
        }
        return email;
    } catch (e) {
        console.log(e);
        errors.jwt(e);
        // TODO Handle Errors
        // switch (e.message) {
        //     case 'jwt malformed':
        //         console.log(e.message);
        //         break;
        //     case '':
        //         break;
        //     default:
        //         console.error(e);
        // }
        return undefined;
    }
}

interface Props {
    onIsRegistered: () => void;
    onNotRegistered: () => void;
    onFailure: () => void;
    email: string;
}

export function HandleInviteToken({
    onIsRegistered,
    onNotRegistered,
    onFailure,
    email,
}: Props): JSX.Element {
    const apiRequest = React.useCallback(() => API.checkIfRegistered(email), [
        email,
    ]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: (isRegisteredResponse) => {
            console.log(isRegisteredResponse);
            // TODO Ensure data response is of type boolean
            const isRegistered = isRegisteredResponse.data as boolean;
            if (isRegistered) {
                // TODO Take to login, find out how David wants router used
                onIsRegistered();
            } else {
                // TODO Take to registration, could pass the email to have it pre-filled on registration page
                onNotRegistered();
            }
        },
        onFailure: (e) => {
            console.log('Fail', e);
            onFailure();
        },
    });
    useEffect(() => {
        if (email === '') return;
        sendRequest();
    }, []);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}

export default function HandleInviteLink(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token }: { token: string } = useParams();
    const history = useHistory();
    const [email, setEmail] = useState('');

    const handleIsRegistered = () => {
        console.log('Registered');
        history.push(`/login/${token}`);
    };

    const handleNotRegistered = () => {
        console.log('Not Registered');
        history.push(`/register/${token}`);
    };

    const handleFailure = () => {
        // API call failure
        console.log('Failed Response');
        history.push('/register');
    };

    const handleError = () => {
        // JWT Error
        console.log('JWT Error');
        history.push('/invited/invalid'); // Display invalid
    };

    useEffect(() => {
        const result = consumeInviteToken(token);
        if (result === undefined) handleError();
        else setEmail(result);
    }, []);
    return (
        <HandleInviteToken
            onIsRegistered={handleIsRegistered}
            onNotRegistered={handleNotRegistered}
            onFailure={handleFailure}
            email={email}
        />
    );
}
