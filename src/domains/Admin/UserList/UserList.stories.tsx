import React from 'react';
import Container from 'layout/Container';
import Nav from 'layout/Nav';

import UserList from './UserList';

export default { title: 'Domains/Admin/User List' };

export function Basic() {
    return (
        <>
            <Nav />
            <main>
                <Container>
                    <UserList />
                </Container>
            </main>
        </>
    );
}
