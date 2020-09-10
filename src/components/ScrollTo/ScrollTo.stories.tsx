import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Component from './ScrollTo';
import theme from 'theme';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

function Spam() {
    const toAdd = document.createElement('p');
    toAdd.innerHTML = '';
    toAdd.innerHTML = '<br/>';

    toAdd.innerHTML = toAdd.innerHTML + 'spam' + '<br/>';
    document.body.appendChild(toAdd);
}

export function ScrollToTop() {
    return (
        <Component active direction='top'>
            <button type='button' onClick={() => Spam()}>
                click to add spam
            </button>
        </Component>
    );
}

export function ScrollToBottom() {
    return (
        <Component active direction='bottom'>
            <button type='button' onClick={() => Spam()}>
                click to add spam
            </button>
        </Component>
    );
}
