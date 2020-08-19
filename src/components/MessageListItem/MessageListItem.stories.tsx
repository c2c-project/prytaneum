import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';

import Component from './MessageListItem';
import theme from 'theme';

export default {
    title: 'Components/MessageListItem',
    component: Component,
};

export function MessageListItemDisplay() {
    return (
            <Component button={true}  hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </Component>
    );
}

export function MessageListItem_noButton() {
    return (
            <Component button={false}  hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>You cannot click this</p>
            </Component>
    );
}