import React from 'react';
import Container from '@material-ui/core/Container';
import BugReportIcon from '@material-ui/icons/BugReport';

import Component from '.';

export default {
    title: 'Domains/Feedback/Report Form',
    component: Component,
};

const dummyBugReportForm = {
    title: 'Bug Report Form',
    mainDescription:
        'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form',
    icon: <BugReportIcon />,
};

export function Basic() {
    return (
        <Container maxWidth='sm'>
            <Component
                title={dummyBugReportForm.title}
                mainDescription={dummyBugReportForm.mainDescription}
                icon={dummyBugReportForm.icon}
                reportType='Bug'
            />
        </Container>
    );
}
