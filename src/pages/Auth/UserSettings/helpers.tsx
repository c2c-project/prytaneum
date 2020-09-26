import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import TextField from 'components/TextField';

// all really small one time user components go here
interface DisplayItem {
    text: string;
    component: JSX.Element;
}

interface Props {
    list: DisplayItem[];
    setContent: (c: JSX.Element) => void;
}
export const ButtonList = ({ list, setContent }: Props) => (
    <List>
        {list.map(({ text, component }) => (
            <li>
                <ListItem
                    key={text}
                    button
                    onClick={() => setContent(component)}
                >
                    <ListItemText primary={text} />
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
        <button 
            type='button' 
            onClick={() => {}}
        >
            Notify me about upcoming Townhalls
        </button>
    </span>
);

export const Appearance = () => (
    <span>
        <h1>
            Dark mode
        </h1>
        <h1>
            Color Scheme
        </h1>
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

export const DisableAccount = () => (
    // ROUTING: to /Login after disabled
    <span>
        <h1>
            Disable Account?
            <p>
                You will no longer receive notifications about Town Halls and
                you can no longer join live Town Halls. You will still be able
                to log into your account. Please enter your password below twice
                to confirm.
            </p>
        </h1>
        <TextField
            label='Please enter your password'
            required
            type='password'
            value=''
            onChange={() => {}}
            
            spellCheck={false}
        />
        <TextField
            label='Please enter your password again to DISABLE your account'
            required
            type='password'
            value=''
            onChange={() => {}}
            spellCheck={false}
        />
    </span>
);

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
            label='Please enter your password'
            required
            variant='outlined'
            type='password'
            value=''
            onChange={() => {}}
            spellCheck={false}
        />
        <TextField
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
