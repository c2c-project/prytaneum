import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import Component from './TooltipIconButton';

export default {
    title: 'Components/TooltipIconButton',
    component: Component,
};

export function TooltipIconButton() {
    return (
        <IconButton onClick={() => {}}>
            <Component tooltip='Search' onClick={() => {}}>
                <SearchIcon />
            </Component>
        </IconButton>
    );
}
