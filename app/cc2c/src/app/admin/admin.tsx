'use client';

import React from 'react';
import { Grid } from '@mui/material';
import { UsersTable, ClassesTable } from '@local/components';

interface Props {}

export function Admin({}: Props) {
    return (
        <Grid container>
            <UsersTable />
            <ClassesTable />
        </Grid>
    );
}
