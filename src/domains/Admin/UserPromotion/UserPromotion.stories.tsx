import React from 'react';
import { makeUser } from 'mock/handlers/auth';
import UserPromotion from './UserPromotion';

export default { title: 'Domains/Admin/User Promotion' };

const options = ['Admin', 'Organizer'];
const userInfo = makeUser();

export function Basic() {
    return <UserPromotion promotionOptions={options} userData={userInfo} />;
}
