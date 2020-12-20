import React from 'react';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { IconButton, Tooltip } from '@material-ui/core';

import { ThemeSelector } from 'contexts/Theme';

export default function UserTheme() {
    const [toggle] = React.useContext(ThemeSelector);

    return (
        <Tooltip title='Toggle Theme'>
            <IconButton color='inherit' edge='start' onClick={toggle}>
                <InvertColorsIcon />
            </IconButton>
        </Tooltip>
    );
}
