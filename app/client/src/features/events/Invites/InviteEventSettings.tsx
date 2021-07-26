/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import {
    Grid,
    Button,
    DialogContent,
} from '@material-ui/core';
import { Add, MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { graphql, useFragment } from 'react-relay';

import type { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { EVENT_DETAILS_FRAGMENT } from '../EventSettings/EventDetails'
import { CreateInvite } from './CreateInvite';

interface EventSettingsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

const useStyles = makeStyles(() => ({
    listRoot: {
        width: '100%',
    },
    red: {
        color: 'red',
    },
}));

interface TState {
    isFormDialogOpen: boolean;
    isConfDialogOpen: boolean;
    anchorEl: HTMLElement | null;
}

type Action =
    | { type: 'dialog/create-invite'; payload?: never }
    | { type: 'dialog/close-all'; payload?: never };

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
    // const moderatorEdges = React.useMemo(() => moderators?.edges?.map(({ node }) => node) || [], [moderators?.edges]);
    // const connections = React.useMemo(() => (moderators?.__id ? [moderators.__id] : []), [moderators]);
    const [{ isFormDialogOpen, isConfDialogOpen, anchorEl }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        anchorEl: null,
    });
    const classes = useStyles();

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    const openFormDialog = () => dispatch({ type: 'dialog/create-invite' });

    const generateInviteLink = () => {
        const inviteLink = `http://localhost:8080/events/${eventId}/live`;
        // TODO copy link to clipboard
    };

    return (
        <Grid container justify='center' className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    <CreateInvite onSubmit={close} eventId={eventId} />
                </DialogContent>
            </ResponsiveDialog>
            <Grid container justify='flex-end'>
                <Button variant='outlined' onClick={openFormDialog} startIcon={<Add />}>
                    Invite
                </Button>
                <Button variant='outlined' onClick={generateInviteLink} startIcon={<Add />}>
                    Generate Invite Link
                </Button>
            </Grid>
        </Grid>
    );
};
