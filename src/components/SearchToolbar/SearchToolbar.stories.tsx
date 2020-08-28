import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SearchToolbar, { Props } from './SearchToolbar';

export default {
    title: 'Components/SearchToolbar',
    component: SearchToolbar,
    argsTypes: {},
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<Props> = (args) => <SearchToolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    onChange: () => {},
};
