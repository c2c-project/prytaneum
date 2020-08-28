import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CheckBox, { Props } from './CheckBox';

export default {
    title: 'Components/CheckBox',
    component: CheckBox,
    argsTypes: {},
} as Meta;

const statusTags = ['admin', 'moderator', 'organizer', 'regular', 'banned'];

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <CheckBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    options: statusTags,
    onChange: () => {},
};
