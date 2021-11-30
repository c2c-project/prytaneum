import * as React from 'react';
import { Meta } from '@storybook/react';
import { Tabs } from '@material-ui/core';

import Main from '@local/layout/Main';
import Component from './Tab';

export default { title: '@local/components/Chip Tab', parameters: { layout: 'centered' } } as Meta;

export function ChipTab() {
    const [state, setState] = React.useState(1);
    return (
        <Main>
            <div style={{ maxWidth: 400 }}>
                <Tabs
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={state}
                    onChange={(_e, value) => setState(value)}
                    variant='scrollable'
                    scrollButtons='on'
                >
                    <Component label='test1' />
                    <Component label='test2' />
                    <Component label='test3' />
                    <Component label='test4' />
                    <Component label='test5' />
                    <Component label='test6' />
                </Tabs>
            </div>
        </Main>
    );
}
