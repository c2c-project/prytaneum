import React from 'react';
import { NotificationsOutlined } from '@material-ui/icons';
import { IconButton, IconButtonProps } from '@material-ui/core';

// TODO: finish this
export default function UserNotifications({
    className,
}: Pick<IconButtonProps, 'className'>) {
    return (
        <IconButton
            aria-label='notifications'
            color='inherit'
            className={className}
        >
            <NotificationsOutlined />
        </IconButton>
    );
}
