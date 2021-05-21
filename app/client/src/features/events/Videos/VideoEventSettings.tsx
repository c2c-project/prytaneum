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
} from '@material-ui/core';
import { Add, MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { graphql, useFragment } from 'react-relay';

import { VideoEventSettingsFragment$key } from '@local/__generated__/VideoEventSettingsFragment.graphql';
import { EventVideo } from '@local/graphql-types';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { CreateVideo } from './CreateVideo';
import { UpdateVideo } from './UpdateVideo';
import { DeleteVideo } from './DeleteVideo';

interface EventSettingsProps {
    fragmentRef: VideoEventSettingsFragment$key;
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

export const VIDEO_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment VideoEventSettingsFragment on Event {
        id
        videos {
            id
            url
            lang
        }
    }
`;

interface State {
    isFormDialogOpen: boolean;
    isConfDialogOpen: boolean;
    list: EventVideo[];
    anchorEl: HTMLElement | null;
    focusedVideo: EventVideo | null;
}

type Action =
    | { type: 'dialog/create-video'; payload?: never }
    | { type: 'dialog/update-video'; payload?: never }
    | { type: 'dialog/delete-video'; payload?: never }
    | { type: 'dialog/close-all'; payload?: never }
    | { type: 'videos/append'; payload: EventVideo }
    | { type: 'videos/focus'; payload: { video: EventVideo; anchorEl: HTMLElement } }
    | { type: 'videos/remove-focused'; payload?: never }
    | { type: 'videos/update-focused'; payload: EventVideo };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'dialog/create-video':
            // clear focused video if any, open the form dialog, close any other dialogs
            return { ...state, focusedVideo: null, isFormDialogOpen: true, isConfDialogOpen: false, anchorEl: null };
        case 'dialog/update-video':
            // if there's no focused video, then we cannot try to update null!
            if (state.focusedVideo === null) return state;
            // ensure everything else is closed
            return {
                ...state,
                isFormDialogOpen: true,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'dialog/delete-video':
            // if there's no focused video, cannot try to delete that one
            if (state.focusedVideo === null) return state;
            // close all other possible dialogs, open confirmation dialog
            return {
                ...state,
                isFormDialogOpen: false,
                isConfDialogOpen: true,
                anchorEl: null,
            };
        case 'videos/append':
            // close all dialogs, append payload to list of videos
            return {
                ...state,
                list: [...state.list, action.payload],
                isFormDialogOpen: false,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        case 'videos/focus':
            // assign payload as the focused video and anchor El
            return {
                ...state,
                anchorEl: action.payload.anchorEl,
                focusedVideo: action.payload.video,
            };
        case 'dialog/close-all':
            // close all possible things that are open
            return {
                ...state,
                anchorEl: null,
                isFormDialogOpen: false,
                isConfDialogOpen: false,
            };
        case 'videos/remove-focused': {
            const { focusedVideo } = state;
            if (focusedVideo === null) return state;
            return {
                ...state,
                list: state.list.filter(({ url }) => url !== focusedVideo.url),
                isConfDialogOpen: false,
            };
        }
        case 'videos/update-focused': {
            const { focusedVideo } = state;
            if (focusedVideo === null) return state; // this should never happen

            // logic to replace the focused video with the updated video
            const idx = state.list.findIndex(({ url }) => url === focusedVideo.url);
            const newList = [...state.list];
            newList[idx] = action.payload;

            return {
                ...state,
                list: newList,
                isFormDialogOpen: false,
                isConfDialogOpen: false,
                anchorEl: null,
            };
        }
        default:
            return state;
    }
};

export const VideoEventSettings = ({ fragmentRef, className }: EventSettingsProps) => {
    const { videos, id: eventId } = useFragment(VIDEO_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const [{ isFormDialogOpen, isConfDialogOpen, list, anchorEl, focusedVideo }, dispatch] = React.useReducer(reducer, {
        isFormDialogOpen: false,
        isConfDialogOpen: false,
        list: videos ? [...videos] : [],
        anchorEl: null,
        focusedVideo: null,
    });
    const classes = useStyles();

    // close all dialogs
    const close = () => dispatch({ type: 'dialog/close-all' });

    // open the more-vert menu
    const openMenu = (video: EventVideo) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        dispatch({ type: 'videos/focus', payload: { video, anchorEl: e.currentTarget } });

    // append a video to the list of videos
    const appendVideo = (video: EventVideo | null) => video && dispatch({ type: 'videos/append', payload: video });

    // open the update form
    const openUpdateForm = () => dispatch({ type: 'dialog/update-video' });

    // update a video in the list
    const updateVideo = (updatedVideo: EventVideo | null) =>
        updatedVideo && dispatch({ type: 'videos/update-focused', payload: updatedVideo });

    // open the deletion prompt
    const promptDelete = () => dispatch({ type: 'dialog/delete-video' });

    // open the form for creating a new video
    const openFormDialog = () => dispatch({ type: 'dialog/create-video' });

    // handle video deletion when the user confirms
    const handleDelete = () => {
        if (focusedVideo === null) return; // TODO: snack
        dispatch({ type: 'videos/remove-focused' });
    };

    return (
        <Grid container justify='center' className={className}>
            <ResponsiveDialog open={isFormDialogOpen} onClose={close}>
                <DialogContent>
                    {focusedVideo !== null ? (
                        <UpdateVideo
                            onSubmit={updateVideo}
                            video={{ id: focusedVideo.id, url: focusedVideo.url, lang: focusedVideo.lang }}
                            eventId={eventId}
                        />
                    ) : (
                        <CreateVideo onSubmit={appendVideo} eventId={eventId} />
                    )}
                </DialogContent>
            </ResponsiveDialog>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close}>
                <MenuItem onClick={openUpdateForm}>Update</MenuItem>
                <MenuItem className={classes.red} onClick={promptDelete}>
                    Delete
                </MenuItem>
            </Menu>
            <DeleteVideo
                open={isConfDialogOpen}
                onClose={close}
                title={`Delete "${focusedVideo?.lang}" video?`}
                onConfirm={handleDelete}
                video={focusedVideo}
                eventId={eventId}
            >
                <>
                    Are you sure you want to delete the&nbsp;
                    <b>{focusedVideo?.lang}</b> video?
                </>
            </DeleteVideo>
            {list.length > 0 ? (
                <List className={classes.listRoot} disablePadding>
                    {list.map(({ id, lang, url }) => (
                        <ListItem key={id} disableGutters>
                            <ListItemText primary={lang} secondary={url} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={openMenu({ url, lang, id })}>
                                    <MoreVert />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body2' color='textSecondary'>
                    No videos to display
                </Typography>
            )}
            <Grid container justify='flex-end'>
                <Button onClick={openFormDialog} startIcon={<Add />}>
                    Add Video
                </Button>
            </Grid>
        </Grid>
    );
};
