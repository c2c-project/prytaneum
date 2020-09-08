import React from 'react';
import UserPromotion from './UserPromotion';

export default { title: 'AdminDashboard/UserPromotion' };

const options = ['Organizer', 'Moderator'];

export function Primary() {
    return <UserPromotion promotionOptions={options} />;
}
