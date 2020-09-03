import React from 'react';
import { userProfileData } from 'pages/AdminDashboard/data';
import UserInfo from './UserInfo';

export default { title: 'AdminDashboard/UserProfile/UserInfo' };

const filterList = ['Attended', 'Moderated', 'Banned'];
const userInfo = userProfileData();

const profileInfo = {
    primary: userInfo.name,
    info: userInfo.status.filter((x) => filterList.includes(x.status)),
};

export function Primary() {
    return <UserInfo profileInfo={profileInfo} />;
}
