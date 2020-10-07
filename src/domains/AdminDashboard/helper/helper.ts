/* eslint-disable import/prefer-default-export */
import { UserProfile } from 'domains/AdminDashboard/types';

const filterList = ['Attended', 'Moderator', 'Banned'];

export function userProfileFormat(data: UserProfile) {
    return {
        _id: data._id,
        actionHistoryData: data.actionHistoryData.map((usr) => {
            return {
                _id: usr.timeStamp.toString(),
                primary: usr.action,
                secondary: usr.timeStamp.toString(),
            };
        }),
        profileInfo: {
            primary: data.name,
            info: data.status.filter((x) => filterList.includes(x.role)),
        },
        tags: data.status.map((stat) => stat.role),
    };
}
