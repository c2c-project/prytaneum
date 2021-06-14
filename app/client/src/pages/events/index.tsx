import * as React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Grid, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import TitleCard from '@local/components/TitleCard';
import List from '@local/domains/Townhall/TownhallList';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import TownhallForm from '@local/domains/Townhall/TownhallForm';
import { Fab } from '@local/components/Fab';
import FadeThrough from '@local/animations/FadeThrough';
import { initializeApollo, addApolloState } from '@local/utils/apolloClient';
import { EventListDocument, EventListQuery, Event } from '@local/graphql-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    fab: {
        color: theme.palette.common.white,
    },
}));

interface Props {
    events: Event[];
}

const Page: NextPage<Props> = ({ events }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const [onExit, setOnExit] = React.useState<(() => void) | undefined>(undefined);
    return (
        <motion.div key='townhall-list'>
            <FadeThrough animKey='townhall-list-page'>
                <Grid container>
                    <TitleCard title='Townhalls' />
                    <Grid item xs={12}>
                        <List events={events} onClickTownhall={(id) => router.push('')} />
                    </Grid>
                </Grid>
            </FadeThrough>
            <ResponsiveDialog open={open} onClose={() => setOpen(false)} onExited={onExit}>
                <DialogContent>
                    <TownhallForm
                        onCancel={() => setOpen(false)}
                        onSubmit={(id) => {
                            setOnExit(() => router.push(''));
                            setOpen(false);
                        }}
                    />
                </DialogContent>
            </ResponsiveDialog>
            <Fab aria-label='Add Townhall' onClick={() => setOpen(true)}>
                <AddIcon className={classes.fab} />
            </Fab>
        </motion.div>
    );
};

export async function getServerSideProps() {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<EventListQuery>({ query: EventListDocument });

    return addApolloState(apolloClient, {
        props: {
            events: data.events || [],
        },
    });
}

// Page.propTypes = {
//     events: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
// };

export default Page;
