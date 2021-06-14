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
import { graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay';

import type { UserSideNavQuery } from '@local/__generated__/UserSideNavQuery.graphql';
import { MovingBg } from '@local/layout/SideNav/MovingBg';
import {
    StyledSubheader,
    StyledDivider,
    StyledListItemIcon,
    StyledListItem,
} from '@local/layout/SideNav/StyledComponents';
import { Skeleton } from '@material-ui/lab';

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

export interface UserSideNavProps {
    queryRef: PreloadedQuery<UserSideNavQuery>;
    /**
     * this is mainly used as an extra affect of click an item
     */
    onClick?: () => void;
}

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

// only need to know that the user is logged in for now, later we'll check some roles here or something
// and populate the side nav based on the data
export const USER_SIDE_NAV_QUERY = graphql`
    query UserSideNavQuery {
        me {
            ...useUserFragment
        }
    }
`;

export function UserSideNavLoader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton width={200} height={40} />
            <Skeleton width={200} height={40} />
            <Skeleton width={200} height={40} />
        </div>
    );
}

export function UserSideNav({ queryRef, onClick }: UserSideNavProps) {
    const classes = useStyles();
    const router = useRouter();
    const data = usePreloadedQuery(USER_SIDE_NAV_QUERY, queryRef);
    const [selected, setSelected] = React.useState<Keys | undefined>(findTab(router.pathname));

    function handleClick(key: Keys) {
        return () => {
            setSelected(key);
            router.push(urls[key]);
            if (onClick) onClick();
        };
    }

    React.useEffect(() => {
        if (findTab(router.pathname) !== selected) setSelected(findTab(router.pathname));
    }, [router.pathname, selected]);

    return (
        <List component='nav' className={classes.root}>
            <AnimateSharedLayout>
                {/* <StyledListItem button onClick={handleClick('Dashboard')} selected={selected === 'Dashboard'}>
                    {selected === 'Dashboard' && <MovingBg />}
                    <StyledListItemIcon>
                        <DashboardIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Dashboard' />
                </StyledListItem> */}
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
                {/* <>
                    <StyledSubheader>Administrator</StyledSubheader>
                    <StyledDivider />

                    <StyledListItem button onClick={handleClick('User List')} selected={selected === 'User List'}>
                        {selected === 'User List' && <MovingBg />}
                        <StyledListItemIcon>
                            <ListAltIcon />
                        </StyledListItemIcon>
                        <ListItemText primary='User List' />
                    </StyledListItem>
                </> */}
            </AnimateSharedLayout>
        </List>
    );
}
