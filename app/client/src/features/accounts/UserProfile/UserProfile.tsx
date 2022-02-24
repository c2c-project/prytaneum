import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import DoneIcon from '@mui/icons-material/Done';

import { TextField } from '@local/components/TextField';

interface Props {
    // eslint-disable-next-line react/require-default-props
    img?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 1, 1, 1),
        height: '100%',
        width: '100%',
    },
}));

export default function UserProfile({ img }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid component='span' item xs={12}>
                    <Avatar src={img} alt='Profile Avatar' />
                    {/* ROUTING: to page to upload new photo */}
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        inputProps={{ 'aria-label': 'E-mail' }}
                        label='E-mail'
                        aria-label='E-mail'
                        required
                        type='text'
                        value='TODO'
                        onChange={() => {}}
                    />
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        inputProps={{ 'aria-label': 'Password' }}
                        label='Password'
                        aria-label='Password'
                        required
                        type='password'
                        value='TODO'
                        onChange={() => {}}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
