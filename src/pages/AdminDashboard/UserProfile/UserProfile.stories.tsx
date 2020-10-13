import React from 'react';
import UserProfile from './UserProfile';

export default { title: 'AdminDashboard/UserProfile' };

export function Primary() {
    return <UserProfile userId='1234' />;
}
