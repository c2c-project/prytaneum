import * as React from 'react';
import {
    // Typography,
    Grid,
    Divider,
} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';

import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
// import AppBar from 'layout/AppBar';

import { SettingsMenu }  from '@local/components/SettingsMenu/SettingsMenu';
import { useUser } from '@local/features/accounts';
import { useRouter } from 'next/router';
import UserProfile from '../UserProfile/UserProfile';

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
 * Account settings shows an option to logout, disable or delete account, each one opens a dialog box, see @local/components/dialog
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
    const router = useRouter();

    const handleNavigation = (path: string) => () => router.push(path);


    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    // this is a dev mistake, there's no <User> context higher up in the tree
    if (!user) handleNavigation('/');

    const sections = [
        // {
        //     title: 'General',
        //     description: 'General User Settings',
        //     component: (
        //         <Grid container spacing={2}>
        //             <Grid item xs={12}>
        //                 <UserProfile img='https://i.imgur.com/3beQH5s.jpeg' />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Divider />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <DisableAccount />
        //             </Grid>
        //         </Grid>
        //     ),
        // },
        // {
        //     title: 'Townhall',
        //     description: 'Change Townhall Settings',
        //     component: <TownhallUserSettings settings={user?.settings} />,
        // },
        // {
        //     title: 'Notifications',
        //     description: 'Customize Notifications Receieved',
        //     component: <NotificationSettings settings={user?.settings} />,
        // },
        {
            title: 'Account Settings',
            description: 'View Account Settings',
            component: (
                <div>
                    Test
                </div>
            ),
        },
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
            <SettingsMenu config={sections} />
            <ResponsiveDialog open={open} onClose={() => setContent(null)}>
                {cont || <div />}
            </ResponsiveDialog>
        </div>
    );
}

UserSettings.defaultProps = {
    id: 'UserSettings',
};
