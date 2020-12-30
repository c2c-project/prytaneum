import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TitleCard from 'components/TitleCard';
import List from 'domains/Townhall/TownhallList';
import Fab from 'components/Fab';
import history, { makeRelativeLink } from 'utils/history';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    fab: {
        color: theme.palette.common.white,
    },
}));

export default function TownhallList() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <TitleCard title='Townhalls' stats={[['total', 1]]} />
            <Grid item xs={12}>
                <List
                    onClickTownhall={(id) =>
                        history.push(makeRelativeLink(`/${id}`))
                    }
                />
            </Grid>

            <Fab
                aria-label='Add Townhall'
                onClick={() => history.push(makeRelativeLink('/create'))}
            >
                <AddIcon className={classes.fab} />
            </Fab>
        </Grid>
    );
}
