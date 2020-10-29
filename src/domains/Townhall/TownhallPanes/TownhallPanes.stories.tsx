import React from 'react';
import { Grid } from '@material-ui/core';

import Page from 'layout/Page';
import TownhallProvider from '../Contexts/Townhall';
import TownhallPanes from './TownhallPanes';

export default { title: 'Domains/Townhall/Townhall Panes' };

export function Basic() {
    return (
        <Page maxWidth='xl'>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={12} md={8} />
                <Grid item xs={12} md={4} container style={{ padding: '8px' }}>
                    <TownhallProvider townhallId='123'>
                        <TownhallPanes />
                    </TownhallProvider>
                </Grid>
            </Grid>
        </Page>
    );
}
