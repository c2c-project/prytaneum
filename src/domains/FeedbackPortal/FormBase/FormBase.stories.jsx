import React from 'react';
import Container from '@material-ui/core/Container';
import Component from '.';

export default { title: 'Domains/FormBase' };

const dummyReport = {
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date(),
    user: {
        _id: 'v45tb3453fc152151345fvg',
    },
};

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                Report={dummyReport}
                SubmitEndpoint='/api/feedback/update-report'
            />
        </Container>
    );
}
