import * as React from 'react';
import {
    Grid,
    Typography,
    Button,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '@local/graphql-types';

import { useSnack } from '@local/hooks/useSnack';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { TextField } from '@local/components/TextField';
import { ConfirmationDialog } from '@local/components/ConfirmationDialog';
import { Props } from './utils';

function AddModeratorForm({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (form: { email: string }) => void;
}) {
    const [state, setState] = React.useState({ email: '' });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };
    return (
        <ResponsiveDialog open={open} onClose={onClose}>
            <DialogTitle>Add New Moderator</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label='Email'
                        type='email'
                        value={state.email}
                        onChange={(e) => {
                            const { value } = e.target;
                            setState({ email: value });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='submit' variant='contained' color='primary'>
                        Confirm
                    </Button>
                </DialogActions>
            </form>
        </ResponsiveDialog>
    );
}

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

function ModeratorSettings({ onChange, value }: Props<'moderators'>) {
    const [targetMod, setTargetMod] = React.useState<User | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const classes = useStyles();
    const [snack] = useSnack();
    function removeModerator(emailToRemove: string) {
        onChange(value.filter(({ email }) => email !== emailToRemove));
        setTargetMod(null);
    }

    function addModerator(emailToAdd: string) {
        const found = value.find(({ email }) => email === emailToAdd);
        if (found) snack('User is already a moderator');
        else {
            onChange([...value.list, { email: emailToAdd, permissions: [] }]);
            setIsFormOpen(false);
        }
    }

    const dialogs = (
        <>
            <ConfirmationDialog
                title={`Remove ${targetMod ? targetMod.email : ''} from Moderators`}
                open={Boolean(targetMod)}
                onClose={() => setTargetMod(null)}
                onConfirm={targetMod ? () => removeModerator(targetMod.email) : () => {}}
            >
                {`Are you sure you want to remove ${targetMod ? targetMod.email : ''} as a moderator?`}
            </ConfirmationDialog>
            <AddModeratorForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={({ email }) => addModerator(email)}
            />
        </>
    );

    const title = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ flexGrow: 1 }} variant='overline'>
                Moderator List
            </Typography>
            <IconButton onClick={() => setIsFormOpen(true)} aria-label='add' edge='end'>
                <AddIcon />
            </IconButton>
        </div>
    );

    if (value.length === 0)
        return (
            <Grid container>
                {dialogs}
                <Grid item xs={12}>
                    {title}
                </Grid>
                <Grid item xs={12}>
                    <Typography>No Moderators to display</Typography>
                </Grid>
            </Grid>
        );

    return (
        <>
            {dialogs}
            <Grid container>
                <Grid item xs={12}>
                    {title}
                </Grid>
                <List className={classes.listRoot}>
                    {value.map(({ firstName, lastName, userId, email}) => (
                        <ListItem key={userId}>
                            <ListItemText primary={`${firstName} ${lastName}`} />
                            <ListItemSecondaryAction>
                                {/* <IconButton
                                    onClick={() => setTargetMod(mod)}
                                    aria-label='edit'
                                >
                                    <EditIcon />
                                </IconButton> */}
                                <IconButton onClick={() => setTargetMod(userId)} aria-label='delete' edge='end'>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </>
    );
}

export default React.memo(ModeratorSettings);
