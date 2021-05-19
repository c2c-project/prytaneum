/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
// import { AdminPanelSettingsIcon } from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { AnimateSharedLayout /* motion */ } from 'framer-motion';
import { useRouter } from 'next/router';
// import type { ClientSafeUser } from 'prytaneum-typings';
// import { Update, State } from 'history';

// import history from '@local/utils/history';
import type { User } from '@local/graphql-types';
import { StyledSubheader, StyledDivider, StyledListItemIcon, StyledListItem } from './StyledComponents';
import { MovingBg } from './MovingBg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 240, // think this is from material.io spec, I just know this number
        padding: theme.spacing(0, 1.5),
        flex: 1,
        [theme.breakpoints.up('lg')]: {
            // height + margin
            top: 64 + theme.spacing(6), // visual testing for height of the toolbar
            position: 'fixed',
        },
    },
}));

enum Nav {
    'My Organizations',
    'User List',
    // 'Admin Settings',
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
    'My Organizations': '/organizations/me',
    'User List': '/user-list',
    // 'Admin Settings': '/app/admin/settings',
    Dashboard: '/dashboard',
};

const findTab = (pathname: string): Keys | undefined => {
    const found = Object.entries(urls).find(([, path]) => pathname.includes(path));
    if (found) return found[0] as Keys;
    return undefined;
};

// function getInitialState(): Keys {
//     const { location } = history;
//     const tab = findTab(location.pathname);
//     if (!tab) return 'Dashboard';
//     return tab;
// }

// TODO: (low) maybe some way to get the white text effect as the background moves? idk
export function SideNav({ user, onClick }: Props) {
    const classes = useStyles();
    const router = useRouter();
    const [selected, setSelected] = React.useState<Keys>(findTab(router.pathname));

    // const isAdmin = React.useMemo(() => user.roles.includes('admin'), [user.roles]);
    // const isOrganizer = React.useMemo(() => user.roles.includes('organizer'), [user.roles]);

    function handleClick(key: Keys) {
        return () => {
            setSelected(key);
            router.push(urls[key]);
            if (onClick) onClick();
        };
    }

    // const onUrlChange = React.useCallback(({ location }: Update<State>) => {
    //     const tab = findTab(location.pathname);
    //     if (tab) setSelected(tab);
    // }, []);

    // React.useEffect(() => {
    //     router.events('')
    //     const unlisten = history.listen(onUrlChange);
    //     return unlisten;
    // }, [onUrlChange]);
    React.useEffect(() => {
        if (findTab(router.pathname) !== selected) setSelected(findTab(router.pathname));
    }, [router.pathname, selected]);

    return (
        <List component='nav' className={classes.root}>
            {/* <motion.div
                key='side-nav'
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ ease: 'easeInOut' }}
            > */}
            <AnimateSharedLayout>
                <StyledListItem button onClick={handleClick('Dashboard')} selected={selected === 'Dashboard'}>
                    {selected === 'Dashboard' && <MovingBg />}
                    <StyledListItemIcon>
                        <DashboardIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Dashboard' />
                </StyledListItem>
                {/* {isOrganizer && ( */}
                <>
                    <StyledSubheader>Organizations</StyledSubheader>
                    <StyledDivider />

                    <StyledListItem
                        button
                        onClick={handleClick('My Organizations')}
                        selected={selected === 'My Organizations'}
                    >
                        {selected === 'My Organizations' && <MovingBg />}
                        <StyledListItemIcon>
                            <ListIcon />
                        </StyledListItemIcon>
                        <ListItemText primary='My Organizations' />
                    </StyledListItem>
                </>
                {/* )} */}

                {/* {isAdmin && ( */}
                <>
                    <StyledSubheader>Administrator</StyledSubheader>
                    <StyledDivider />

                    <StyledListItem button onClick={handleClick('User List')} selected={selected === 'User List'}>
                        {selected === 'User List' && <MovingBg />}
                        <StyledListItemIcon>
                            <ListAltIcon />
                        </StyledListItemIcon>
                        <ListItemText primary='User List' />
                    </StyledListItem>

                    {/* <StyledListItem
                        button
                        onClick={handleClick('Admin Settings')}
                        selected={selected === 'Admin Settings'}
                    >
                        {selected === 'Admin Settings' && <MovingBg />}
                        <StyledListItemIcon>
                            <AdminPanelSettingsIcon />
                            </StyledListItemIcon>
                        <ListItemText primary='Admin Settings' />
                    </StyledListItem> */}
                </>
                {/* )} */}
            </AnimateSharedLayout>
            {/* </motion.div> */}
        </List>
    );
}

SideNav.defaultProps = defaultProps;
