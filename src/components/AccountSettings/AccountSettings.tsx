import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * Template/config for displaying AccountSettings section on user settings page
 * contains dialogs for Logout, Disable account, and delete account
 * @category Component
 * @constructor AccountSettings
 */

export default function AccountSettings() {
    return {
        title: 'Account Settings',
        dialogData: [
            {
                text: 'Logout',
                component: (
                    <span>
                        <button
                            type='button'
                            onClick={() => {}} // TODO: go to home page
                        >
                            Click here to return to the home page
                        </button>
                    </span>
                ),
            },
            {
                text: 'Disable Account',
                component: (
                    <span>
                        <h1>
                            Disable Account?
                            <p>
                                You will no longer receive notifications about
                                Town Halls and you can no longer join live Town
                                Halls. You will still be able to log into your
                                account. Please enter your password below twice
                                to confirm.
                            </p>
                        </h1>
                        <TextField
                            id='Disable Account Password Entry One'
                            required
                            fullWidth
                            variant='outlined'
                            type='password'
                            value=''
                            onChange={() => {}}
                            label='Please enter your password'
                            spellCheck={false}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                        <TextField
                            id='Disable Account Password Entry Two'
                            required
                            fullWidth
                            variant='outlined'
                            type='password'
                            value=''
                            onChange={() => {}}
                            label='Please enter your password again to DISABLE your account'
                            spellCheck={false}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                    </span>
                ),
            },
            {
                text: 'Delete Account',
                component: (
                    <span>
                        <h1>
                            Delete Account?
                            <p>
                                All of your account information will be erased
                                from Prytaneum. This action is irreversible.
                                Please enter your password below twice to
                                confirm.
                            </p>
                        </h1>
                        <TextField
                            id='Delete Account Password Entry One'
                            required
                            fullWidth
                            variant='outlined'
                            type='password'
                            value=''
                            onChange={() => {}}
                            label='Please enter your password'
                            spellCheck={false}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                        <TextField
                            id='Delete Account Password Entry Two'
                            required
                            fullWidth
                            variant='outlined'
                            type='password'
                            value=''
                            onChange={() => {}}
                            label='Please enter your password again to DELETE your account'
                            spellCheck={false}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                    </span>
                ),
            },
        ],
    };
}
