import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import DoneIcon from '@material-ui/icons/Done';

import TextField from 'components/TextField';
import EditableText from 'components/EditableText';
import { SentimentSatisfied } from '@material-ui/icons';

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
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        {/* ROUTING: to page to upload new photo */}
                        <TextField
                            inputProps={{ 'aria-label': 'First Name' }}
                            label='First Name'
                            aria-label='First Name'
                            required
                            type='text'
                            placeholder='Your First Name Here'
                            onChange={() => {}}
                        />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <TextField
                            inputProps={{ 'aria-label': 'E-mail' }}
                            label='E-mail'
                            aria-label='E-mail'
                            required
                            type='email'
                            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
                            // pattern is not recoginzed as a prop but is valid html
                            // pattern=""
                            placeholder='Your E-mail Here'
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
                            onChange={() => {}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

// less touch (mobile) friendly, but also works, if we want a `save` button
export function UserProfileEditable({ img }: Props) {
    const classes = useStyles();
    const [emailState, setState] = React.useState(
        'less touch (mobile) friendly, but also works, if we want a `save` button'
    );

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <EditableText
                            value={emailState}
                            // change later to use endpoint for backend
                            onChange={(str) => setState(str)}
                            label='Your E-mail'
                            inputProps={{
                                type: 'email',
                                'aria-label': 'E-mail',
                                placeholder: 'Your E-mail Here',
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
