/* eslint-disable no-console */
import React from 'react';

import Main from 'layout/Main';
import UserProvider from 'contexts/User';
import Layout from 'layout';
import Component from '.';

export default { title: 'Domains/Townhall/Townhall List' };

export function Basic() {
    return (
        <Main spacing={1}>
            <Component title='Test Title here' onClickTownhall={console.log} />
        </Main>
    );
}

export function WithNav() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Component onClickTownhall={console.log} />
            </Layout>
        </UserProvider>
    );
}
