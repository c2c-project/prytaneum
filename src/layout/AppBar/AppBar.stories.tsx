import React from 'react';
import Grid from '@material-ui/core/Grid';

import Component from './AppBar';

export default { title: 'layout/AppBar' };

export function Basic() {
    return (
        <div style={{ width: '100%', flexFlow: 'column' }}>
            <Component />
        </div>
    );
}

export function ShouldStick() {
    return (
        <Grid
            container
            direction='column'
            style={{ overflow: 'auto' }}
            wrap='nowrap'
        >
            <Component />
            <main style={{ flex: '1 1 100%' }}>
                {new Array(10).fill(true).map((_a, idx) => (
                    <div
                        style={{
                            backgroundColor: idx % 2 === 0 ? 'yellow' : 'black',
                            height: '200px',
                        }}
                    />
                ))}
            </main>
        </Grid>
    );
}
