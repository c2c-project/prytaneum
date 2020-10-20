import React from 'react';
import faker from 'faker';
import { Card, CardContent } from '@material-ui/core';

import VList from './VList';

export default { title: 'Components/VList' };

const data = new Array(1000)
    .fill(true)
    .map(() => ({ _id: faker.random.alphaNumeric(5) }));

export function Basic() {
    return (
        <VList loadDir='top' onLoadMore={() => {}}>
            {data.map(({ _id }) => (
                <Card
                    id={_id}
                    key={_id}
                    style={{ height: '100px', marginBottom: '8px' }}
                >
                    <CardContent>
                        Hey &nbsp;
                        {_id}
                    </CardContent>
                </Card>
            ))}
        </VList>
    );
}
