import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

export default { title: 'AdminDashboard/UserProfile' };

export function Primary() {
    return (
        <MemoryRouter initialEntries={['/123456']}>
            <Route path='/:userId'>
                <UserProfile />
            </Route>
        </MemoryRouter>
    );
}
