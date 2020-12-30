/* eslint-disable no-console */
import React from 'react';

import Main from 'layout/Main';
import AppBar from 'layout/AppBar';
import Component from '.';

export default { title: 'Domains/Townhall/Townhall List' };

export function Basic() {
    return (
        <main>
            <Main>
                <Component
                    title='Test Title here'
                    onClickTownhall={console.log}
                />
            </Main>
        </main>
    );
}

export function WithNav() {
    return (
        <>
            <AppBar />
            <main>
                <Main>
                    <Component onClickTownhall={console.log} />
                </Main>
            </main>
        </>
    );
}
