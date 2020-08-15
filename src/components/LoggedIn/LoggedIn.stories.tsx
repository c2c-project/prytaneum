import React from 'react';

import Component from './LoggedIn';

export default {
    title: 'Components/LoggedIn',
    component: Component,
};

const children = <h1>testing if LoggedIn renders this JSX element</h1>;

export function LoggedIn_JwtTrue() {
    return (
        <Component jwt={true}>
            {children}
        </Component>
    );
};

export function LoggedIn_JwtFalse() {
    return (
        <Component jwt={false}>
            {children}
        </Component>
    );
};