import React from 'react';
import { Meta, Story } from '@storybook/react';

import Component, { Props } from './TextField';

export default {
    title: 'Components/TextField',
    component: Component,
    parameters: {
        layout: 'centered',
    },
} as Meta;

export const TextField: Story<Props> = (props) => <Component {...props} />;
TextField.args = {
    label: 'sample label',
};

TextField.argTypes = {
    onChange: { action: 'changed' },
};
