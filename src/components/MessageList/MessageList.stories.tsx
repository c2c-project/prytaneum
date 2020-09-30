import React from 'react';

import Component from './MessageList';
import MessageListItem from '../MessageListItem';

export default {
    title: 'Components/MessageList',
    component: Component,
};

export function MessageList() {
    return (
        <Component>
            <MessageListItem button={false} hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </MessageListItem>
            <MessageListItem button hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </MessageListItem>
            <MessageListItem button hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </MessageListItem>
            <MessageListItem button hidden={false}>
                <h1>item 1</h1>
                <h2>item 2</h2>
                <em>item 3</em>
                <i>item 4</i>
                <p>This is clickable but doesnt do anything</p>
            </MessageListItem>
        </Component>
    );
}
