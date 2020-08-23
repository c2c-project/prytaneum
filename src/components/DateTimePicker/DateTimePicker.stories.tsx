import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';

import Component from './DateTimePicker';

export default {
    title: 'Components/DateTimePicker',
    component: Component
};

export function DateTimePicker() {
    return (
        <ThemeProvider theme={theme}>
            <Component id='test' value='test' onChange={() => {}}/>
        </ThemeProvider>
    );
}