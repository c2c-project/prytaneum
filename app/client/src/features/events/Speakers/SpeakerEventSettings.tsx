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
    SpeakerEventSettingsFragment$key,
    SpeakerEventSettingsFragment$data,
} from '@local/__generated__/SpeakerEventSettingsFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { ArrayElement } from '@local/utils/ts-utils';
import { CreateSpeaker } from './CreateSpeaker';
import { DeleteSpeaker } from './DeleteSpeaker';
import { UpdateSpeaker } from './UpdateSpeaker';

interface EventSettingsProps {
    fragmentRef: SpeakerEventSettingsFragment$key;
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

// all this for an array element type :\
export type TSpeaker = ArrayElement<
    NonNullable<NonNullable<SpeakerEventSettingsFragment$data['speakers']>['edges']>
>['node'];

interface TState {
    isFormDialogOpen: boolean;
    isConfDialogOpen: boolean;
    // list: TSpeaker[];
    anchorEl: HTMLElement | null;
    focusedSpeaker: TSpeaker | null;
}

export const SPEAKER_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment SpeakerEventSettingsFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String", defaultValue: "" }) {
        id
        speakers(first: $first, after: $after) @connection(key: "SpeakerEventSettingsFragment_speakers") {
            __id
            edges {
                node {
                    id
                    eventId
                    name
                    title
                    description
                    pictureUrl
                    email
                }
                cursor
            }
        }
    }
`;

type Action =
    | { type: 'dialog/create-speaker'; payload?: never }
    | { type: 'dialog/update-speaker'; payload?: never }
    | { type: 'dialog/delete-speaker'; payload?: never }
    | { type: 'dialog/close-all'; payload?: never }
    | { type: 'speakers/focus'; payload: { speaker: TSpeaker; anchorEl: HTMLElement } };

const reducer = (state: TState, action: Action): TState => {
    switch (action.type) {
        case 'dialog/create-speaker':
            // clear focused video if any, open the form dialog, close any other dialogs
            return { ...state, focusedSpeaker: null, isFormDialogOpen: true, isConfDialogOpen: false, anchorEl: null };
        case 'dialog/update-speaker':
            // if there's no focused video, then we cannot try to update null!
            if (state.focusedSpeaker === null) return state;
            // ensure everything else is closed
            return {
                ...state,
                isFormDialogOpen: true,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'dialog/delete-speaker':
            // if there's no focused video, cannot try to delete that one
            if (state.focusedSpeaker === null) return state;
            // close all other possible dialogs, open confirmation dialog
            return {
                ...state,
                isFormDialogOpen: false,
                isConfDialogOpen: true,
                anchorEl: null,
            };
        case 'speakers/focus':
            // assign payload as the focused video and anchor El
            return {
                ...state,
                anchorEl: action.payload.anchorEl,
                focusedSpeaker: action.payload.speaker,
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

export const SpeakerEventSettings = ({ fragmentRef, className }: EventSettingsProps) => {
    const { speakers, id: eventId } = useFragment(SPEAKER_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const speakerEdges = React.useMemo(() => speakers?.edges || [], [speakers]);
    const connections = React.useMemo(() => (speakers?.__id ? [speakers.__id] : []), [speakers]);
    const [{ isFormDialogOpen, isConfDialogOpen, anchorEl, focusedSpeaker }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        // list: speakers ? [...speakers] : [],
        anchorEl: null,
        focusedSpeaker: null,
    });
    const classes = useStyles();

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    // open the more-vert menu
    const openMenu = (speaker: TSpeaker) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        dispatch({ type: 'speakers/focus', payload: { speaker, anchorEl: e.currentTarget } });

    // append a speaker to the list of speakers
    // const appendSpeaker = (createdSpeaker: TCreatedSpeaker) =>
    //     createdSpeaker && dispatch({ type: 'speakers/append', payload: createdSpeaker });

    // open the update form
    const openUpdateForm = () => dispatch({ type: 'dialog/update-speaker' });

    // update a speaker in the list
    // const updateSpeaker = (updatedSpeaker: TUpdatedSpeaker) =>
    //     updatedSpeaker && dispatch({ type: 'speakers/update-focused', payload: updatedSpeaker });

    // open the deletion prompt
    const promptDelete = () => dispatch({ type: 'dialog/delete-speaker' });

    // open the form for creating a new video
    const openFormDialog = () => dispatch({ type: 'dialog/create-speaker' });

    // handle speaker deletion when the user confirms
    // const handleDelete = () => {
    //     if (focusedSpeaker === null) return;
    //     dispatch({ type: 'speakers/remove-focused' });
    // };

    return (
        <Grid container justify='center' className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    {focusedSpeaker !== null ? (
                        <UpdateSpeaker
                            onSubmit={close}
                            form={{ ...focusedSpeaker }}
                            speakerId={focusedSpeaker.id}
                            eventId={eventId}
                        />
                    ) : (
                        <CreateSpeaker eventId={eventId} onSubmit={close} connections={connections} />
                    )}
                </DialogContent>
            </ResponsiveDialog>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close}>
                <MenuItem onClick={openUpdateForm}>Update</MenuItem>
                <MenuItem className={classes.red} onClick={promptDelete}>
                    Delete
                </MenuItem>
            </Menu>
            <DeleteSpeaker
                open={isConfDialogOpen}
                onClose={close}
                title={`Delete "${focusedSpeaker?.name}"?`}
                onConfirm={close}
                speakerId={focusedSpeaker?.id}
                eventId={eventId}
                connections={connections}
            >
                <>
                    Are you sure you want to delete&nbsp;
                    <b>{focusedSpeaker?.name}</b> from the list of speakers?
                </>
            </DeleteSpeaker>
            {speakerEdges.length > 0 ? (
                <List className={classes.listRoot} disablePadding>
                    {speakerEdges.map(({ node }) => (
                        <ListItem key={node.id} disableGutters>
                            <ListItemAvatar>
                                <Avatar src={node.pictureUrl || undefined} />
                            </ListItemAvatar>
                            <ListItemText primary={node.name} secondary={node.title} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={openMenu(node)}>
                                    <MoreVert />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body2' color='textSecondary'>
                    No speakers to display
                </Typography>
            )}
            <Grid container justify='flex-end'>
                <Button variant='outlined' onClick={openFormDialog} startIcon={<Add />}>
                    Add Speaker
                </Button>
            </Grid>
        </Grid>
    );
};
