import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Grid, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TitleCard from 'components/TitleCard';
import List from 'domains/Townhall/TownhallList';
import Dialog from 'components/Dialog';
import TownhallForm from 'domains/Townhall/TownhallForm';
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
    const [open, setOpen] = React.useState(false);
    return (
        <Grid container className={classes.root}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <TownhallForm
                        onCancel={() => setOpen(false)}
                        onSubmit={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
            <TitleCard
                animKey='townhall-list-title'
                title='Townhalls'
                stats={[['total', 1]]}
            />
            <Grid item xs={12}>
                <List
                    onClickTownhall={(id) =>
                        history.push(makeRelativeLink(`/${id}`))
                    }
                />
            </Grid>
            <Fab aria-label='Add Townhall' onClick={() => setOpen(true)}>
                <AddIcon className={classes.fab} />
            </Fab>
        </Grid>
    );
}
