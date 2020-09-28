import React from 'react';

import Component from './ScrollTo';

export default {
    title: 'Components/ScrollTo',
    component: Component,
};

export function ScrollToTop() {
    const [cnt, setCount] = React.useState(0);
    const [spam, updateSpam] = React.useState<JSX.Element[]>([<span key={cnt}><br/><br/><br/><h1>SPAM</h1><br/><br/><br/></span>]);
    const update = () => {
        setCount(cnt + 1);
        spam.push(<span key={cnt}><br/><h1>SPAM</h1><br/></span>);
        updateSpam(spam);
    }
    
    return (
        <div id='scrollTo'>
            <Component active direction='top'>
                <p>{spam}</p>
                <p>{cnt}</p>
                <button type='button' onClick={() => update()}>
                    click to add spam
                </button>
            </Component>
        </div>
    );
}

export function ScrollToBottom() {
    const [cnt, setCount] = React.useState(0);
    const [spam, updateSpam] = React.useState<JSX.Element[]>([<span key={cnt}><br/><br/><br/><h1>SPAM</h1><br/><br/><br/></span>]);
    const update = () => {
        setCount(cnt + 1);
        spam.push(<span key={cnt}><br/><h1>SPAM</h1><br/></span>);
        updateSpam(spam);
    }

    return (
        <div id='scrollTo'>
            <Component active direction='bottom'>
                <button type='button' onClick={() => update()}>
                    click to add spam
                </button>
                <p>{spam}</p>
                <p>{cnt}</p>
            </Component>
        </div>
    );
}
