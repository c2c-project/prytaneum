import React from 'react';

import Component from './MessageListItem';

export default {
    title: 'Components/MessageListItem',
    component: Component,
};

export function MessageListItemDisplay() {
    return (
        <ul>
            <Component button hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </Component>
        </ul>
    );
}

export function MessageListItemNoButton() {
    return (
        <ul>
            <Component button={false} hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>You cannot click this</p>
            </Component>
        </ul>
    );
}
