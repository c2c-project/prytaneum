import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Component from './TooltipIconButton';
import theme from 'theme';

export default { 
    title: 'Components', 
    component: Component 
};

// const onClick = () => {
//     alert('onClick works');
// };


export function TooltipIconButton() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path='/'>
                    <IconButton onClick={() => {}}>
                        yuh
                        <Component tooltip='tool tip pls' onClick={() => {}}>
                            yuhhh
                        </Component>
                    </IconButton>
                </Route>
            </MemoryRouter>
        </ThemeProvider>
    );
}
