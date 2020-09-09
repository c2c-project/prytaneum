import React from 'react';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserInfo from './UserInfo';

export default { title: 'AdminDashboard/UserProfile/UserInfo' };

const filterList = ['Attended', 'Moderator', 'Banned'];
const userInfo = makeUser();

const profileInfo = {
    primary: userInfo.name,
    info: userInfo.status.filter((x) => filterList.includes(x.status)),
};

export function Primary() {
    return <UserInfo profileInfo={profileInfo} />;
}
