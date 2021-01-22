import React from 'react';
import { Meta } from '@storybook/react';
import { makeUser, Roles } from 'prytaneum-typings';

import Component from './UserPromotion';

export default { title: 'Domains/Admin/User Promotion', parameters: { layout: 'centered' } } as Meta;

const options: Roles[] = ['admin', 'organizer'];
const userInfo = makeUser();

export const UserPromotion = () => <Component promotionOptions={options} user={userInfo} />;
