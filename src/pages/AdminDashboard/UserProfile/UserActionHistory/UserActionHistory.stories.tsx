import React from 'react';
import { userProfileData } from 'pages/AdminDashboard/data';
import UserActionHistory from './UserActionHistory';

export default { title: 'AdminDashboard/UserProfile/UserActionHistory' };

const userActionHistory = userProfileData().actionHistoryData.map((user) => {
    return {
        id: user.timeStamp,
        primary: user.action,
        secondary: user.timeStamp.toString(),
    };
});

export function Primary() {
    return <UserActionHistory ListsTraits={userActionHistory} />;
}

export function Empty() {
    return <UserActionHistory ListsTraits={[]} />;
}
