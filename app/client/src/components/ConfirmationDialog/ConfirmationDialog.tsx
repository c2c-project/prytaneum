import * as React from 'react';
import { Button, DialogActions, DialogContentText, DialogContent } from '@mui/material';

import { ResponsiveDialog } from '../ResponsiveDialog';
import { LoadingButton } from '../LoadingButton';

export interface ConfirmationDialogProps {
    onConfirm: () => void;
    title: string;
    children: string | JSX.Element;
    open: boolean;
    onClose: () => void;
    isLoading?: boolean;
    confirmLabel?: string;
}

export function ConfirmationDialog({
    open,
    onConfirm,
    title,
    children,
    onClose,
    isLoading,
    confirmLabel = 'Confirm',
}: ConfirmationDialogProps) {
    // NOTE: the () => onClose() and () => onConfirm is done on purpose to prevent the synthetic event from being passed up
    // storybook yells at me if it's passed up
    return (
        <ResponsiveDialog open={open} onClose={onClose} title={title}>
            <DialogContent>
                <DialogContentText color='textPrimary'>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>
                    Cancel
                </Button>
                <LoadingButton variant='contained' color='primary' onClick={onConfirm} loading={Boolean(isLoading)}>
                    {confirmLabel}
                </LoadingButton>
            </DialogActions>
        </ResponsiveDialog>
    );
}
