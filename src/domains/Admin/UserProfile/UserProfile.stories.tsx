import React from 'react';

import Container from 'layout/Container';
import Nav from 'layout/Nav';

import UserProfile from './UserProfile';

export default { title: 'Domains/Admin/User Profile' };

export function Basic() {
    return (
        <>
            <Nav />
            <main>
                <Container>
                    <UserProfile userId='1234' />
                </Container>
            </main>
        </>
    );
}
