/* eslint-disable react/require-default-props */
import * as React from 'react';
import {
    Menu,
    MenuItem,
    // Tooltip,
    ListItemText,
    Avatar,
    ButtonBase,
    Typography,
    ListItemIcon,
    useMediaQuery,
    IconButton,
    Button,
} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MoreVert from '@material-ui/icons/MoreVert';
import Settings from '@material-ui/icons/Settings';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Skeleton } from '@material-ui/lab';
import { graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay';

import type { UserMenuQuery } from '@local/__generated__/UserMenuQuery.graphql';
import { useIsClient } from '@local/hooks';
import { useUser } from '../useUser';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
        height: '100%',
        width: 'auto',
    },
    paper: {
        marginTop: theme.spacing(2),
    },
    avatar: {
        marginRight: theme.spacing(1.5),
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
    icon: {
        alignSelf: 'center',
        transform: 'rotate(0deg)',
        fontSize: '2em',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    iconOpen: {
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        transform: 'rotate(180deg)',
    },
    item: {
        marginRight: theme.spacing(1),
    },
}));

export function UserMenuLoader() {
    const classes = useStyles();
    return (
        <>
            <Skeleton variant='circle' className={classes.avatar} />
            <Skeleton height='100%' width={100} />
        </>
    );
}

export const USER_MENU_QUERY = graphql`
    query UserMenuQuery {
        me {
            ...useUserFragment
        }
    }
`;

export interface UserMenuProps {
    className?: string;
    queryRef: PreloadedQuery<UserMenuQuery>;
}

function UserName() {
    const [user] = useUser();
    const classes = useStyles();

    return (
        <>
            {user?.firstName && <Avatar className={classes.avatar}>{user.firstName[0]}</Avatar>}
            <Typography variant='button' color='inherit'>
                {`${user?.firstName} ${user?.lastName}`.toUpperCase()}
            </Typography>
        </>
    );
}

export function UserMenu({ className, queryRef }: UserMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const data = usePreloadedQuery<UserMenuQuery>(USER_MENU_QUERY, queryRef);
    const isSignedIn = React.useMemo(() => !!data.me, [data]);
    const [, setUser] = useUser();
    const isClient = useIsClient();
    const classes = useStyles();

    const isOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
    const width = React.useRef(0);
    const theme = useTheme();

    React.useEffect(() => {
        if (data) setUser(data.me);
    }, [data, setUser]);

    // if server, then default to rendering desktop version and not mobile
    // TODO: determine if the user is on desktop or mobile and render appropriately
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm')) || !isClient;
    const router = useRouter();

    const handleNavigation = (path: string) => () => router.push(path);

    function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { currentTarget } = e;
        width.current = currentTarget.clientWidth;
        setAnchorEl(currentTarget);
    }

    const menuButton = React.useMemo(() => {
        if (isSmUp)
            return (
                <ButtonBase
                    color='inherit'
                    onClick={handleOpen}
                    aria-label='user-menu'
                    className={classes.button}
                    disableRipple
                    disableTouchRipple
                >
                    <UserName />
                    <ArrowDropDown className={!isOpen ? classes.icon : clsx([classes.icon, classes.iconOpen])} />
                </ButtonBase>
            );
        return (
            <IconButton onClick={handleOpen}>
                <MoreVert />
            </IconButton>
        );
    }, [isSmUp, classes, isOpen]);

    return (
        <div className={className}>
            {!isSignedIn && (
                <>
                    <Button
                        color='primary'
                        variant='contained'
                        className={classes.item}
                        onClick={handleNavigation('/login')}
                    >
                        Login
                    </Button>
                    <Button color='primary' variant='outlined' onClick={handleNavigation('/register')}>
                        Register
                    </Button>
                </>
            )}
            {isSignedIn && (
                <>
                    {menuButton}
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        getContentAnchorEl={null}
                        PaperProps={{
                            className: classes.paper,
                            style: { minWidth: width.current },
                        }}
                    >
                        {!isSmUp && (
                            <MenuItem button={false} divider>
                                <UserName />
                            </MenuItem>
                        )}
                        <MenuItem button onClick={handleNavigation('/settings')}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </MenuItem>
                        <MenuItem button onClick={handleNavigation('/logout')}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
}
