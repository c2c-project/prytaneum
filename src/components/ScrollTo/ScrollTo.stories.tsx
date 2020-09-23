import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

function Spam(n: number, dir: string) {
    const doc = document.getElementById('scrollTo');
    let toAdd = '<p><br />';
    const component = '<Component active >a</Component>';

    // needed as we cannot use n in the loop param if we modify it
    let x = n;
    while (x > 0) {
        // eslint-disable-next-line
        toAdd = toAdd + 'spam' + '<br />';
        x -= 1;
    }
    toAdd += '</p>';

    if (dir === 'top') {
        doc?.insertAdjacentHTML('beforebegin', toAdd);
        doc?.insertAdjacentHTML('beforebegin', component);
    } else if (dir === 'bottom') {
        doc?.insertAdjacentHTML('beforeend', toAdd);
        doc?.insertAdjacentHTML('beforeend', component);
    } else {
        doc?.insertAdjacentHTML('afterbegin', toAdd);
    }
    const temp = document.createElement('p');
    temp.insertAdjacentHTML('beforeend', toAdd);
    document.body.appendChild(temp);
}

export function ScrollToTop() {
    return (
        <div id='scrollTo'>
            <Component active direction='top'>
                <button type='button' onClick={() => Spam(1000, 'top')}>
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
                <button type='button' onClick={() => Spam(1000, 'bottom')}>
                    click to add spam
                </button>
            </Component>
        </div>
    );
}
