import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    Toolbar,
    useMediaQuery,
    IconButton,
    Button,
    ClickAwayListener,
} from '@mui/material';
import type { DrawerProps } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '@local/lib/useAuth';

type MenuOptions = 'Dashboard' | 'Admin Menu' | 'About';

const studentDrawerItems = ['Dashboard', 'About'] as Array<MenuOptions>;
const teacherDrawerItems = ['Dashboard', 'About'] as Array<MenuOptions>;
const adminDrawerItems = ['Dashboard', 'Admin Menu', 'About'] as Array<MenuOptions>;

interface Props extends DrawerProps {
    handleDrawerClose: () => void;
}

export function TemporaryDrawer({ handleDrawerClose, ...restProps }: Props) {
    const router = useRouter();
    const theme = useTheme();
    const { isLoading, isTeacher, isAdmin } = useAuth();

    const navigateTo = (text: MenuOptions) => () => {
        switch (text) {
            case 'Dashboard':
                router.push('/dashboard');
                break;
            case 'Admin Menu':
                router.push('/admin');
                break;
            default:
                router.push('/');
                break;
        }
    };

    const getListByRole = () => {
        if (isLoading) return [];
        if (isTeacher) return teacherDrawerItems;
        if (isAdmin) return adminDrawerItems;
        return studentDrawerItems;
    };

    return (
        <Drawer variant='temporary' {...restProps}>
            <Toolbar>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {getListByRole().map((text, index) => (
                    <ListItem key={index}>
                        <Button onClick={navigateTo(text)}>{text}</Button>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
