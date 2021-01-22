import React from 'react';
import {
    // Typography,
    Grid,
    Divider,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

import ResponsiveDialog from 'components/ResponsiveDialog';
// import AppBar from 'layout/AppBar';

import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import useUser from 'hooks/useUser';
import Redirect from 'domains/Logical/Redirect';
import UserProfile from '../UserProfile';

import {
    // ButtonList,
    // AppearAnonymous,
    // Notifications,
    // Appearance,
    // Logout,
    DisableAccount,
    // DeleteAccount,
    // Feedback,
    // AboutUs,
    // PrivacyPolicy,
    // TermsOfService,
    TownhallUserSettings,
    NotificationSettings,
} from './components';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         padding: theme.spacing(2),
//     },
// }));

interface Props {
    id?: string;
}

// const optionsList = [
//     {
//         title: 'Townhall',
//         component: <TownhallUserSettings />,
//     },
//     {
//         title: 'Notifications',
//         component: <Notifications />,
//     },
//     {
//         title: 'Appearance',
//         component: <Appearance />,
//     },
// ];

// const accountSettingsList = [
//     {
//         title: 'Logout',
//         component: <Logout />,
//     },
//     {
//         title: 'Disable Account',
//         component: <DisableAccount />,
//     },
//     {
//         title: 'Delete Account',
//         component: <DeleteAccount />,
//     },
// ];

// const informationList = [
//     {
//         title: 'Feedback',
//         component: <Feedback />,
//     },
//     {
//         title: 'About Us',
//         component: <AboutUs />,
//     },
//     {
//         title: 'Privacy Policy',
//         component: <PrivacyPolicy />,
//     },
//     {
//         title: 'Terms of Service',
//         component: <TermsOfService />,
//     },
// ];

/**
 * Displays the settings for User, using SettingsMenu,
 * it displays the User information like first name, last name, username, email and obfuscated password, so they can change it.
 * To be pulled and pushed from/to database later <br/></br>
 * It also displays options for appearing anonymously, notifcations for upcoming townhalls, darkmode and color scheme (like material UIs website) <br/></br>
 * Account settings shows an option to logout, disable or delete account, each one opens a dialog box, see components/dialog
 * Information is info about us, feedback, ToS and privacy policy
 * @category Pages/Auth
 * @constructor UserSettings
 * @param Props
 * @param {string} id id of the container for testing if it exists or styling. Also just for general specification of the element
 */
export default function UserSettings({ id }: Props) {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);
    const [user] = useUser();

    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    // this is a dev mistake, there's no <User> context higher up in the tree
    if (!user) return <Redirect href='home' />;

    const sections = [
        {
            title: 'General',
            description: 'General User Settings',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <UserProfile img='https://i.imgur.com/3beQH5s.jpeg' />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <DisableAccount />
                    </Grid>
                </Grid>
            ),
        },
        {
            title: 'Townhall',
            description: 'Change townhall settings',
            component: <TownhallUserSettings user={user} />,
        },
        {
            title: 'Notifications',
            description: 'Customize notifications receieved',
            component: <NotificationSettings user={user} />,
        },
        // {
        //     title: 'Account Settings',
        //     description: 'View Account Settings',
        //     component: (
        //         <ButtonList
        //             list={accountSettingsList}
        //             setContent={setContent}
        //         />
        //     ),
        // },
        // {
        //     title: 'Information',
        //     description: 'Additional Information',
        //     component: (
        //         <ButtonList list={informationList} setContent={setContent} />
        //     ),
        // },
    ];

    return (
        <div id={id} style={{ width: '100%', height: '100%' }}>
            <SettingsMenu config={sections} title='User Settings' />
            <ResponsiveDialog open={open} onClose={() => setContent(null)}>
                {cont || <div />}
            </ResponsiveDialog>
        </div>
    );
}

UserSettings.defaultProps = {
    id: 'UserSettings',
};
