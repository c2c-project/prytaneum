/* eslint-disable */ // FIXME:
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import type { User } from 'prytaneum-typings';
import { motion } from 'framer-motion';

import useEndpoint from '@local/hooks/useEndpoint';
import { getUser } from '@local/domains/Admin/api/api';

import { Grid, Paper, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SettingsMenu, { AccordionData } from '@local/components/SettingsMenu';
import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';
import * as AdminDashboardTypes from '@local/domains/Admin/types';
import { userProfileFormat } from '@local/domains/Admin/helper';

import Fab from '@local/components/Fab';
import Loader from '@local/components/Loader';
import { fadeThroughProps } from '@local/animations/FadeThrough';
import { Tags, MiniProfile, AccountActions } from './@local/components';
import UserPromotion from '../UserPromotion';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        borderRadius: '0px',
        height: '100%',
    },
    list: {
        width: '100%',
        height: '100%',
    },
    settingsContainer: {
        flex: 1,
        marginBottom: theme.spacing(3),
    },
    miniProfileContainer: {
        flex: 1,
        flexGrow: 0,
        marginRight: theme.spacing(2),
    },
    innerMiniProfile: {
        position: 'sticky',
        top: theme.spacing(3),
    },
}));

export interface Props {
    userId: string;
}

const UserProfile = ({ userId }: Props) => {
    const classes = useStyles();
    const [user, setUser] = useState<User | null>(null);
    const [, isLoading] = useEndpoint(() => getUser(userId), {
        onSuccess: (res) => {
            const { user: fetchedUser } = res.data;
            setUser(fetchedUser);
        },
        runOnFirstRender: true,
    });

    const settingsConfig: AccordionData[] = React.useMemo(
        () =>
            user
                ? [
                      {
                          title: 'Roles',
                          description: 'Modify user permissions and roles',
                          component: <UserPromotion user={user} />,
                      },
                      //   {
                      //       title: 'Logs',
                      //       description:
                      //           'Logs of activity associated with this account',
                      //       component: <UserHistory history={user.history} />,
                      //   },
                      {
                          title: 'Account Actions',
                          description:
                              'Various actions that can be done to this account',
                          component: <AccountActions />,
                      },
                  ]
                : [],
        [user]
    );

    if (isLoading || !user) {
        return <Loader />;
    }

    return (
        <div className={classes.root}>
            <Grid container justify='center'>
                <motion.div
                    className={classes.miniProfileContainer}
                    {...fadeThroughProps}
                >
                    <div className={classes.innerMiniProfile}>
                        <MiniProfile name={user.email.address} />
                        <Tags tags={user.roles} emptyMessage='No Tags' />
                    </div>
                </motion.div>
                <div className={classes.settingsContainer}>
                    <SettingsMenu
                        config={settingsConfig}
                        title='Configuation'
                    />
                </div>
            </Grid>
        </div>
    );
};

export default UserProfile;
