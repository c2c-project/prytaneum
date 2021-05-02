import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import Main from '.';
import AppBar from '../AppBar';
import Page from '../Page';

export default { title: 'Layout/Main' };

export function Basic() {
    return (
        <Page>
            <AppBar>Appbar</AppBar>
            <Grid container item xs={12}>
                <Main>
                    <div
                        style={{
                            backgroundColor: 'black',
                            border: '10px solid blue',
                            color: 'white',
                            flex: '1 1 100%',
                        }}
                    >
                        content
                    </div>
                </Main>
            </Grid>
        </Page>
    );
}
