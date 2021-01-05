/* eslint-disable */ // FIXME:
import type { User } from 'prytaneum-typings';
import { timeStamp } from 'console';
import { UserProfile } from 'domains/Admin/types';

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
