import React from 'react';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserPromotion from './UserPromotion';

export default { title: 'AdminDashboard/UserPromotion' };

const options = ['Admin', 'Organizer'];

const userData = {
    _id: '111111',
    name: 'Francisco Gallego',
    email: 'kikiki@gmail.com',
    status: [
        { status: 'Admin', count: 1, active: true },
        { status: 'Organizer', count: 1, active: false },
        { status: 'Moderator', count: 1, active: false },
    ],
    timeStamp: 'klsflk;asjfsa',
};

export function Primary() {
    return <UserPromotion promotionOptions={options} userData={userData} />;
}
