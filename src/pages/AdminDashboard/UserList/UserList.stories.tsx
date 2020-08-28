import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import UserList from './UserList';

export default {
    title: 'AdminDashboard/UserList',
    component: UserList,
    argTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story = (args) => <UserList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
