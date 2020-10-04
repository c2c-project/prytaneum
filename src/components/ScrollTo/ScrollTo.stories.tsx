import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

const update = (previousSpam: string[]) => {
    const newSpam = [...previousSpam];
    for (let i = 0; i < 100; i += 1) {
        newSpam.push('SPAM');
    }
    return newSpam;
};

export function ScrollToTop() {
    const [spam, setSpam] = React.useState<string[]>([]);

    return (
        <div id='scrollTo'>
            <Component active direction='top'>
                <button type='button' onClick={() => setSpam(update)}>
                    click to add spam
                </button>
                <div>
                    {spam.map(() => (
                        <div>SPAM</div>
                    ))}
                </div>
            </Component>
        </div>
    );
}

export function ScrollToBottom() {
    const [spam, setSpam] = React.useState<string[]>([]);

    return (
        <div id='scrollTo'>
            <Component active direction='bottom'>
                <button type='button' onClick={() => setSpam(update)}>
                    click to add spam
                </button>
                <div>
                    {spam.map(() => (
                        <div>SPAM</div>
                    ))}
                </div>
            </Component>
        </div>
    );
}
