import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './TownhallBillSummary';

export default { title: 'Domains/Townhall' };

const townhall = {
    billName: 'Darth Vader',
    topic: 'Death Star Design & Imperial Unions',
    summaryText: 'Summary Text',
 
};

export function TownhallBillSummary() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component townhall={townhall} />
        </Container>
    );
}
