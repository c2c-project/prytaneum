/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Button, DialogContent, Collapse, Tooltip, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Add } from '@mui/icons-material';
import { useFragment } from 'react-relay';
import InfoIcon from '@mui/icons-material/Info';

import { CopyText } from '@local/components/CopyText';
import type { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { EVENT_DETAILS_FRAGMENT } from '../EventSettings/EventDetails';
import { CreateInvite } from './CreateInvite';
import { useSnack } from '@local/core';
import { InvitedUsersList } from './InvitedUsersList';
import { useInvitedUsersListFragment$key } from '@local/__generated__/useInvitedUsersListFragment.graphql';

interface TState {
    isFormDialogOpen: boolean;
    isConfDialogOpen: boolean;
    anchorEl: HTMLElement | null;
}

type Action = { type: 'dialog/create-invite'; payload?: never } | { type: 'dialog/close-all'; payload?: never };

const reducer = (state: TState, action: Action): TState => {
    switch (action.type) {
        case 'dialog/create-invite':
            // clear focused moderator if any, open the form dialog, close any other dialogs
            return {
                ...state,
                isFormDialogOpen: true,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'dialog/close-all':
            // close all possible things that are open
            return {
                ...state,
                anchorEl: null,
                isFormDialogOpen: false,
                isConfDialogOpen: false,
            };
        default:
            return state;
    }
};

interface EventSettingsProps {
    eventDetailsFragmentRef: EventDetailsFragment$key;
    invitedUsersListFragmentRef: useInvitedUsersListFragment$key;
    className?: string;
}

export const InviteEventSettings = ({
    eventDetailsFragmentRef,
    invitedUsersListFragmentRef,
    className,
}: EventSettingsProps) => {
    const { id: eventId } = useFragment(EVENT_DETAILS_FRAGMENT, eventDetailsFragmentRef);
    const [link, setLink] = React.useState('');
    const [{ isFormDialogOpen }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        anchorEl: null,
    });
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [csvFile, setCSVFile] = React.useState<File | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const { displaySnack } = useSnack();

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    const openFormDialog = () => dispatch({ type: 'dialog/create-invite' });

    const generateInviteLink = () => {
        // TODO generate token for event if private unless only invites should be used for priavte events
        const inviteLink =
            process.env.NODE_ENV === 'development'
                ? `localhost:8080/events/${eventId}/live`
                : `https://prytaneum.io/events/${eventId}/live`;
        setLink(inviteLink);
    };

    const toggleInviteLink = () => {
        if (link === '') generateInviteLink();
        setOpen(!open);
    };

    const attachCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            // Validate csv file
            const limit = 5 * 1024 * 1024; // 5 MB
            if (e.target.files[0]?.size > limit) {
                displaySnack('File size too large. Max 5MB.', { variant: 'error' });
                const file = document.getElementById('invite-csv') as HTMLInputElement;
                file.value = file.defaultValue;
                return;
            }
            setCSVFile(e.target.files[0]);
        }
    };

    const uploadCSV = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (csvFile === null) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('invite-list', csvFile);
        formData.append('eventId', eventId);
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL + '/invite-csv', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                // Remove file from input upon success
                setCSVFile(null);
                const file = document.getElementById('invite-csv') as HTMLInputElement;
                file.value = file.defaultValue;
                setIsUploading(false);
                if (res.status === 200) {
                    res.json().then((data) => {
                        if (!data) {
                            displaySnack('Something went wrong, please try again later.', { variant: 'error' });
                            return;
                        }
                        const { isError, message } = data as { isError: boolean; message: string };
                        if (isError) displaySnack(message, { variant: 'error' });
                        else displaySnack('Invites sent.', { variant: 'success' });
                    });
                } else {
                    displaySnack('Invites failed to upload.', { variant: 'error' });
                }
            })
            .catch((err) => {
                console.error(err);
                setIsUploading(false);
            });
    };

    return (
        <Grid container className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    <CreateInvite onSubmit={close} eventId={eventId} />
                </DialogContent>
            </ResponsiveDialog>
            <Grid container justifyContent='right'>
                <Grid item paddingRight='1rem'>
                    <Button style={{ margin: theme.spacing(2, 0) }} onClick={toggleInviteLink} variant='outlined'>
                        {open ? 'Hide invite link' : 'Reveal invite link'}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        style={{ margin: theme.spacing(2, 0) }}
                        onClick={openFormDialog}
                        variant='outlined'
                        startIcon={<Add />}
                    >
                        Invite
                    </Button>
                </Grid>
            </Grid>
            <Grid container justifyContent='center'>
                <Collapse in={open} style={{ display: 'flex', flex: 1 }}>
                    <CopyText TextFieldProps={{ label: 'Invite Link' }} text={link} />
                </Collapse>
            </Grid>
            <Grid container direction='row' alignItems='center' justifyContent='right'>
                <Typography textAlign='center'>Invite Via CSV</Typography>
                <Tooltip title='Header row are required to be: first, last, email' enterTouchDelay={0}>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <input id='invite-csv' type='file' accept='.csv' onChange={attachCSV} />
                <Button disabled={csvFile === null || isUploading} onClick={uploadCSV} variant='outlined'>
                    Upload CSV
                </Button>
            </Grid>
            <Grid container direction='column' alignItems='center' justifyContent='center'>
                <InvitedUsersList isVisible={true} fragmentRef={invitedUsersListFragmentRef} />
            </Grid>
        </Grid>
    );
};
