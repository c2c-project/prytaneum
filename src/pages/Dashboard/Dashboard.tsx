/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

import TitleCard from 'components/TitleCard';
import { growProps } from 'components/Grow';

export default function Dashboard() {
    return (
        <Grid container>
            <TitleCard title='Dashboard' />
            <Grid item xs={12}>
                <motion.div {...growProps}>
                    <Card
                        style={{
                            minHeight: 500,
                            display: 'flex',
                        }}
                    >
                        <CardContent
                            style={{
                                display: 'flex',
                                flex: '1 1 100%',
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={12}>
                                <Typography variant='h4' align='center'>
                                    This area is still under construction!
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </motion.div>
            </Grid>
        </Grid>
    );
}
