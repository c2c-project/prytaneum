import * as React from 'react';
import { useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { SettingsMenu } from '@local/components/SettingsMenu/SettingsMenu';

import { ModifyUserEmail, ModifyUserPassword, DeleteAccount, ModifyUserName } from './components';
import { useUserFragment$data } from '@local/__generated__/useUserFragment.graphql';

interface Props {
    user: useUserFragment$data;
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
 */
export default function UserSettings({ user }: Props) {
    const theme = useTheme();
    const xlBreakpointUp = useMediaQuery(theme.breakpoints.up('xl'));
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));

    const getContainerStyles = React.useMemo(() => {
        if (xlBreakpointUp) return { width: '80%', marginLeft: '300px' };
        if (lgBreakpointUp) return { width: '80%', marginLeft: '250px' };
        return { width: '100%' };
    }, [xlBreakpointUp, lgBreakpointUp]);

    return (
        <div id='event-settings-container' style={getContainerStyles}>
            <Typography variant='h2' margin={theme.spacing(0, 0, 2, 0)}>
                Event Settings
            </Typography>
            <SettingsMenu
                config={[
                    {
                        title: 'Username',
                        description: 'Update your name',
                        component: <ModifyUserName user={user} />,
                    },
                    {
                        title: 'Email',
                        description: 'Update your email',
                        component: <ModifyUserEmail user={user} />,
                    },
                    {
                        title: 'Password',
                        description: 'Update your password',
                        component: <ModifyUserPassword user={user} />,
                    },
                    {
                        title: 'Delete Account',
                        description: 'Delete your account',
                        component: <DeleteAccount user={user} />,
                    },
                ]}
            />
        </div>
    );
}
