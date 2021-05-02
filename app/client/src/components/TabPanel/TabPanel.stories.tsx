import * as React from 'react';
import { Paper } from '@material-ui/core';

import Component, { TabPanels } from './TabPanel';

export default { title: '@local/components/Tab Panel' };

export function TabPanel() {
    const [state, setState] = React.useState(0);
    return (
        <div>
            <button onClick={() => setState(state - 1)} type='button'>
                Decrement
            </button>
            &nbsp;
            <div style={{ display: 'inline' }}>{state}</div>
            &nbsp;
            <button onClick={() => setState(state + 1)} type='button'>
                Increment
            </button>
            <TabPanels>
                <Component key='0' visible={state === 0}>
                    <Paper
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        0
                    </Paper>
                </Component>
                <Component key='1' visible={state === 1}>
                    <Paper
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        1
                    </Paper>
                </Component>
                <Component key='2' visible={state === 2}>
                    2
                </Component>
                <Component key='3' visible={state === 3}>
                    3
                </Component>
            </TabPanels>
        </div>
    );
}
