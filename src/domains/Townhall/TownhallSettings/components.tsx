import React from 'react';
import {
    // Typography,
    Grid,
    // Button,
    FormControlLabel,
    Switch,
    // FormGroup,
    Collapse,
    Typography,
    Button,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from 'components/Dialog';
import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import SettingsItem from 'components/SettingsItem';
import TextField from 'components/TextField';
import UploadField from 'components/UploadField';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { User } from 'types';
import Help from 'components/Help';
import { getModInfo } from '../api';
import { TownhallContext } from '../Contexts/Townhall';
import text from './help-text';

/* DEPTH = 3 CURRYING HERE, 
    top to bottom: 
        1. Pass in the setState function
        2. Pass in the key of the checkbox in the state
        3. handle the change in checkboxes state
*/
const buildSwitchUpdate = <U extends Record<string, boolean | string[]>>(
    setState: React.Dispatch<React.SetStateAction<U>>
) => (id: keyof U) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { checked } = e.target;
    setState((prev) => ({ ...prev, [id]: checked }));
};

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',
    },
}));

export function ChatSettings() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.chat);
    const buildHandler = buildSwitchUpdate<typeof state>(setState);
    const classes = useStyles();
    // TODO: API Request
    return (
        <Grid container>
            <Grid item xs={12}>
                <SettingsItem helpText={text.chat.enabled} name='Enabled'>
                    <Switch
                        checked={state.enabled}
                        onChange={buildHandler('enabled')}
                    />
                </SettingsItem>
            </Grid>
            <Collapse in={state.enabled} className={classes.fullWidth}>
                <Grid item xs={12}>
                    <SettingsItem
                        helpText={text.chat.automated}
                        name='Automated'
                    >
                        <Switch
                            checked={state.enabled && state.automated}
                            onChange={buildHandler('automated')}
                        />
                    </SettingsItem>
                </Grid>
            </Collapse>
        </Grid>
    );
}

export function CreditsSettings() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.credits);
    const buildHandler = buildSwitchUpdate<typeof state>(setState);
    const classes = useStyles();
    return (
        <Grid container>
            <Grid container item xs={12} justify='space-between'>
                <SettingsItem helpText={text.credits.enabled} name='Enabled'>
                    <Switch
                        onChange={buildHandler('enabled')}
                        checked={state.enabled}
                    />
                </SettingsItem>
            </Grid>
            <Collapse in={state.enabled} className={classes.fullWidth}>
                <Grid container justify='space-between' item xs={12}>
                    <Grid item xs='auto'>
                        <UploadField onChange={console.log} />
                    </Grid>
                    <Grid item xs='auto'>
                        <Help edge='end'>{text.credits.list}</Help>
                    </Grid>
                </Grid>
            </Collapse>
        </Grid>
    );
}

export function QuestionFeedSettings() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.questionQueue);
    const buildHandler = buildSwitchUpdate<typeof state>(setState);
    return (
        <Grid container>
            <Grid item xs={12} container justify='space-between'>
                <SettingsItem
                    helpText={text.questionQueue.transparent}
                    name='Transparent'
                >
                    <Switch
                        checked={state.transparent}
                        onChange={buildHandler('transparent')}
                    />
                </SettingsItem>
            </Grid>
            <Grid item xs={12} container justify='space-between'>
                <SettingsItem
                    name='Automated'
                    helpText={text.questionQueue.automated}
                >
                    <Switch
                        checked={state.automated}
                        onChange={buildHandler('automated')}
                    />
                </SettingsItem>
            </Grid>
        </Grid>
    );
}

function AddModeratorForm({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Moderator</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField label='Email' type='email' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='submit' variant='contained' color='primary'>
                        Confirm
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export function Moderators({ isOpen }: { isOpen: boolean }) {
    const townhall = React.useContext(TownhallContext);
    const [mods, setMods] = React.useState<Pick<User, 'email' | '_id'>[]>([]);
    const [dialogContent, setDialogContent] = React.useState<string | null>(
        null
    );
    const [isFormOpen, setIsFormopen] = React.useState(false);
    const [get, isLoading] = useEndpoint(() => getModInfo(townhall._id), {
        onSuccess: ({ data }) => {
            setMods(data.moderators);
        },
    });
    React.useEffect(() => {
        if (isOpen) get();
    }, [isOpen, get]);

    const addMod = (
        <Button
            fullWidth
            onClick={() => setIsFormopen(true)}
            startIcon={<AddIcon />}
        >
            Add Moderator
        </Button>
    );

    if (isLoading) return <Loader />;

    if (mods.length === 0)
        return (
            <Grid container spacing={1}>
                <Typography>No Moderators to display</Typography>
                <Grid item xs={12}>
                    {addMod}
                </Grid>
            </Grid>
        );

    return (
        <Grid container spacing={1}>
            <ConfirmationDialog
                title={`Remove ${dialogContent || ''} from Moderators`}
                open={Boolean(dialogContent)}
                onClose={() => setDialogContent(null)}
                onConfirm={console.log}
            >
                {`Are you sure you want to remove ${
                    dialogContent || ''
                } as a moderator?`}
            </ConfirmationDialog>
            <AddModeratorForm
                open={isFormOpen}
                onClose={() => setIsFormopen(false)}
            />
            <Grid item xs={12}>
                {addMod}
            </Grid>
            {mods.map(({ _id, email }) => (
                <Grid container justify='space-between' item xs={12} key={_id}>
                    <Typography>{email.address}</Typography>
                    <IconButton onClick={() => setDialogContent(email.address)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            ))}
        </Grid>
    );
}

export function Registration() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(
        townhall.settings.registration.reminders
    );
    const buildHandler = buildSwitchUpdate<typeof state>(setState);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.enabled}
                            onChange={buildHandler('enabled')}
                            name='credits-enabled-checkbox'
                        />
                    }
                    label='Enabled'
                />
            </Grid>
            <Collapse in={state.enabled}>
                <Grid item xs={12}>
                    <UploadField onChange={console.log} />
                </Grid>
            </Collapse>
            <div>TODO: upload registrants</div>
        </Grid>
    );
}

export function Links() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.links.list);

    function buildHandler(idx: number, key: 'name' | 'url') {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const { value } = e.target;
            setState(
                [...state].splice(idx, 1, { ...state[idx], [key]: value })
            );
        };
    }

    function handleAdd() {
        setState([...state, { name: '', url: '' }]);
    }

    function handleRemove(idx: number) {
        setState([...state].splice(idx, 1));
    }

    // FIXME:
    return (
        <Grid container>
            {state.length === 0 && (
                <Grid item xs={12}>
                    <Typography>No Links to display</Typography>
                </Grid>
            )}
            {state.map(({ url, name }, idx) => (
                <Grid container item xs={12} alignItems='center'>
                    <Grid item xs={11} container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label='Name'
                                value={name}
                                onChange={buildHandler(idx, 'name')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='URL'
                                value={url}
                                onChange={buildHandler(idx, 'url')}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs='auto' style={{ flexGrow: 1 }}>
                        <Grid container justify='flex-end' item xs='auto'>
                            <IconButton
                                onClick={() => handleRemove(idx)}
                                edge='end'
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button onClick={handleAdd} startIcon={<AddIcon />}>
                    Add Link
                </Button>
            </Grid>
        </Grid>
    );
}

export function ExportData() {
    return <div />;
}

export function Preview() {
    return <div />;
}
