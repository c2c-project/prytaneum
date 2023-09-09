'use client';

import React from 'react';
import { Button } from '@mui/material';

export const onPostWritingUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    // Clear file input
    inputRef.current.value = '';

    const data = new FormData();
    data.append('file', file);
    data.append('type', 'writing');

    fetch('/api/upload/roster', {
        method: 'POST',
        body: data,
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
};

export function UploadPostWriting() {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={() => inputRef.current?.click()}>
                Upload Post Writing
            </Button>
            <input
                type='file'
                ref={inputRef}
                style={{ display: 'none' }}
                onInput={() => onPostWritingUpload(inputRef)}
            />
        </React.Fragment>
    );
}
