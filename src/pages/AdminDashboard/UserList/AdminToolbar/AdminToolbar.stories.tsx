import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AdminToolbar, { Props } from './AdminToolbar';

export default {
    title: 'AdminDashboard/AdminToolbar',
    component: AdminToolbar,
    argTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <AdminToolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    onLoadUsers: () => {},
};
