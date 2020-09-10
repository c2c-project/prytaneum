import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';

import Component from './Paper';

export default {
    title: 'Components/Paper',
    component: Component
};

export function Paper() {
    return (
            <Component>
                <button type='button' onClick={() => {}}>Button for paper 1</button>
                <h1> hello 1</h1>
                <p> I am here 1</p>
                <h2> Here's paper 1</h2>
            </Component>
            <Component>
                <button type='button' onClick={() => {}}>Button for paper 2</button>
                <h1> hello 2</h1>
                <p> I am here 2</p>
                <h2> Here's paper 2</h2>
            </Component>
    );
}