import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import type { Speaker } from 'prytaneum-typings';
import Dialog from 'components/Dialog';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SpeakerForm from '../../Speaker/SpeakerForm';

import { Props, areEqual } from './utils';

const useStyles = makeStyles(() => ({
    listRoot: {
        width: '100%',
        '& .MuiListItem-gutters': {
            paddingLeft: 0,
        },
        '& .MuiListItemSecondaryAction-root': {
            marginRight: '-16px', // icon alignment
        },
    },
}));

const SpeakerDialogForm = ({
    isOpen,
    onSubmit,
    onClose,
    value,
}: {
    isOpen: boolean;
    onSubmit: (form: Speaker) => void;
    onClose: () => void;
    value?: Speaker;
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Speaker Form</DialogTitle>
            <DialogContent>
                <SpeakerForm value={value} onSubmit={onSubmit} />
            </DialogContent>
            {/* <DialogActions>asdf</DialogActions> */}
        </Dialog>
    );
};
SpeakerDialogForm.defaultProps = {
    value: undefined,
};

function Speakers({ value, onChange }: Props<'speakers'>) {
    const classes = useStyles();
    const speakers = value.list;
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    type EditTarget = undefined | [Speaker, number];
    const [editTarget, setEditTarget] = React.useState<EditTarget>(undefined);
    const [removeTarget, setRemoveTarget] = React.useState<EditTarget>(
        undefined
    );

    function removeSpeaker(speakerToRemove: Speaker) {
        onChange({
            list: value.list.filter(
                (speaker) => speaker.name !== speakerToRemove.name
            ),
        });
        setRemoveTarget(undefined);
    }
    function closeDialog() {
        if (isFormOpen) setIsFormOpen(false);
        if (editTarget) setEditTarget(undefined);
    }

    const dialogs = (
        <>
            <SpeakerDialogForm
                isOpen={isFormOpen || Boolean(editTarget)}
                onSubmit={(form) => {
                    if (editTarget) {
                        const [, idx] = editTarget;
                        const listCopy = [...value.list];
                        listCopy[idx] = form;
                        onChange({ list: listCopy });
                    } else onChange({ list: [...value.list, form] });
                    closeDialog();
                }}
                onClose={closeDialog}
                value={editTarget && editTarget[0]}
            />
            <ConfirmationDialog
                title={`Remove ${
                    removeTarget ? removeTarget[0].name : ''
                } from speakers`}
                open={Boolean(removeTarget)}
                onClose={() => setRemoveTarget(undefined)}
                onConfirm={
                    removeTarget
                        ? () => removeSpeaker(removeTarget[0])
                        : () => {}
                }
            >
                {`Are you sure you want to remove ${
                    removeTarget ? removeTarget[0].name : ''
                } as a speaker?`}
            </ConfirmationDialog>
        </>
    );
    const title = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ flexGrow: 1 }} variant='overline'>
                Speaker List
            </Typography>
            <IconButton
                onClick={() => setIsFormOpen(true)}
                aria-label='add'
                edge='end'
            >
                <AddIcon />
            </IconButton>
        </div>
    );

    return (
        <Grid container>
            {dialogs}
            <Typography style={{ flexGrow: 1 }} variant='overline'>
                {title}
            </Typography>
            <Grid item xs={12}>
                <List className={classes.listRoot}>
                    {speakers.map((speaker, idx) => (
                        <ListItem key={speaker.name}>
                            <ListItemAvatar>
                                <Avatar src={speaker.picture}>
                                    {speaker.name[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={speaker.name}
                                secondary={speaker.title}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    aria-label='edit'
                                    onClick={() =>
                                        setEditTarget([speaker, idx])
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label='delete'
                                    edge='end'
                                    onClick={() =>
                                        setRemoveTarget([speaker, idx])
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

export default React.memo(Speakers, areEqual);
