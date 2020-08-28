import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import UserTags, { Props } from './UserTags';

export default {
    title: 'AdminDashboard/UserProfile/UserTags',
    component: UserTags,
    argTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <UserTags {...args} />;

export const Tags = Template.bind({});
Tags.args = {
    tags: ['Democrat', 'Orgaizner', 'Admin', 'Banned', 'Regular'],
    primaryHeader: 'User Tags',
    errorHeader: 'User does not contain tags',
};

export const NoTags = Template.bind({});
NoTags.args = {
    tags: [],
    primaryHeader: 'User Tags',
    errorHeader: 'User does not contain tags',
};
