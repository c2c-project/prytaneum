import React from 'react';
import {
    // Typography,
    Grid,
    // Button,
    FormControlLabel,
    Checkbox,
    // FormGroup,
    Collapse,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import TextField from 'components/TextField';
import UploadField from 'components/UploadField';
import Help from 'components/Help';
import { TownhallContext } from '../Contexts/Townhall';
import text from './help-text';

/* DEPTH = 3 CURRYING HERE, 
    top to bottom: 
        1. Pass in the setState function
        2. Pass in the key of the checkbox in the state
        3. handle the change in checkboxes state
*/
const buildCheckboxUpdate = <U extends Record<string, boolean | string[]>>(
    setState: React.Dispatch<React.SetStateAction<U>>
) => (id: keyof U) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { checked } = e.target;
    setState((prev) => ({ ...prev, [id]: checked }));
};

const useStyles = makeStyles((theme) => ({
    indent: {
        paddingLeft: theme.spacing(4),
    },
    fullWidth: {
        width: '100%',
    },
}));

export function ChatSettings() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.chat);
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    const classes = useStyles();
    // TODO: API Request
    return (
        <Grid container>
            <Grid item container justify='space-between' xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.enabled}
                            onChange={buildHandler('enabled')}
                            name='chat-enabled-checkbox'
                        />
                    }
                    label='Enabled'
                />
                <Help edge='end'>{text.chat.enabled}</Help>
            </Grid>
            <Collapse in={state.enabled} className={classes.fullWidth}>
                <Grid
                    item
                    xs={12}
                    container
                    justify='space-between'
                    className={classes.indent}
                >
                    <FormControlLabel
                        disabled={!state.enabled}
                        control={
                            <Checkbox
                                checked={state.automated && state.enabled}
                                onChange={buildHandler('automated')}
                                name='chat-automated-checkbox'
                            />
                        }
                        label='Automate Chat'
                    />
                    <Help edge='end'>{text.chat.automated}</Help>
                </Grid>
            </Collapse>
        </Grid>
    );
}

export function CreditsSettings() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(townhall.settings.credits);
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    const classes = useStyles();
    return (
        <Grid container>
            <Grid container item xs={12} justify='space-between'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.enabled}
                            onChange={buildHandler('enabled')}
                            name='credits-enabled-checkbox'
                        />
                    }
                    label='Enabled'
                />
                <Help edge='end'>{text.credits.enabled}</Help>
            </Grid>
            <Collapse in={state.enabled} className={classes.fullWidth}>
                <Grid container justify='space-between' item xs={12}>
                    <Grid item xs='auto' className={classes.indent}>
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
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    return (
        <Grid container>
            <Grid item xs={12} container justify='space-between'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.transparent}
                            onChange={buildHandler('transparent')}
                            name='question-queue-transparent-checkbox'
                        />
                    }
                    label='Transparent'
                />
                <Help edge='end'>{text.questionQueue.transparent}</Help>
            </Grid>
            <Grid item xs={12} container justify='space-between'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.automated}
                            onChange={buildHandler('automated')}
                            name='question-queue-automated-checkbox'
                        />
                    }
                    label='Automated'
                />
                <Help edge='end'>{text.questionQueue.automated}</Help>
            </Grid>
        </Grid>
    );
}

export function Moderators() {
    // TODO:
    return <div />;
}

export function Registration() {
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState(
        townhall.settings.registration.reminders
    );
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
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
                    <div className={classes.indent}>
                        <UploadField onChange={console.log} />
                    </div>
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
