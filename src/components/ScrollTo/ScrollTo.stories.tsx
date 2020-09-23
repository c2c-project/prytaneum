import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

function Spam(n: number) {
    const doc = document.getElementById('scrollTo');
    let toAdd = '<p><br />';

    let x = n;
    while (x > 0) {
        // eslint-disable-next-line
        toAdd = toAdd + 'spam' + '<br />';
        x -= 1;
    }
    toAdd += '</p>';

    doc?.insertAdjacentHTML('afterend', toAdd);
}

export function ScrollToTop() {
    return (
        <div id='scrollTo'>
            <Component active direction='top'>
                <button type='button' onClick={() => Spam(1000)}>
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
                <button type='button' onClick={() => Spam(1000)}>
                    click to add spam
                </button>
            </Component>
        </div>
    );
}
