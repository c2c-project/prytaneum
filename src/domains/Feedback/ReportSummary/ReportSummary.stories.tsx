import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mock';

export default {
    title: 'Domains/Feedback/Report Summary',
    component: Component,
};

export function ReportSummary() {
    return (
        <Container maxWidth='sm'>
            <Component report={makeFeedbackReport()} callBack={() => {}} />
        </Container>
    );
}
