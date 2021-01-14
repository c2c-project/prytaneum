import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Switch,
    Collapse,
    // Typography,
    Button,
} from '@material-ui/core';
import type { ClientSafeUser } from 'prytaneum-typings';
// import { makeStyles } from '@material-ui/core/styles';

import ConfirmationDialog from 'components/ConfirmationDialog';
import SettingsList from 'components/SettingsList';

import TextField from 'components/TextField';

import SettingsItem from 'components/SettingsItem';
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

// const useStyles = makeStyles((theme) => ({
//     indent: {
//         paddingLeft: theme.spacing(4),
//     },
//     fullWidth: {
//         width: '100%',
//     },
// }));

// all really small one time user components go here
interface DisplayItem {
    title: string;
    component: JSX.Element;
}

interface Props {
    list: DisplayItem[];
    setContent: (c: JSX.Element) => void;
}

export function TownhallUserSettings({ user }: { user: ClientSafeUser }) {
    const [state, setState] = React.useState(user.settings.townhall);
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    // TODO: API Request
    return (
        <SettingsList>
            <SettingsItem
                helpText={text.townhall.anonymous}
                name='Appear Anonymous'
            >
                <Switch
                    checked={state.anonymous}
                    onChange={buildHandler('anonymous')}
                />
            </SettingsItem>
        </SettingsList>
    );
}

export function NotificationSettings({ user }: { user: ClientSafeUser }) {
    const [state, setState] = React.useState(user.settings.notifications);
    const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    // TODO: API Request
    return (
        <SettingsList>
            <SettingsItem helpText={text.notifications.enabled} name='Enabled'>
                <Switch
                    checked={state.enabled}
                    onChange={buildHandler('enabled')}
                />
            </SettingsItem>
            <Collapse in={state.enabled}>
                <SettingsItem
                    helpText={text.notifications.types}
                    name='Notification Types'
                >
                    <div>TODO</div>
                </SettingsItem>
            </Collapse>
        </SettingsList>
    );
}

// export function ModifyUserEmail({ user }: { user: User }) {
//     return (
//         <Typography>
//             todo
//         </Typography>
//     )
// }

export const ButtonList = ({ list, setContent }: Props) => (
    <List>
        {list.map(({ title, component }) => (
            <li key={title}>
                <ListItem
                    key={title}
                    button
                    onClick={() => setContent(component)}
                >
                    <ListItemText primary={title} />
                </ListItem>
            </li>
        ))}
    </List>
);

export const AppearAnonymous = () => (
    <span>
        <h1>
            {/* TODO: dialog text depends on if they are already anonymous */}
            You will now appear anonymous.
        </h1>
    </span>
);

export const Notifications = () => (
    <span>
        <button type='button' onClick={() => {}}>
            Notify me about upcoming Townhalls
        </button>
    </span>
);

export const Appearance = () => (
    <span>
        <h1>Dark mode</h1>
        <h1>Color Scheme</h1>
    </span>
);

export const Logout = () => (
    <span>
        <button
            type='button'
            onClick={() => {}} // ROUTING: to /Login or /TownhallList
        >
            Click here to return to the home page
        </button>
    </span>
);

export const DisableAccount = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <SettingsItem
                helpText='You will no longer receive notifications about Town Halls and
                    you can no longer join live Town Halls. You will still be able
                    to log into your account.'
                name='Disable Account'
            >
                <Button
                    variant='outlined'
                    onClick={() => setOpen(true)}
                    style={{ color: 'red', borderColor: 'red' }}
                >
                    Disable
                </Button>
            </SettingsItem>
            <ConfirmationDialog
                open={open}
                onClose={() => setOpen(false)}
                // FIXME:
                // eslint-disable-next-line no-console
                onConfirm={() => console.log('TODO')}
                title='Disable Account?'
            >
                You will no longer receive notifications about Town Halls and
                you can no longer join live Town Halls. You will still be able
                to log into your account.
            </ConfirmationDialog>
        </div>
    );
};

export const DeleteAccount = () => (
    // ROUTING: to /Login after deleted
    <span>
        <h1>
            Delete Account?
            <p>
                All of your account information will be erased from Prytaneum.
                This action is irreversible. Please enter your password below
                twice to confirm.
            </p>
        </h1>
        <TextField
            inputProps={{ 'aria-label': 'Enter your password' }}
            label='Please enter your password'
            required
            variant='outlined'
            type='password'
            value=''
            onChange={() => {}}
            spellCheck={false}
        />
        <TextField
            inputProps={{ 'aria-label': 'Enter your password again' }}
            label='Please enter your password again to DELETE your account'
            required
            variant='outlined'
            type='password'
            value=''
            onChange={() => {}}
            spellCheck={false}
        />
    </span>
);

export const Feedback = () => (
    <span>
        <h1> hows our driving? </h1>
    </span>
);

export const AboutUs = () => (
    <span>
        <h1>this was made somehow by some people</h1>
    </span>
);

export const PrivacyPolicy = () => (
    <span>
        <h1>Information is important.</h1>
    </span>
);

export const TermsOfService = () => (
    <span>
        <h1>plz no hurt us we no hurt u</h1>
    </span>
);
