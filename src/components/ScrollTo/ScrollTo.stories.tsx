import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

function Spam() {
    const toAdd = document.createElement('p');
    toAdd.innerHTML = '';
    toAdd.innerHTML = '<br/>';

    // eslint-disable-next-line
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
