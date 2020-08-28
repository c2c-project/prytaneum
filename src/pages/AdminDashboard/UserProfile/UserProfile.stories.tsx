import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { UserProfile, Props } from './UserProfile';
import { userProfileData } from '../data';

export default {
    title: 'AdminDashboard/UserProfile',
    component: UserProfile,
    argsTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <UserProfile {...args} />;

const filterList = ['Attended', 'Moderated', 'Banned'];

export const Primary = Template.bind({});
Primary.args = {
    profileInfo: {
        primary: userProfileData.name,
        info: userProfileData.status.filter((x) =>
            filterList.includes(x.status)
        ),
    },
    tags: userProfileData.status.map((x) => {
        return x.status;
    }),
    userActionHistory: userProfileData.actionHistoryData.map((x) => {
        return { id: x.timeStamp, primary: x.action, secondary: x.timeStamp };
    }),
    fabMenuItems: ['PROMOTE', 'EDIT', 'ADD'],
};
