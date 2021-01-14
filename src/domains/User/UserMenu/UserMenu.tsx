/* eslint-disable react/require-default-props */
import React from 'react';
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
    useTheme,
    IconButton,
} from '@material-ui/core';
import {
    ArrowDropDown,
    // TODO: finish up user settings
    // Settings,
    ExitToApp,
    MoreVert,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import useUser from 'hooks/useUser';
import { handleNavigation } from 'utils/history';

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
}));

interface Props {
    className?: string;
    links: {
        settings: string;
        logout: string;
    };
}

export default function UserMenu({ className, links }: Props) {
    const [user] = useUser();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const classes = useStyles();
    const isOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
    const width = React.useRef(0);
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { currentTarget } = e;
        width.current = currentTarget.clientWidth;
        setAnchorEl(currentTarget);
    }

    const userInfo = React.useMemo(
        () =>
            user ? (
                <>
                    <Avatar className={classes.avatar}>
                        {user.name.first[0]}
                    </Avatar>
                    <Typography variant='button' color='inherit'>
                        {`${user.name.first} ${user.name.last}`.toUpperCase()}
                    </Typography>
                </>
            ) : (
                <> </>
            ),
        [classes, user]
    );

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
                    {userInfo}
                    <ArrowDropDown
                        className={
                            !isOpen
                                ? classes.icon
                                : clsx([classes.icon, classes.iconOpen])
                        }
                    />
                </ButtonBase>
            );
        return (
            <IconButton onClick={handleOpen}>
                <MoreVert />
            </IconButton>
        );
    }, [isSmUp, classes, userInfo, isOpen]);

    return (
        <div className={className}>
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
                        {userInfo}
                    </MenuItem>
                )}
                {/* <MenuItem button onClick={handleNavigation(links.settings)}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary='Settings' />
                </MenuItem> */}
                <MenuItem button onClick={handleNavigation(links.logout)}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </MenuItem>
            </Menu>
        </div>
    );
}
