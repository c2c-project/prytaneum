import React from 'react';
import Container from '@material-ui/core/Container';

import Component, {Bill} from './TownhallBillSummary';

export default { title: 'Domains/Townhall' };

const bill: Bill = {
    name: 'Darth Vader',
    summaryText: 'Summary Text',
 
};

export function TownhallBillSummary() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component bill={bill} />
        </Container>
    );
}
