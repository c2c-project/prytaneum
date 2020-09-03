import React from 'react';
import { userProfileData } from 'pages/AdminDashboard/data';
import UserProfile from './UserProfile';

export default { title: 'AdminDashboard/UserProfile' };

const filterList = ['Attended', 'Moderated', 'Banned'];
const fabMenuItems = ['PROMOTE', 'EDIT', 'ADD'];
const userInfo = userProfileData();

const profileInfo = {
    primary: userInfo.name,
    info: userInfo.status.filter((x) => filterList.includes(x.status)),
};

const userTags = userInfo.status.map((stat) => stat.status);
const userActionHistory = userInfo.actionHistoryData.map((user) => {
    return {
        id: user.timeStamp,
        primary: user.action,
        secondary: user.timeStamp.toString(),
    };
});

export function Primary() {
    return (
        <UserProfile
            profileInfo={profileInfo}
            tags={userTags}
            userActionHistory={userActionHistory}
            fabMenuItems={fabMenuItems}
        />
    );
}
