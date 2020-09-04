import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ListItem } from '@material-ui/core';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';
import SectionList from 'components/SectionList';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        // not necessary anymore?
        // marginTop: '64-px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

export default function UserSettings() {
    let anonymous = true; // TODO, should be part of the profile pulled from db
    let notify = true; // TODO see above
    // const darkmode = false; // TODO see above
    // const colorscheme = <b>TODO</b>; // TODO see above
    // const history = useHistory();
    const classes = useStyles();

    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: string
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };

    // needed for dialogs
    const [openAppearance, setOpenAppearance] = React.useState(false);
    const [openLogout, setOpenLogout] = React.useState(false);
    const [openDisable, setOpenDisable] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const [openAboutUs, setOpenAboutUs] = React.useState(false);
    const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
    const [openTOS, setOpenTOS] = React.useState(false);

    const openStateArr: {
        s: [
            string,
            JSX.Element,
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ];
    }[] = [
        {
            s: [
                'Appearance',
                <>
                    <h1>Dark mode: </h1>
                    <h2>Color scheme: </h2>
                </>,
                openAppearance,
                setOpenAppearance,
            ],
        },
        {
            s: [
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
        },
        {
            s: [
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
        },
        {
            s: [
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
        },
        {
            s: [
                'Feedback',
                <span>hows our driving</span>,
                openFeedback,
                setOpenFeedback,
            ],
        },
        {
            s: [
                'About Us',
                <span>
                    <h1>This was made somehow by some people.</h1>
                </span>,
                openAboutUs,
                setOpenAboutUs,
            ],
        },
        {
            s: [
                'Privacy Policy',
                <span>
                    <h1>Information is important.</h1>
                </span>,
                openPrivacyPolicy,
                setOpenPrivacyPolicy,
            ],
        },
        {
            s: [
                'TOS',
                <span>plz no hurt us we no hurt u -- Carolyn</span>,
                openTOS,
                setOpenTOS,
            ],
        },
    ];

    const userProfile = {
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
                                onChange={(e) => handleChange(e, 'username')}
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
                                onChange={(e) => handleChange(e, 'email')}
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
                                onChange={(e) => handleChange(e, 'password')}
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

    const options = {
        title: 'Options',
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
                            <Button
                                component='span'
                                // use state for options
                                // flag in userProfile should have a field for anonymous
                                // react is only re-rendered when use/set state is used
                                // same value of variable is not kept upon refreshing
                                onClick={() => {
                                    anonymous = !anonymous;
                                }}
                            >
                                Appear anonymous:
                            </Button>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <Button
                                component='span'
                                onClick={() => {
                                    notify = !notify;
                                }}
                            >
                                Notify me about upcoming Townhalls:
                            </Button>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => setOpenAppearance(true)}
                            >
                                Appearance
                            </ListItem>
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    const AccountSettings = {
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

    const Information = {
        title: 'About Prytaneum',
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
                                onClick={() => setOpenFeedback(true)}
                            >
                                Feedback
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => setOpenAboutUs(true)}
                            >
                                About Us
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => setOpenPrivacyPolicy(true)}
                            >
                                Privacy Policy
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => setOpenTOS(true)}
                            >
                                Terms of Service
                            </ListItem>
                        </Grid>
                    </Grid>
                ),
            },
        ],
    };

    const sections = [
        {
            title: userProfile.title,
            sectionData: userProfile.sectionData,
        },
        {
            title: options.title,
            sectionData: options.sectionData,
        },
        {
            title: AccountSettings.title,
            sectionData: AccountSettings.sectionData,
        },
        {
            title: Information.title,
            sectionData: Information.sectionData,
        },
    ];

    return (
        <Container
            maxWidth='md'
            disableGutters
            style={{
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
            }}
        >
            <Paper className={classes.paper}>
                <MemoryRouter initialEntries={['/User Settings']}>
                    <Route path='/:title'>
                        <AppBar back />
                    </Route>
                </MemoryRouter>
                <SectionList sections={sections} />
                {openStateArr.map(({ s }) => (
                    <Dialog
                        open={s[2]}
                        title={s[0]}
                        onClose={() => s[3](false)}
                    >
                        {s[1]}
                    </Dialog>
                ))}
            </Paper>
        </Container>
    );
}

/*
 - React components can be saved in state
 - make own list instead of using seciton list, to get rid of clickable area that does nothing 
    - look at listcomponent and make a new one
 - TODO:
    - Separate Dialog from Dialog Content (pass them in as children)
    - move sections to their own file
    - [DONE] Move Dialogs into return
    - [DONE] dont use var
    - [DONE] fix eslint errors
    - [DONE, bc we got rid of button in SectionList] make own list component
*/
