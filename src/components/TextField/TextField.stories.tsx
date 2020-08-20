import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Component from './TextField';
import theme from 'theme';

export default {
    title: 'Components/TextField',
    component: Component,
};

export function TextField() {
    return (
        <ThemeProvider theme={theme}>
            <Component 
                required
                label='Storybook Label'
                value='start typing here, or change it and it will `alert(1)`'
                onChange={() => alert(1)}
            />
        </ThemeProvider>
    );
}