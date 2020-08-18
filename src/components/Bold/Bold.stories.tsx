import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core';

import Bold from '.';
import theme from 'theme';
import { MemoryRouter, Route } from 'react-router';

export default {
    title: 'Components/Bold',
    component: Component
}

const toBoldString = 'test_asdASD_123_=-0"\'';
const toBoldJSX = <p>this should look bold</p>;
const toBoldJSXArr = (
    <div>
        <p>test_jsxArr</p>
        <p>testingJSX[]</p>
    </div>
);

export function BoldText() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path='/'>
                    <Bold children={toBoldString} />
                    <Bold children={toBoldJSX} />
                    <Bold children={toBoldJSXArr} />
                    <p>this is not bold for reference</p>
                </Route>
            </MemoryRouter>
        </ThemeProvider>
    );
}
