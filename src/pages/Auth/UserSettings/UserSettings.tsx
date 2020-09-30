import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
// import AppBar from 'layout/AppBar';

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
    grid: {
        height: '125%',
    },
    paper: {
        padding: theme.spacing(2),
        alignItems: 'top',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        listStyle: 'none',
    },
}));

interface Props {
    id?: string;
}

const optionsList = [
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

const accountSettingsList = [
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

const informationList = [
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
            content: <ButtonList list={optionsList} setContent={setContent} />,
        },
        {
            title: 'Account Settings',
            content: (
                <ButtonList
                    list={accountSettingsList}
                    setContent={setContent}
                />
            ),
        },
        {
            title: 'Information',
            content: (
                <ButtonList list={informationList} setContent={setContent} />
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
                {/* FIXME:
                <MemoryRouter initialEntries={['/User Settings']}>
                    <Route path='/:title'>
                        <AppBar back />
                    </Route>
                </MemoryRouter> */}
                {sections.map(({ title, content }) => (
                    <div key={title} style={{ height: '100%', top: '0' }}>
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
