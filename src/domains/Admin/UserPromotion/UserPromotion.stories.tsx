import React from 'react';
import { makeUser, Roles } from 'prytaneum-typings';

import Layout from 'layout';
import UserPromotion from './UserPromotion';

export default { title: 'Domains/Admin/User Promotion' };

const options: Roles[] = ['admin', 'organizer'];
const userInfo = makeUser();

export function Basic() {
    return (
        <Layout>
            <UserPromotion promotionOptions={options} user={userInfo} />
        </Layout>
    );
}
