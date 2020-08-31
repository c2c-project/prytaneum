/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { useParams, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import errors from 'utils/errors';

import HandleInviteToken from './HandleInviteToken';
import InvalidInviteLink from '../../../components/InvalidInviteLink';
import { InviteTokenResult } from '../types';

// jwt should contain email, check if account exists
// Different cases, using email to check if account exists
// Case 1: No account, redirect to register
// Case 2: account exists, redirect to login page
// Case 3: jwt invalid, display error message.
function consumeInviteToken(
    inviteToken: string,
    setValidJWT: Function,
    onError: Function
): InviteTokenResult | undefined {
    try {
        const JWT_SECRET = 'secret';
        // Decode the invite token
        const decoded = jwt.verify(
            inviteToken,
            JWT_SECRET
        ) as InviteTokenResult;
        console.log('decoded: ', decoded);
        const { email, townHallID } = decoded;
        if (!email || !townHallID) {
            // Throw error as link contains invalid data
            errors.invalidToken(); // TODO handle this error
            onError('Invalid Token Data');
            return undefined;
        }
        setValidJWT(true);
        return { email, townHallID };
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        onError(e.message);
        return undefined;
    }
}

const Transition = React.forwardRef(function Transition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function HandleInviteLink(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token }: { token: string } = useParams();
    const history = useHistory();
    const [townHallID, setTownHallID] = useState('');
    const [validJWT, setValidJWT] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        history.push(`/townhalls/${townHallID}`); // TODO Verify correct route
    };

    const handleFailure = () => {
        history.push('/home');
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.push('/home');
    };

    const handleError = (error: string) => {
        // JWT Error
        setErrorMessage(error);
        handleOpen();
    };

    const ErrorDialog = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogContent>
                        <InvalidInviteLink errorMessage={errorMessage} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    useEffect(() => {
        const result = consumeInviteToken(token, setValidJWT, handleError);
        if (result !== undefined) {
            setTownHallID(result.townHallID);
        }
    }, []);
    return (
        <div>
            {validJWT ? (
                <HandleInviteToken
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    token={token}
                />
            ) : (
                <ErrorDialog />
            )}
        </div>
    );
}
