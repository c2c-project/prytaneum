import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * Template/config for displaying AccountSettings section on user settings page
 * contains dialogs for Logout, Disable account, and delete account
 * @category Component
 * @constructor AccountSettings
 */

/**
 * cahnge this to look/fcn like other components
 * ideas
 * 1. have separate fcns that return separate parts, so we have an ASLogout() => return (<button>)
 * 2. move them outside of components
 * 3. make each usersettings a diff page, so usersettings just has buttons that routes to pages
 * 4. make a wrapper for them: pass in a title and section, it returns the JSON
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
                            onClick={() => {}} // ROUTING: to /Login or /TownhallList
                        >
                            Click here to return to the home page
                        </button>
                    </span>
                ),
            },
            {
                text: 'Disable Account', // ROUTING: to /Login once disabled
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
                text: 'Delete Account', // ROUTING: to /Login after deleted
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
