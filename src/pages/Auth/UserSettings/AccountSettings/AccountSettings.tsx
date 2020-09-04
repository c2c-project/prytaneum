import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const [openLogout, setOpenLogout] = React.useState(false);
const [openDisable, setOpenDisable] = React.useState(false);
const [openDelete, setOpenDelete] = React.useState(false);

export default function AccountSettingsState() : [string, JSX.Element, boolean, React.Dispatch<React.SetStateAction<boolean>>][] {
    return [
        [
            'Logout',
            <span>
                <button
                    type='button'
                    onClick={() => setOpenLogout(false)} // TODO: go to home page
                >
                    Click here to return to the home page
                </button>
            </span>,
            openLogout,
            setOpenLogout,
        ],
        [
            'Disable Account',
            <span>
                <h1>
                    Disable Account?
                    <p>
                        You will no longer receive notifications about Town
                        Halls and you can no longer join live Town Halls.
                        You will still be able to log into your account.
                        Please enter your password below twice to confirm.
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
            </span>,
            openDisable,
            setOpenDisable,
        ],
        [
            'Delete Account',
            <span>
                <h1>
                    Delete Account?
                    <p>
                        All of your account information will be erased from
                        Prytaneum. This action is irreversible. Please enter
                        your password below twice to confirm.
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
            </span>,
            openDelete,
            setOpenDelete,
        ],
    ];    
}

export const AccountSettings = {
    title: 'Account Settings',
    sectionData: [
        {
            title: '',
            subtitle: (
                <Grid
                    component='span'
                    container
                    spacing={2}
                    alignContent='center'
                >
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenLogout(true)}
                        >
                            Logout
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenDisable(true)}
                        >
                            Disable Account
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenDelete(true)}
                        >
                            Delete Account
                        </ListItem>
                    </Grid>
                </Grid>
            ),
        },
    ],
};