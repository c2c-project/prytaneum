import React from 'react';
import { Meta } from '@storybook/react';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mock';

export default { title: 'Domains/Feedback/Form Base', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    return <Component report={makeFeedbackReport()} submitType='create' reportType='Feedback' />;
}
