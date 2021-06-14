/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Button,
    DialogContent,
    Menu,
    MenuItem,
    ListItemSecondaryAction,
    IconButton,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import { Add, MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { graphql, useFragment } from 'react-relay';

import type {
    ModeratorEventSettingsFragment$key,
    ModeratorEventSettingsFragment$data,
} from '@local/__generated__/ModeratorEventSettingsFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { ArrayElement } from '@local/utils/ts-utils';
import { CreateModerator } from './CreateModerator';
import { UpdateModerator } from './UpdateModerator';
import { DeleteModerator } from './DeleteModerator';

interface EventSettingsProps {
    fragmentRef: ModeratorEventSettingsFragment$key;
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

export const MODERATER_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment ModeratorEventSettingsFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String", defaultValue: "" }) {
        id
        moderators(first: $first, after: $after) @connection(key: "ModeratorEventSettingsFragment_moderators") {
            __id
            edges {
                cursor
                node {
                    id
                    firstName
                    lastName
                    avatar
                    email
                }
            }
        }
    }
`;

type TModerator = ArrayElement<
    NonNullable<NonNullable<ModeratorEventSettingsFragment$data['moderators']>['edges']>
>['node'];
interface TState {
    isFormDialogOpen: boolean;
    isConfDialogOpen: boolean;
    anchorEl: HTMLElement | null;
    focusedModerator: TModerator | null;
}

type Action =
    | { type: 'dialog/create-moderator'; payload?: never }
    | { type: 'dialog/update-moderator'; payload?: never }
    | { type: 'dialog/delete-moderator'; payload?: never }
    | { type: 'dialog/close-all'; payload?: never }
    | { type: 'moderators/focus'; payload: { moderator: TModerator; anchorEl: HTMLElement } };

const reducer = (state: TState, action: Action): TState => {
    switch (action.type) {
        case 'dialog/create-moderator':
            // clear focused moderator if any, open the form dialog, close any other dialogs
            return {
                ...state,
                focusedModerator: null,
                isFormDialogOpen: true,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'dialog/update-moderator':
            // if there's no focused moderator, then we cannot try to update null!
            if (state.focusedModerator === null) return state;
            // ensure everything else is closed
            return {
                ...state,
                isFormDialogOpen: true,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'dialog/delete-moderator':
            // if there's no focused moderator, cannot try to delete that one
            if (state.focusedModerator === null) return state;
            // close all other possible dialogs, open confirmation dialog
            return {
                ...state,
                isFormDialogOpen: false,
                isConfDialogOpen: true,
                anchorEl: null,
            };
        case 'moderators/focus':
            // assign payload as the focused moderator and anchor El
            return {
                ...state,
                anchorEl: action.payload.anchorEl,
                focusedModerator: action.payload.moderator,
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

export const ModeratorEventSettings = ({ fragmentRef, className }: EventSettingsProps) => {
    const { moderators, id: eventId } = useFragment(MODERATER_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const moderatorEdges = React.useMemo(() => moderators?.edges?.map(({ node }) => node) || [], [moderators?.edges]);
    const connections = React.useMemo(() => (moderators?.__id ? [moderators.__id] : []), [moderators]);
    const [{ isFormDialogOpen, isConfDialogOpen, anchorEl, focusedModerator }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        anchorEl: null,
        focusedModerator: null,
    });
    const classes = useStyles();

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    // open the more-vert menu
    const openMenu = (moderator: TModerator) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        dispatch({ type: 'moderators/focus', payload: { moderator, anchorEl: e.currentTarget } });

    // open the update form
    const openUpdateForm = () => dispatch({ type: 'dialog/update-moderator' });

    // // open the deletion prompt
    const promptDelete = () => dispatch({ type: 'dialog/delete-moderator' });

    // // open the form for creating a new moderator
    const openFormDialog = () => dispatch({ type: 'dialog/create-moderator' });

    return (
        <Grid container justify='center' className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    {focusedModerator !== null ? (
                        <UpdateModerator
                            onSubmit={close}
                            form={{ email: focusedModerator.email ?? '' }}
                            eventId={eventId}
                        />
                    ) : (
                        <CreateModerator onSubmit={close} eventId={eventId} connections={connections} />
                    )}
                </DialogContent>
            </ResponsiveDialog>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close}>
                <MenuItem onClick={openUpdateForm}>Update</MenuItem>
                <MenuItem className={classes.red} onClick={promptDelete}>
                    Delete
                </MenuItem>
            </Menu>
            <DeleteModerator
                open={isConfDialogOpen}
                onClose={close}
                title={`Delete "${focusedModerator?.email}" moderator?`}
                onConfirm={close}
                moderatorId={focusedModerator?.id || ''}
                eventId={eventId}
                connections={connections}
            >
                <>
                    Are you sure you want to delete the&nbsp;
                    <b>{focusedModerator?.firstName}</b> moderator?
                </>
            </DeleteModerator>
            {moderatorEdges.length > 0 ? (
                <List className={classes.listRoot} disablePadding>
                    {moderatorEdges.map(({ firstName, lastName, id, email, avatar }) => (
                        <ListItem key={id} disableGutters>
                            <ListItemAvatar>
                                <Avatar src={avatar || undefined} />
                            </ListItemAvatar>
                            <ListItemText primary={`${firstName} ${lastName}`} secondary={email} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={openMenu({ id, firstName, lastName, email, avatar })}>
                                    <MoreVert />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body2' color='textSecondary'>
                    No moderators to display
                </Typography>
            )}
            <Grid container justify='flex-end'>
                <Button variant='outlined' onClick={openFormDialog} startIcon={<Add />}>
                    Add Moderator
                </Button>
            </Grid>
        </Grid>
    );
};
