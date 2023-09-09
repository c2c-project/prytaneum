import Papa from 'papaparse';

type RosterCSVData = {
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

export const onWritingUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
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

export const onPreWritingUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    // Clear file input
    inputRef.current.value = '';

    const data = new FormData();
    data.append('file', file);
    data.append('type', 'pre-writing');

    fetch('/api/upload', {
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

export const onPostWritingUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    // Clear file input
    inputRef.current.value = '';

    const data = new FormData();
    data.append('file', file);
    data.append('type', 'post-writing');

    fetch('/api/upload', {
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

export const onAssignmentUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    // Clear file input
    inputRef.current.value = '';

    const data = new FormData();
    data.append('file', file);
    data.append('type', 'assignment');

    fetch('/api/upload', {
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
