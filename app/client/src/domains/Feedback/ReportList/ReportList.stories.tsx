import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeFeedbackReports, makeUser } from 'prytaneum-typings';

import UserProvider from '@local/contexts/User';
import Component from '.';

export default {
    title: '@local/domains/Feedback/Report List',
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
