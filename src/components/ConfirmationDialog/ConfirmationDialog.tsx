import React from 'react';
import {
    Button,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';

import Dialog from '../Dialog';
import DialogContent from '../DialogContent';

interface Props {
    onConfirm: () => void;
    title: string;
    children: string | JSX.Element;
    open: boolean;
    onClose: () => void;
}

export default function ConfirmationDialog({
    open,
    onConfirm,
    title,
    children,
    onClose,
}: Props) {
    return (
        <Dialog open={open} onClose={onClose} title={title}>
            <DialogContent>
                <DialogContentText color='textPrimary'>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
