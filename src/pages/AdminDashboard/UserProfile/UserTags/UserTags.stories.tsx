import React from 'react';
import { userProfileData } from 'pages/AdminDashboard/data';
import UserTags from './UserTags';

export default { title: 'AdminDashboard/UserProfile/UserTags' };

const userTags = userProfileData().status.map((stat) => stat.status);

export function Primary() {
    return (
        <UserTags
            tags={userTags}
            primaryHeader='User Tags'
            errorHeader='User does not contain tags'
        />
    );
}

export function NoTags() {
    return (
        <UserTags
            tags={[]}
            primaryHeader='User Tags'
            errorHeader='User does not contain tags'
        />
    );
}
