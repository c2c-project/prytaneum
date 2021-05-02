import * as React from 'react';
import { Meta } from '@storybook/react';
import faker from 'faker';

import Component from '.';

export default { title: '@local/domains/Feedback/ReplyForm', parameters: { layout: 'centered' } } as Meta;

export function ReplyForm() {
    return <Component reportId={faker.random.alphaNumeric(12)} reportType='Feedback' />;
}
