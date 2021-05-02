/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';

import SpeakerForm from './SpeakerForm';

export default { title: 'Domains/Speaker/Speaker Form', parameters: { layout: 'centered' } } as Meta;

const Template: Story<{ onCancel: () => void; onSubmit: () => void }> = (props) => <SpeakerForm {...props} />;

export const Basic = Template.bind({});
Basic.argTypes = {
    onSubmit: { action: 'submitted' },
};

export const WithCancel = Template.bind({});
WithCancel.argTypes = {
    onSubmit: { acton: 'submitted' },
    onCancel: { action: 'canceled' },
};
