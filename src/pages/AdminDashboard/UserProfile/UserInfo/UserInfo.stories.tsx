import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import UserInfo, { Props } from './UserInfo';

export default {
    title: 'AdminDashboard/UserProfile/UserInfo',
    component: UserInfo,
    argTypes: {},
} as Meta;

const userInfo = [
    { status: 'Admin', count: 1 },
    { status: 'Attended', count: 4 },
    { status: 'Moderated', count: 1 },
    { status: 'Banned', count: 3 },
    { status: 'Organized', count: 2 },
];

const filterList = ['Attended', 'Moderated', 'Banned'];

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <UserInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    profileInfo: {
        primary: 'Francisco Gallego',
        info: userInfo.filter((x) => filterList.includes(x.status)),
    },
};
