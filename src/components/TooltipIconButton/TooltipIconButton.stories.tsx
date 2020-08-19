import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import Component from './TooltipIconButton';
import theme from 'theme';

export default { 
    title: 'Components', 
    component: Component 
};

export function TooltipIconButton() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <IconButton onClick={() => {}}>
                    <Component tooltip='Search' onClick={() => {}}>
                        <SearchIcon />
                    </Component>
                </IconButton>
            </MemoryRouter>
        </ThemeProvider>
    );
}
