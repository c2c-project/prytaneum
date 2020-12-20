import React from 'react';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { IconButton, Tooltip, IconButtonProps } from '@material-ui/core';

import { ThemeSelector } from 'contexts/Theme';

export default function UserTheme({
    className,
}: Pick<IconButtonProps, 'className'>) {
    const [toggle] = React.useContext(ThemeSelector);

    return (
        <Tooltip title='Toggle Theme'>
            <IconButton
                color='inherit'
                edge='start'
                onClick={toggle}
                className={className}
            >
                <InvertColorsIcon />
            </IconButton>
        </Tooltip>
    );
}
