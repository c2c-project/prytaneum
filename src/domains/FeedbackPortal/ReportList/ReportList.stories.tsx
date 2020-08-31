import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker';

export default {
    title: 'Domains/ReportList',
    component: Component,
};

const makeReports = (numberOfReports: number) => {
    const list = [];
    for (let i = 0; i < numberOfReports; i += 1) {
        list.push(makeFeedbackReport());
    }
    return list;
};

export function ReportList() {
    return (
        <Container maxWidth='sm'>
            <Component reports={makeReports(10)} />
        </Container>
    );
}
