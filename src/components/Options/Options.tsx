import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';

export default function Options() {
    return {
        title: 'Options',
        content: (
            <Grid component='span' container spacing={2} alignContent='center'>
                <Grid component='span' item xs={12}>
                    <Button component='span' onClick={() => {}}>
                        Appear anonymous:
                    </Button>
                </Grid>
                <Grid component='span' item xs={12}>
                    <Button component='span' onClick={() => {}}>
                        Notify me about upcoming Townhalls:
                    </Button>
                </Grid>
                <Grid component='span' item xs={12}>
                    <ListItem button hidden={false} onClick={() => {}}>
                        Appearance
                    </ListItem>
                </Grid>
            </Grid>
        ),
    };
}
