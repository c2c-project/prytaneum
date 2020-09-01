import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mocks';

export default {
    title: 'Domains/ReportSummary',
    component: Component,
};

export function ReportSummary() {
    return (
        <Container maxWidth='sm'>
            <Component report={makeFeedbackReport()} callBack={() => {}} />
        </Container>
    );
}
