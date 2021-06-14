import * as React from 'react';

import Component, { Bill } from './BillSummary';

export default { title: '@local/components/Bill Summary' };

const bill: Bill = {
    name: 'Darth Vader',
    summaryText: 'Summary Text',
};

export const Basic = () => <Component bill={bill} />;
