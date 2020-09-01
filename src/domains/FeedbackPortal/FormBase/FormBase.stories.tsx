import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mocks';

export default { title: 'Domains/FormBase' };

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                report={makeFeedbackReport()}
                onSuccess={() => {}}
                callback={() => {}}
            />
        </Container>
    );
}
