import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { mockData } from '../../pages/AdminDashboard/data';
import ListOverflow, { Props } from './ListOverflow';

export default {
    title: 'Components/ListOverflow',
    component: ListOverflow,
    argTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <ListOverflow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    rowTraits: mockData.map((row) => {
        return { id: row.id, primary: row.name };
    }),
};

export const Secondary = Template.bind({});
Secondary.args = {
    rowTraits: mockData.map((row) => {
        return { id: row.id, primary: row.name, secondary: row.status };
    }),
};
