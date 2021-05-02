import React from 'react';
import Container from '@material-ui/core/Container';
import { makeFeedbackReports, makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import Component from '.';

export default {
    title: 'Domains/Feedback/Report List',
};

export function ReportList() {
    return (
        <UserProvider value={makeUser()} forceNoLogin>
            <Container maxWidth='sm'>
                <Component
                    reports={makeFeedbackReports(10).map((feedbackReport) => ({ ...feedbackReport, type: 'Feedback' }))}
                />
            </Container>
        </UserProvider>
    );
}
