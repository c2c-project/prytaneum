import React from 'react';
import { Grid } from '@mui/material';

import { CreateClassForm } from '@local/components/CreateClassForm';

export async function CreateClass() {
    return (
        <Grid container justifyContent='center'>
            <Grid item container justifyContent='center'>
                <CreateClassForm />
            </Grid>
        </Grid>
    );
}
