import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    img?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: `${theme.spacing(0)}px 5px ${theme.spacing(1)}px 5px`,
        height: '100%',
        width: '100%',
    },
    grid: {
        padding: '10px 5px 10px 5px',
    },
}));

export default function UserProfile({ img }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                component='span'
                container
                alignContent='center'
                className={classes.grid}
            >
                <Grid component='span' item xs={12} className={classes.grid}>
                    <Avatar src={img} alt='Profile Avatar' />
                    {/* ROUTING: to page to upload new photo*/}
                </Grid>
                <Grid component='span' item xs={12} className={classes.grid}>
                    <TextField
                        inputProps={{ 'aria-label': 'Username'}}
                        label='Username'
                        aria-label='Username'
                        required
                        type='text'
                        value='pull from db for username'
                        onChange={() => {}}
                        spellCheck={false}
                    />
                </Grid>
                <Grid component='span' item xs={12} className={classes.grid}>
                    <TextField
                        inputProps={{ 'aria-label': 'Email'}}
                        label='Email'
                        aria-label='Email'
                        required
                        type='email'
                        value='push to db for email'
                        onChange={() => {}}
                        spellCheck={false}
                    />
                </Grid>
                <Grid component='span' item xs={12} className={classes.grid}>
                    <TextField
                        inputProps={{ 'aria-label': 'Password'}}
                        label='Password'
                        aria-label='Password'
                        required
                        type='password'
                        value='push to db for password'
                        onChange={() => {}}
                        spellCheck={false}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
