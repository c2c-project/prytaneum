/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import AdminPanelSettingsIcon from '@material-ui/icons/AdminPanelSettings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { AnimateSharedLayout, motion } from 'framer-motion';
import type { User } from 'prytaneum-typings';

import history from 'utils/history';
import {
    StyledSubheader,
    StyledDivider,
    StyledListItemIcon,
    StyledListItem,
} from './StyledComponents';
import MovingBg from './MovingBg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 240, // think this is from material.io spec, I just know this number
        padding: theme.spacing(0, 1.5),
        position: 'sticky',
        flex: 1,
        // height + margin
        top: 64 + theme.spacing(3), // visual testing for height of the toolbar
    },
}));

enum Nav {
    'Townhall List',
    'User List',
    'Admin Settings',
    'Dashboard',
}
type Keys = keyof typeof Nav;

interface Props {
    user: User;
    /**
     * this is mainly used as an extra affect of click an item
     */
    onClick?: () => void;
}

const defaultProps = {
    onClick: undefined,
};

const urls: Record<Keys, string> = {
    'Townhall List': '/app/organizer/my-townhalls',
    'User List': '/app/admin/user-list',
    'Admin Settings': '/app/admin/settings',
    Dashboard: '/app/home',
};

function getInitialState(): Keys {
    const { location } = history;
    const curr = location.pathname;

    const found = Object.entries(urls).find(([, path]) => curr.includes(path));

    if (found) return found[0] as Keys;
    return 'Dashboard';
}

// TODO: (low) maybe some way to get the white text effect as the background moves? idk
export default function SideNav({ user, onClick }: Props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<Keys>(getInitialState);
    const isAdmin = React.useMemo(() => user.roles.includes('admin'), [
        user.roles,
    ]);
    const isOrganizer = React.useMemo(() => user.roles.includes('organizer'), [
        user.roles,
    ]);

    function handleClick(key: Keys) {
        return () => {
            setSelected(key);
            history.push(urls[key]);
            if (onClick) onClick();
        };
    }

    return (
        <List component='nav' className={classes.root}>
            <motion.div
                key='side-nav'
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ ease: 'easeInOut' }}
            >
                <AnimateSharedLayout>
                    <StyledListItem
                        button
                        onClick={handleClick('Dashboard')}
                        selected={selected === 'Dashboard'}
                    >
                        {selected === 'Dashboard' && <MovingBg />}
                        <StyledListItemIcon>
                            <DashboardIcon />
                        </StyledListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </StyledListItem>
                    {isOrganizer && (
                        <>
                            <StyledSubheader>Organizer</StyledSubheader>
                            <StyledDivider />

                            <StyledListItem
                                button
                                onClick={handleClick('Townhall List')}
                                selected={selected === 'Townhall List'}
                            >
                                {selected === 'Townhall List' && <MovingBg />}
                                <StyledListItemIcon>
                                    <ListIcon />
                                </StyledListItemIcon>
                                <ListItemText primary='Townhall List' />
                            </StyledListItem>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <StyledSubheader>Administrator</StyledSubheader>
                            <StyledDivider />

                            <StyledListItem
                                button
                                onClick={handleClick('User List')}
                                selected={selected === 'User List'}
                            >
                                {selected === 'User List' && <MovingBg />}
                                <StyledListItemIcon>
                                    <ListAltIcon />
                                </StyledListItemIcon>
                                <ListItemText primary='User List' />
                            </StyledListItem>

                            <StyledListItem
                                button
                                onClick={handleClick('Admin Settings')}
                                selected={selected === 'Admin Settings'}
                            >
                                {selected === 'Admin Settings' && <MovingBg />}
                                <StyledListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </StyledListItemIcon>
                                <ListItemText primary='Admin Settings' />
                            </StyledListItem>
                        </>
                    )}
                </AnimateSharedLayout>
            </motion.div>
        </List>
    );
}

SideNav.defaultProps = defaultProps;
