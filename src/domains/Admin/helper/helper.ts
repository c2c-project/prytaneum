/* eslint-disable import/prefer-default-export */
import { timeStamp } from 'console';
import { UserProfile } from 'domains/Admin/types';
import { User } from 'types';

const filterList = ['Attended', 'Moderator', 'Banned'];

export function userProfileFormat(data: User) {
    // return {
    //     _id: data._id,
    //     actionHistoryData: data.history.actions.map(({ timestamp, action }) => {
    //         return {
    //             timeStamp: timestamp,
    //             action,
    //         };
    //     }),
    //     profileInfo: {
    //         primary: data.email.address,
    //         info: data.roles,
    //     },
    //     tags: data.roles,
    // };
}
