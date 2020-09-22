import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

function Spam(n: number) {
    const toAdd =
        document.getElementById('scrollTo') || document.createElement('p');
    toAdd.innerHTML = '';
    toAdd.innerHTML = '<br/>';

    let x = n;
    while (x > 0) {
        // eslint-disable-next-line
        toAdd.innerHTML = toAdd.innerHTML + 'spam' + '<br/>';
        x -= 1;
    }
    document.body.appendChild(toAdd);
}

export function ScrollToTop() {
    return (
        <div id='scrollTo'>
            <Component active direction='top'>
                <button type='button' onClick={() => Spam(10)}>
                    click to add spam
                </button>
            </Component>
        </div>
    );
}

export function ScrollToBottom() {
    return (
        <div id='scrollTo'>
            <Component active direction='bottom'>
                <button type='button' onClick={() => Spam(10)}>
                    click to add spam
                </button>
            </Component>
        </div>
    );
}
