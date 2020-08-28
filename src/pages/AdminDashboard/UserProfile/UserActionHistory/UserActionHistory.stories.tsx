import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import UserActionHistory, { Props } from './UserActionHistory';
import { mockData } from '../../data';

export default {
    title: 'AdminDashboard/UserProfile/UserActionHistory',
    component: UserActionHistory,
    argTypes: {},
} as Meta;

const actionHistoryData = [
    { timeStamp: '1565016400000', action: 'Banned in TownHall X' },
    { timeStamp: '1565016400001', action: 'Banned in TownHall Y' },
    { timeStamp: '1565016400002', action: 'Made Townhall T' },
    { timeStamp: '565016400003', action: 'Reset Password' },
];

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <UserActionHistory {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    ListsTraits: actionHistoryData.map((x) => {
        return { id: x.timeStamp, primary: x.action, secondary: x.timeStamp };
    }),
};

export const Emtpy = Template.bind({});
Emtpy.args = { ListsTraits: [] };
