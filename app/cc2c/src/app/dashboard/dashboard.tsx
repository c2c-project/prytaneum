'use client';

import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { UploadFile } from '@local/components/UploadFile';
import { onWritingUpload, onPreWritingUpload, onPostWritingUpload } from './upload';

interface Props {}

export function Dashboard({}: Props) {
    const writingInputRef = React.useRef<HTMLInputElement | null>(null);
    const preWritingInputRef = React.useRef<HTMLInputElement | null>(null);
    const postWritingInputRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <Grid container justifyContent='center'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Town Hall with your member of Congress
                </Typography>
            </Grid>
            <Grid item container justifyContent='center'>
                <Grid item container direction='column' alignItems='center'>
                    <Typography>Event Info</Typography>
                    <Button>Join Event</Button>
                </Grid>
            </Grid>
            <Grid item container justifyContent='center'>
                <UploadFile onUpload={onWritingUpload} inputRef={writingInputRef} buttonName='Upload Writing' />
                <UploadFile
                    onUpload={onPreWritingUpload}
                    inputRef={preWritingInputRef}
                    buttonName='Upload Pre-Writing'
                />
                <UploadFile
                    onUpload={onPostWritingUpload}
                    inputRef={postWritingInputRef}
                    buttonName='Upload Post-Writing'
                />
            </Grid>
        </Grid>
    );
}
