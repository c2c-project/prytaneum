import React from 'react';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserTags from './UserTags';

export default { title: 'AdminDashboard/UserProfile/UserTags' };

const userTags = makeUser().status.map((stat) => stat.status);

export function Primary() {
    return <UserTags tags={userTags} primaryHeader='User Tags' />;
}

export function NoTags() {
    return <UserTags tags={[]} primaryHeader='User Tags' />;
}
