import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';

export default function UserProfile() {
    const image = 'https://i.imgur.com/3beQH5s.jpeg';
    return {
        title: 'fName lName',
        content: (
            <Grid component='span' container spacing={2} alignContent='center'>
                <Grid component='span' item xs={12}>
                    <Avatar src={image} alt='Profile Avatar' />
                    {/* ROUTING: to page to upload new photo?*/}
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        id='username'
                        required
                        fullWidth
                        variant='outlined'
                        type='text'
                        value='pull from db for username'
                        onChange={() => {}}
                        label='Username'
                        spellCheck={false}
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                    />
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        id='email'
                        required
                        fullWidth
                        variant='outlined'
                        type='email'
                        value='push to db for email'
                        onChange={() => {}}
                        label='Email'
                        spellCheck={false}
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                    />
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        id='password'
                        required
                        fullWidth
                        variant='outlined'
                        type='password'
                        value='push to db for password'
                        onChange={() => {}}
                        label='Password'
                        spellCheck={false}
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                    />
                </Grid>
            </Grid>
        ),
    };
}
