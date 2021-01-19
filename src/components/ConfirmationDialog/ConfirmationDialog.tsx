import React from 'react';
import { Button, DialogActions, DialogContentText, DialogContent } from '@material-ui/core';

import ResponsiveDialog from '../ResponsiveDialog';

interface Props {
    onConfirm: () => void;
    title: string;
    children: string | JSX.Element;
    open: boolean;
    onClose: () => void;
}

export default function ConfirmationDialog({ open, onConfirm, title, children, onClose }: Props) {
    return (
        <ResponsiveDialog open={open} onClose={onClose} title={title}>
            <DialogContent>
                <DialogContentText color='textPrimary'>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </ResponsiveDialog>
    );
}
