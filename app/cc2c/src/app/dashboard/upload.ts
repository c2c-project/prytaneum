export const onWritingUpload = async (inputRef: React.MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef.current?.files?.[0]) return;
    const file = inputRef.current.files[0];

    // Clear file input
    inputRef.current.value = '';

    const data = new FormData();
    data.append('file', file);
    data.append('type', 'writing');

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
