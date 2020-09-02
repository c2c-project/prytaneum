/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
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
export function consumeInviteToken(
    inviteToken: string
): InviteTokenResult | undefined {
    const JWT_SECRET = 'secret';
    // Decode the invite token
    const decoded = jwt.verify(inviteToken, JWT_SECRET) as InviteTokenResult;
    const { email, townHallID } = decoded;
    if (!email || !townHallID) {
        // Throw error as link contains invalid data
        errors.invalidToken(); // TODO handle this error
        return undefined;
    }
    return { email, townHallID };
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
}

export default function HandleInviteLink(): JSX.Element {
    const { token }: { token: string } = useParams();
    const history = useHistory();
    try {
        const result = consumeInviteToken(token);
        if (result === undefined) {
            throw new Error('Undefined invite token data');
        }
        const handleSuccess = () => {
            history.push(`/townhalls/${result.townHallID}`);
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
