import React from 'react';
import Container from '@material-ui/core/Container';

import Component, { Bill } from './BillSummary';

export default { title: 'Components/Bill Summary' };

const bill: Bill = {
    name: 'Darth Vader',
    summaryText: 'Summary Text',
};

export function Basic() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component bill={bill} />
        </Container>
    );
}
