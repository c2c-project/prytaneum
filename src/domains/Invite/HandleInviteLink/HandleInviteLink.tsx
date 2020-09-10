/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { useParams, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import InvalidLink from 'components/InvalidLink';

import HandleInviteToken from './HandleInviteToken';
import { InviteTokenResult } from '../types';

// jwt should contain email, check if account exists
// Different cases, using email to check if account exists
// Case 1: No account, redirect to register
// Case 2: account exists, redirect to login page
// Case 3: jwt invalid, display error message.
export function consumeInviteToken(inviteToken: string): InviteTokenResult {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const decoded = jwtDecode(inviteToken);
    const { email, townHallId } = decoded as {
        email: string;
        townHallId: string;
    };
    if (!email || !townHallId) {
        // Throw error as link contains invalid data
        throw new Error('Invalid Token');
    }
    return { email, townHallId };
}

const Transition = React.forwardRef(function Transition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction='up' ref={ref} {...props} />;
});

export function ErrorDialog({
    errorMessage,
}: {
    errorMessage: string;
}): JSX.Element {
    const [open, setOpen] = useState(true);
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
        history.push('/home');
    };
    return (
        <div id='error-dialog'>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogContent>
                    <InvalidLink errorMessage={errorMessage} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function HandleInviteLink(): JSX.Element {
    const { token } = useParams<{ token: string }>();
    const history = useHistory();
    try {
        const result = consumeInviteToken(token);
        const handleSuccess = () => {
            history.push(`/townhalls/${result.townHallId}`);
        };

        const handleFailure = () => {
            history.push('/home');
        };
        return (
            <HandleInviteToken
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                token={token}
            />
        );
    } catch (e) {
        return <ErrorDialog errorMessage={e.message} />;
    }
}
