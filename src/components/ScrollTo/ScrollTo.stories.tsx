import React from 'react';
import faker from 'faker';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

const update = (previousSpam: string[]) => {
    const newSpam = [...previousSpam];
    for (let i = 0; i < 100; i += 1) {
        newSpam.push(faker.random.alphaNumeric(10));
    }
    return newSpam;
};

export function ScrollToTop() {
    const [spam, setSpam] = React.useState<string[]>([]);

    return (
        <div
            id='scrollTo'
            style={{
                height: '100%',
                width: '100%',
                overflow: 'auto',
            }}
        >
            <button type='button' onClick={() => setSpam(update)}>
                click to add spam
            </button>
            <div>
                <Component active direction='top'>
                    <div>
                        {spam.map((key) => (
                            <div key={key}>SPAM</div>
                        ))}
                    </div>
                </Component>
            </div>
        </div>
    );
}

export function ScrollToBottom() {
    const [spam, setSpam] = React.useState<string[]>([]);

    return (
        <div
            id='scrollTo'
            style={{ height: '100%', width: '100%', overflow: 'auto' }}
        >
            <button
                type='button'
                onClick={() => setSpam(update)}
                style={{ position: 'sticky', top: 0 }}
            >
                click to add spam
            </button>
            <div>
                <Component active direction='bottom'>
                    <div>
                        {spam.map((key) => (
                            <div key={key}>SPAM</div>
                        ))}
                    </div>
                </Component>
            </div>
        </div>
    );
}
