import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

interface UploadFileProps {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    onUpload: (inputRef: React.MutableRefObject<HTMLInputElement | null>) => void;
    buttonName: string;
}

// TODO: Add confirmation dialog upon selecting file
export function UploadFile({ inputRef, onUpload, buttonName }: UploadFileProps) {
    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={() => inputRef.current?.click()}>
                {buttonName}
            </Button>
            <input type='file' ref={inputRef} style={{ display: 'none' }} onInput={() => onUpload(inputRef)} />
        </React.Fragment>
    );
}
