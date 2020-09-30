import React from 'react';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserPromotion from './UserPromotion';

export default { title: 'AdminDashboard/UserPromotion' };

const options = ['Admin', 'Organizer'];
const userInfo = makeUser();

export function Primary() {
    return <UserPromotion promotionOptions={options} userData={userInfo} />;
}
