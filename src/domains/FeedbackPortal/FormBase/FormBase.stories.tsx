import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mock';

export default { title: 'Domains/FormBase' };

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                report={makeFeedbackReport()}
                submitType='create'
                reportType='Feedback'
            />
        </Container>
    );
}
