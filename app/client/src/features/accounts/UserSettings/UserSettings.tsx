import * as React from 'react';
import { Grid, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ResponsiveDialog } from '@local/components/ResponsiveDialog';

import { SettingsMenu } from '@local/components/SettingsMenu/SettingsMenu';
import { useUser } from '@local/features/accounts';

import { ModifyUserEmail, ModifyUserPassword, DeleteAccount } from './components';

interface Props {
    id?: string;
}

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
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);
    const { user } = useUser();

    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    const sections = [
        {
            title: 'Account Settings',
            description: 'View Account Settings',
            component: !user ? (
                <></>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ModifyUserEmail user={user} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <ModifyUserPassword user={user} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <DeleteAccount user={user} />
                    </Grid>
                </Grid>
            ),
        },
    ];

    return (
        <div
            id={id}
            style={{
                width: lgUpBreakpoint ? '80%' : '100%',
                height: '100%',
                marginLeft: lgUpBreakpoint ? '250px' : '0px',
            }}
        >
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
