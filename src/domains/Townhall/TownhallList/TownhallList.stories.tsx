/* eslint-disable no-console */
import React from 'react';

import Container from 'layout/Container';
import Nav from 'layout/Nav';
import Component from '.';

export default { title: 'Domains/Townhall/Townhall List' };

export function Basic() {
    return (
        <main>
            <Container>
                <Component onClickTownhall={console.log} />
            </Container>
        </main>
    );
}

export function WithNav() {
    return (
        <>
            <Nav />
            <main>
                <Container>
                    <Component onClickTownhall={console.log} />
                </Container>
            </main>
        </>
    );
}
