'use client';

import React from 'react';
import Papa from 'papaparse';
import { Button } from '@mui/material';

export type RosterCSVData = {
    course_id: string;
    student_id: string;
    email: string;
    first_name: string;
    last_name: string;
    research_project_consent: 1 | 0;
};

export const onRosterUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    Papa.parse(file, {
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            const headers = results.meta.fields;
            if (!headers) throw new Error('No headers found');
            const expectedHeaders = [
                'course_id',
                'student_id',
                'email',
                'first_name',
                'last_name',
                'research_project_consent',
            ];
            expectedHeaders.forEach((header) => {
                if (!headers.includes(header)) {
                    throw new Error(`Missing header: ${header}`);
                }
            });
            const data = results.data as RosterCSVData[];

            const formData = new FormData();
            formData.append('headers', JSON.stringify(headers));
            formData.append('data', JSON.stringify(data));

            const result = await fetch('/api/upload/roster', {
                method: 'POST',
                body: formData,
            });
            console.log(result);
        },
        error: (err) => {
            console.error(err);
            throw new Error('Error parsing CSV file');
        },
    });
};

export function UploadRoster() {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={() => inputRef.current?.click()}>
                Upload Roster
            </Button>
            <input type='file' ref={inputRef} style={{ display: 'none' }} onInput={() => onRosterUpload(inputRef)} />
        </React.Fragment>
    );
}
