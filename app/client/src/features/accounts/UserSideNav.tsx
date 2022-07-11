/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { List, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Skeleton } from '@mui/material';
import { AnimateSharedLayout /* motion */ } from 'framer-motion';
import { useRouter } from 'next/router';
import {
    StyledSubheader,
    StyledDivider,
    StyledListItemIcon,
    StyledListItem,
} from '@local/layout/SideNav/StyledComponents';
import { useUser } from '@local/features/accounts';
import { RoleGuard } from '@local/components/RoleGuard';
import { graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay';

import type { UserSideNavQuery } from '@local/__generated__/UserSideNavQuery.graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 1.5),
        flex: 1,
    },
}));

enum Nav {
    'My Organizations',
    'User List',
    // 'Admin Settings',
    'Dashboard',
    'About Us',
    'Getting Started Guide',
    'Organizer Guide',
    'Moderator Guide',
    'Participant Guide',
    'Admin User Dashboard',
    'Admin Event Dashboard',
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
    'About Us': '/aboutus',
    'Getting Started Guide': '/guides/getting-started',
    'Organizer Guide': '/guides/organizer',
    'Moderator Guide': '/guides/moderator',
    'Participant Guide': '/guides/participant',
    'Admin User Dashboard': '/admin/users',
    'Admin Event Dashboard': '/admin/events',
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
    usePreloadedQuery(USER_SIDE_NAV_QUERY, queryRef);
    const { user } = useUser();
    const [selected, setSelected] = React.useState<Keys | undefined>(findTab(router.pathname));
    const [isOrganizer, setIsOrganizer] = React.useState(false);

    function handleClick(key: Keys) {
        return () => {
            setSelected(key);
            router.push(urls[key]);
            if (onClick) onClick();
        };
    }

    React.useEffect(() => {
        if (user?.isOrganizer) setIsOrganizer(true);
        else setIsOrganizer(false);
    }, [user]);

    React.useEffect(() => {
        if (findTab(router.pathname) !== selected) setSelected(findTab(router.pathname));
    }, [router.pathname, selected]);

    return (
        <List component='nav' className={classes.root}>
            <AnimateSharedLayout>
                {!!user ? (
                    <StyledListItem onClick={handleClick('Dashboard')} selected={selected === 'Dashboard'}>
                        <StyledListItemIcon>
                            <DashboardIcon />
                        </StyledListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </StyledListItem>
                ) : (
                    <></>
                )}
                <StyledListItem onClick={handleClick('About Us')} selected={selected === 'About Us'}>
                    <StyledListItemIcon>
                        <PeopleIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='About Us' />
                </StyledListItem>
                <StyledListItem
                    onClick={handleClick('Getting Started Guide')}
                    selected={selected === 'Getting Started Guide'}
                >
                    <StyledListItemIcon>
                        <AssignmentIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Getting Started Guide' />
                </StyledListItem>
                <StyledListItem onClick={handleClick('Organizer Guide')} selected={selected === 'Organizer Guide'}>
                    <StyledListItemIcon>
                        <AssignmentIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Organizer Guide' />
                </StyledListItem>
                <StyledListItem onClick={handleClick('Moderator Guide')} selected={selected === 'Moderator Guide'}>
                    <StyledListItemIcon>
                        <AssignmentIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Moderator Guide' />
                </StyledListItem>
                <StyledListItem onClick={handleClick('Participant Guide')} selected={selected === 'Participant Guide'}>
                    <StyledListItemIcon>
                        <AssignmentIcon />
                    </StyledListItemIcon>
                    <ListItemText primary='Participant Guide' />
                </StyledListItem>
                <RoleGuard organizer={isOrganizer}>
                    <>
                        <StyledSubheader>Organizations</StyledSubheader>
                        <StyledDivider />

                        <StyledListItem
                            onClick={handleClick('My Organizations')}
                            selected={selected === 'My Organizations'}
                        >
                            <StyledListItemIcon>
                                <ListIcon />
                            </StyledListItemIcon>
                            <ListItemText primary='My Organizations' />
                        </StyledListItem>
                    </>
                </RoleGuard>
                {/* <RoleGuard organizer={data.isOrganizer} moderator={isModerator}>
                    <>
                        <StyledSubheader>MODERATOR AND ORGANIZER</StyledSubheader>
                        <StyledDivider />

                        <StyledListItem
                            onClick={handleClick('My Organizations')}
                            selected={selected === 'My Organizations'}
                        >
                            <StyledListItemIcon>
                                <ListIcon />
                            </StyledListItemIcon>
                            <ListItemText primary='MODERATOR AND ORGANIZER' />
                        </StyledListItem>
                    </>
                </RoleGuard> */}
                {user?.isAdmin === true && (
                    <React.Fragment>
                        <StyledSubheader>Admin</StyledSubheader>
                        <StyledDivider />
                        <StyledListItem
                            onClick={handleClick('Admin User Dashboard')}
                            selected={selected === 'Admin User Dashboard'}
                        >
                            <StyledListItemIcon>
                                <ListIcon />
                            </StyledListItemIcon>
                            <ListItemText primary='User Dashboard' />
                        </StyledListItem>
                        <StyledListItem
                            onClick={handleClick('Admin Event Dashboard')}
                            selected={selected === 'Admin Event Dashboard'}
                        >
                            <StyledListItemIcon>
                                <ListIcon />
                            </StyledListItemIcon>
                            <ListItemText primary='Event Dashboard' />
                        </StyledListItem>
                    </React.Fragment>
                )}
            </AnimateSharedLayout>
        </List>
    );
}
