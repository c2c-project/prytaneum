import React from 'react';
import { Grid } from '@mui/material';
import { UsersTable, ClassesTable } from '@local/components';

export function Admin() {
    return (
        <Grid container>
            <UsersTable />
            <ClassesTable />
        </Grid>
    );
}
