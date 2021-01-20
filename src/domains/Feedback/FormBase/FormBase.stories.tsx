import React from 'react';
import { Meta } from '@storybook/react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mock';

export default { title: 'Domains/Feedback/Form Base', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    return (
        <Container maxWidth='sm'>
            <Component report={makeFeedbackReport()} submitType='create' reportType='Feedback' />
        </Container>
    );
}
