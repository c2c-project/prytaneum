/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Button, DialogContent, Collapse } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useFragment } from 'react-relay';
import { CopyText } from '@local/components/CopyText';

import type { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LoadingButton } from '@local/components/LoadingButton';
import { EVENT_DETAILS_FRAGMENT } from '../EventSettings/EventDetails';
import { CreateInvite } from './CreateInvite';

interface EventSettingsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    listRoot: {
        width: '100%',
    },
    red: {
        color: 'red',
    },
    text: {
        fontSize: '1.3em',
    },
    btn: {
        margin: theme.spacing(2, 0),
    },
}));

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

export const InviteEventSettings = ({ fragmentRef, className }: EventSettingsProps) => {
    const { id: eventId } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);
    const [link, setLink] = React.useState('');
    const [{ isFormDialogOpen }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        anchorEl: null,
    });
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    const openFormDialog = () => dispatch({ type: 'dialog/create-invite' });

    const generateInviteLink = () => {
        // TODO generate token for event if private unless only invites should be used for priavte events
        const inviteLink = `https://prytaneum.io/events/${eventId}/live`;
        setLink(inviteLink);
    };

    const toggleInviteLink = () => {
        if (link === '') generateInviteLink();
        setOpen(!open);
    };

    return (
        <Grid container justifyContent='center' className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    <CreateInvite onSubmit={close} eventId={eventId} />
                </DialogContent>
            </ResponsiveDialog>
            <Grid container justifyContent='space-between'>
                <Grid item container justifyContent='center' xs={6}>
                    <Collapse in={open}>
                        <CopyText TextFieldProps={{ label: 'Invite Link' }} className={classes.text} text={link} />
                    </Collapse>
                </Grid>
                <Grid item justifyContent='center' xs='auto'>
                    <LoadingButton loading={false}>
                        <Button className={classes.btn} onClick={toggleInviteLink} variant='outlined'>
                            {open ? 'Hide invite link' : 'Reveal invite link'}
                        </Button>
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid item container justifyContent='center' direction='column' alignItems='flex-end'>
                <Button className={classes.btn} onClick={openFormDialog} variant='outlined' startIcon={<Add />}>
                    Invite
                </Button>
            </Grid>
        </Grid>
    );
};
