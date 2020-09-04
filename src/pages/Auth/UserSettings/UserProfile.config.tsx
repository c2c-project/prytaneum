import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function UserProfile() {
    return {
        title: 'User',
        sectionData: [
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg', // TODO pull from db of users for pic
                title: 'user.Fname user.Lname', // TODO pull from db of users for name
                subtitle: (
                    <Grid
                        component='span'
                        container
                        spacing={2}
                        alignContent='center'
                    >
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
                                value='push to db for password'
                                onChange={() => {}}
                                label='email'
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
            },
        ],
    };
}
