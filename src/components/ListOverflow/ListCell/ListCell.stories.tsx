import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ListCell, { Props } from './ListCell';

export default {
    title: 'Components/ListOverflow/ListCell',
    component: ListCell,
    argTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <ListCell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: 'Francisco Gallego',
};

export const Secondary = Template.bind({});
Secondary.args = {
    primary: 'Francisco Gallego',
    secondary: 'Admin',
};
