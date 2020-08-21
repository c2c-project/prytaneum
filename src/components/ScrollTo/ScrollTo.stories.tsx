import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Component from './ScrollTo';
import theme from 'theme';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

export function ScrollToTop() {
    return (
        <ThemeProvider theme={theme}>
            <Component 
                active={true}
                direction='top'
            >
                <button type="button" onClick={() => Spam()}>click to add spam</button>
            </Component>
        </ThemeProvider>
    );
}

export function ScrollToBottom() {
    return (
        <ThemeProvider theme={theme}>
            <Component 
                active={true}
                direction='bottom'
            >
                <button type="button"  onClick={() => Spam()}>click to add spam</button>
            </Component>
        </ThemeProvider>
    );
}

function Spam() {
    const toAdd = document.createElement('p');
    toAdd.innerHTML = "";
    toAdd.innerHTML = '<br/>';

    toAdd.innerHTML = toAdd.innerHTML + "spam" + '<br/>';
    document.body.appendChild(toAdd);
}