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
    DialogContent,
} from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ExitToApp from '@mui/icons-material/ExitToApp';
import MoreVert from '@mui/icons-material/MoreVert';
import Settings from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Skeleton } from '@mui/material';
import { usePreloadedQuery, PreloadedQuery } from 'react-relay';

import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useIsClient } from '@local/core';
import { useUser } from '@local/features/accounts/useUser';
import { LoginForm } from '@local/features/accounts/LoginForm';
import { RegisterForm } from '@local/features/accounts/RegisterForm';
import useLogout from '@local/features/accounts/useLogout';
import { USER_CONTEXT_QUERY } from '@local/features/accounts/UserContext';
import { UserContextQuery } from '@local/__generated__/UserContextQuery.graphql';

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
            <Skeleton variant='circular' className={classes.avatar} />
            <Skeleton height='100%' width={100} />
        </>
    );
}

export interface UserMenuProps {
    className?: string;
    queryRef: PreloadedQuery<UserContextQuery>;
}

function UserName() {
    const { user } = useUser();
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

type TButtons = 'login' | 'register' | null;
export function UserMenu({ className, queryRef }: UserMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    // TODO remove unused query
    const data = usePreloadedQuery<UserContextQuery>(USER_CONTEXT_QUERY, queryRef);
    const { user, setUser, setIsLoading } = useUser();
    const isClient = useIsClient();
    const classes = useStyles();
    const isSignedIn = React.useMemo(() => !!user, [user]);

    const isOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
    const width = React.useRef(0);
    const theme = useTheme();

    // if server, then default to rendering desktop version and not mobile
    // TODO: determine if the user is on desktop or mobile and render appropriately
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm')) || !isClient;
    const router = useRouter();
    const { logoutUser } = useLogout({
        onComplete: () => {
            // TODO: find a way to update even live ui without reload
            if (router.pathname === '/events/[id]/live') router.reload();
        },
    });
    const handleNavigation = (path: string) => () => router.push(path);

    React.useEffect(() => {
        if (!data) setIsLoading(true);
        if (data) setIsLoading(false);
        if (data && !user) {
            setUser(data.me);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { currentTarget } = e;
        width.current = currentTarget.clientWidth;
        setAnchorEl(currentTarget);
    }

    const [type, setType] = React.useState<TButtons>(null);

    const handleClick = (btnType: NonNullable<TButtons>) => () => setType(btnType);
    const close = () => setType(null);

    const menuButton = React.useMemo(() => {
        if (isSmUp)
            return (
                <ButtonBase
                    data-test-id='appbar-user-menu'
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
            <IconButton data-test-id='appbar-user-menu' onClick={handleOpen} size='large'>
                <MoreVert />
            </IconButton>
        );
    }, [isSmUp, classes, isOpen]);

    return (
        <div className={className}>
            {!isSignedIn && (
                <>
                    <Button
                        data-test-id='appbar-login-button'
                        color='primary'
                        variant='contained'
                        className={classes.item}
                        onClick={handleClick('login')}
                    >
                        Login
                    </Button>
                    <ResponsiveDialog open={type === 'login'} onClose={close}>
                        <DialogContent>
                            <LoginForm
                                close={close}
                                onSuccess={() => {
                                    router.reload();
                                    close();
                                }}
                            />
                        </DialogContent>
                    </ResponsiveDialog>
                    <Button
                        data-test-id='appbar-register-button'
                        color='primary'
                        variant='outlined'
                        onClick={handleClick('register')}
                    >
                        Register
                    </Button>
                    <ResponsiveDialog open={type === 'register'} onClose={close}>
                        <DialogContent>
                            <RegisterForm
                                onSuccess={() => {
                                    close();
                                    router.reload();
                                }}
                            />
                        </DialogContent>
                    </ResponsiveDialog>
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
                        PaperProps={{
                            className: classes.paper,
                            style: { minWidth: width.current },
                        }}
                    >
                        {!isSmUp && (
                            // FIXME: this will now be a button
                            <MenuItem divider>
                                <UserName />
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleNavigation('/settings')}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </MenuItem>
                        <MenuItem onClick={logoutUser}>
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
