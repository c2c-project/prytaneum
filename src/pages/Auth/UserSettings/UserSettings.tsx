/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';

import UserProfile from 'components/UserProfile';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import {
    ButtonList,
    AppearAnonymous,
    Notifications,
    Appearance,
    Logout,
    DisableAccount,
    DeleteAccount,
    Feedback,
    AboutUs,
    PrivacyPolicy,
    TermsOfService,
} from './helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

interface Props {
    id?: string;
}

const options_list = [
    {
        text: 'Appear Anonymous',
        component: <AppearAnonymous />,
    },
    {
        text: 'Notifications',
        component: <Notifications />,
    },
    {
        text: 'Appearance',
        component: <Appearance />,
    },
];

const account_settings_list = [
    {
        text: 'Logout',
        component: <Logout />,
    },
    {
        text: 'Disable Account',
        component: <DisableAccount />,
    },
    {
        text: 'Delete Account',
        component: <DeleteAccount />,
    },
];

const information_list = [
    {
        text: 'Feedback',
        component: <Feedback />,
    },
    {
        text: 'About Us',
        component: <AboutUs />,
    },
    {
        text: 'Privacy Policy',
        component: <PrivacyPolicy />,
    },
    {
        text: 'Terms of Service',
        component: <TermsOfService />,
    },
];


/**
 * Displays the settings for User, using SettingsMenu, it displays the User information like first name, last name, username, email and obfuscated password, so they can change it. To be pulled and pushed from/to database later <br/></br>
 * It also displays options for appearing anonymously, notifcations for upcoming townhalls, darkmode and color scheme (like material UIs website) <br/></br>
 * Account settings shows an option to logout, disable or delete account, each one opens a dialog box, see components/dialog
 * Information is info about us, feedback, ToS and privacy policy
 * @category Pages/Auth
 * @constructor UserSettings
 * @param Props
 * @param {string} id id of the container for testing if it exists or styling. Also just for general specification of the element
 */
export default function UserSettings({ id }: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);

    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    const sections = [
        {
            title: 'fName lName',
            content: <UserProfile img='https://i.imgur.com/3beQH5s.jpeg' />,
        },
        {
            title: 'Options',
            content: <ButtonList list={options_list} setContent={setContent} />,
        },
        {
            title: 'Account Settings',
            content: (
                <ButtonList
                    list={account_settings_list}
                    setContent={setContent}
                />
            ),
        },
        {
            title: 'Information',
            content: (
                <ButtonList list={information_list} setContent={setContent} />
            ),
        },
    ];

    return (
        <Container
            id={id}
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
                {sections.map(({ title, content }) => (
                    <div style={{ height: '100%', top: '0' }}>
                        <SettingsMenu title={title} content={content} />
                    </div>
                ))}
                <Dialog open={open} onClose={() => setContent(null)}>
                    {cont || <div />}
                </Dialog>
            </Paper>
        </Container>
    );
}

UserSettings.defaultProps = {
    id: 'UserSettings',
};
