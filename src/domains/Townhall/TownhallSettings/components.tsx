import React, { useRef } from 'react';
import {
    Grid,
    FormControlLabel,
    Switch,
    Collapse,
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
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import type {
    // TownhallAttachment,
    TownhallSettings,
    Moderator,
    Speaker,
} from 'prytaneum-typings';

import useSnack from 'hooks/useSnack';
import SettingsList from 'components/SettingsList';
import Dialog from 'components/Dialog';
import SettingsItem from 'components/SettingsItem';
import TextField from 'components/TextField';
// import UploadField from 'components/UploadField';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SpeakerForm from '../SpeakerForm';
import { TownhallContext } from '../Contexts/Townhall';
import text from './help-text';

interface Props<T extends keyof TownhallSettings> {
    onChange: (change: TownhallSettings[T]) => void;
    value: TownhallSettings[T];
}

const areEqual = <
    U extends keyof TownhallSettings,
    T extends { value: TownhallSettings[U] }
>(
    { value: prevValue }: T,
    { value: nextValue }: T
) => JSON.stringify(prevValue) === JSON.stringify(nextValue);

const useStyles = makeStyles(() => ({
    fullWidth: {
        width: '100%',
    },
}));

export const ChatSettings = React.memo(function ChatSettings({
    onChange,
    value,
}: Props<'chat'>) {
    const classes = useStyles();
    const ref = useRef(value);
    const handleChange = (key: keyof typeof value) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        if (key === 'enabled') {
            if (ref.current.enabled === checked) onChange(ref.current);
            else
                onChange({
                    enabled: checked,
                    automated: checked && value.automated,
                });
        } else onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem helpText={text.chat.enabled} name='Enabled'>
                <Switch
                    checked={value.enabled}
                    onChange={handleChange('enabled')}
                />
            </SettingsItem>
            <Collapse in={value.enabled} className={classes.fullWidth}>
                <SettingsItem helpText={text.chat.automated} name='Automated'>
                    <Switch
                        checked={value.automated}
                        onChange={handleChange('automated')}
                    />
                </SettingsItem>
            </Collapse>
        </SettingsList>
    );
},
areEqual);
// TODO: credits settings
// export const CreditsSettings = React.memo(function CreditsSettings({
//     onChange,
//     value,
// }: Props<'credits'>) {
//     const classes = useStyles();
//     const ref = useRef(value);
//     const handleChange = (key: keyof typeof value) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const { checked } = e.target;
//         if (key === 'enabled') {
//             if (ref.current.enabled === checked) onChange(ref.current);
//             else
//                 onChange({
//                     enabled: checked,
//                     list: value.list,
//                 });
//         } else onChange({ ...value, [key]: checked });
//     };
//     return (
//         <SettingsList>
//             <SettingsItem helpText={text.credits.enabled} name='Enabled'>
//                 <Switch
//                     onChange={handleChange('enabled')}
//                     checked={value.enabled}
//                 />
//             </SettingsItem>
//             <Collapse in={value.enabled} className={classes.fullWidth}>
//                 <SettingsItem name='TODO' helpText='TODO'>
//                     <div>TODO</div>
//                 </SettingsItem>
//             </Collapse>
//         </SettingsList>
//     );
// },
// areEqual);

export const QuestionFeedSettings = React.memo(function QuestionFeedSettings({
    onChange,
    value,
}: Props<'questionQueue'>) {
    const handleChange = (key: keyof typeof value) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem
                helpText={text.questionQueue.transparent}
                name='Transparent'
            >
                <Switch
                    checked={value.transparent}
                    onChange={handleChange('transparent')}
                />
            </SettingsItem>
            <SettingsItem
                name='Automated'
                helpText={text.questionQueue.automated}
            >
                <Switch
                    checked={value.automated}
                    onChange={handleChange('automated')}
                />
            </SettingsItem>
        </SettingsList>
    );
},
areEqual);

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
        <Dialog open={open} onClose={onClose}>
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
        </Dialog>
    );
}

const useModStyles = makeStyles(() => ({
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

export function Moderators({ onChange, value }: Props<'moderators'>) {
    const { list: mods } = value;
    const [targetMod, setTargetMod] = React.useState<Moderator | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const classes = useModStyles();
    const [snack] = useSnack();
    function removeModerator(emailToRemove: string) {
        onChange({
            list: value.list.filter(({ email }) => email !== emailToRemove),
        });
        setTargetMod(null);
    }

    function addModerator(emailToAdd: string) {
        const found = value.list.find(({ email }) => email === emailToAdd);
        if (found) snack('User is already a moderator');
        else {
            onChange({
                list: [...value.list, { email: emailToAdd, permissions: [] }],
            });
            setIsFormOpen(false);
        }
    }

    const dialogs = (
        <>
            <ConfirmationDialog
                title={`Remove ${
                    targetMod ? targetMod.email : ''
                } from Moderators`}
                open={Boolean(targetMod)}
                onClose={() => setTargetMod(null)}
                onConfirm={
                    targetMod
                        ? () => removeModerator(targetMod.email)
                        : () => {}
                }
            >
                {`Are you sure you want to remove ${
                    targetMod ? targetMod.email : ''
                } as a moderator?`}
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
            <IconButton
                onClick={() => setIsFormOpen(true)}
                aria-label='add'
                edge='end'
            >
                <AddIcon />
            </IconButton>
        </div>
    );

    if (mods.length === 0)
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
                    {mods.map((mod) => (
                        <ListItem key={mod.email}>
                            <ListItemText primary={mod.email} />
                            <ListItemSecondaryAction>
                                {/* <IconButton
                                    onClick={() => setTargetMod(mod)}
                                    aria-label='edit'
                                >
                                    <EditIcon />
                                </IconButton> */}
                                <IconButton
                                    onClick={() => setTargetMod(mod)}
                                    aria-label='delete'
                                    edge='end'
                                >
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

export function Registration() {
    // const townhall = React.useContext(TownhallContext);
    // const [state, setState] = React.useState(
    //     townhall.settings.registration.reminders
    // );
    // const buildHandler = buildSwitchUpdate<typeof state>(setState);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            // checked={state.enabled}
                            // onChange={buildHandler('enabled')}
                            name='credits-enabled-checkbox'
                        />
                    }
                    label='Enabled'
                />
            </Grid>
            {/* <Collapse in={state.enabled}>
                <Grid item xs={12}>
                    <UploadField onChange={console.log} />
                </Grid>
            </Collapse> */}
            <div>TODO: upload registrants</div>
        </Grid>
    );
}

export function Attachments() {
    const townhall = React.useContext(TownhallContext);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, setState] = React.useState(
        townhall.settings.attachments.list
    );

    // function buildHandler(idx: number, key: 'name' | 'url') {
    //     return (e: React.ChangeEvent<HTMLInputElement>) => {
    //         e.preventDefault();
    //         const { value } = e.target;
    //         setState(
    //             [...state].splice(idx, 1, { ...state[idx], [key]: value })
    //         );
    //     };
    // }

    // function handleAdd(attachment: TownhallAttachment) {
    //     setState([...state, attachment]);
    // }

    // function handleRemove(idx: number) {
    //     setState([...state].splice(idx, 1));
    // }

    // FIXME:
    return (
        <Grid container>
            {state.length === 0 && (
                <Grid item xs={12}>
                    <Typography>No Links to display</Typography>
                </Grid>
            )}
            {/* {state.map(({ name, type }, idx) => (
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
            ))} */}
            <Grid item xs={12}>
                <Button
                    // eslint-disable-next-line no-console
                    onClick={() => console.log('unimplemented')}
                    startIcon={<AddIcon />}
                >
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

const useSpeakerStyles = makeStyles(() => ({
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

export function Speakers({ value, onChange }: Props<'speakers'>) {
    const classes = useSpeakerStyles();
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
