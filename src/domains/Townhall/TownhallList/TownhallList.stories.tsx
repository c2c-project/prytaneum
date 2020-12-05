/* eslint-disable no-console */
import React from 'react';

import Page from 'layout/Page';
import Nav from 'layout/Nav';
import Component from '.';

export default { title: 'Domains/Townhall/Townhall List' };

export function Basic() {
    return (
        <main>
            <Component onClickTownhall={console.log} />
        </main>
    );
}

export function WithNav() {
    return (
        <>
            <Nav />
            <main>
                <Page>
                    <Component onClickTownhall={console.log} />
                </Page>
            </main>
        </>
    );
}
