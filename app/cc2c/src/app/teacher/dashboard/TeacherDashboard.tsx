import React from 'react';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';

import { UploadRoster } from '@local/components';
import Link from 'next/link';

interface Props {
    classes: Array<{ id: string; name: string }>;
}

export function TeacherDashboard({ classes }: Props) {
    return (
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing='2rem'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Town Hall with your member of Congress
                </Typography>
            </Grid>
            <Grid item>
                <List>
                    {classes.map(({ id, name }) => (
                        <ListItem key={id} style={{ justifyContent: 'center' }}>
                            <Link href={`/class/${id}`} style={{ textDecoration: 'none' }}>
                                <Button variant='contained'>View Class: {name}</Button>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item>
                <UploadRoster />
            </Grid>
        </Grid>
    );
}
