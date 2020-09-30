import React from 'react';

import SearchIcon from '@material-ui/icons/SearchOutlined';
import Component from './TooltipIconButton';

export default {
    title: 'Components/TooltipIconButton',
    component: Component,
};

export function TooltipIconButton() {
    return (
        <Component tooltip='Search' onClick={() => {}}>
            <SearchIcon />
        </Component>
    );
}
