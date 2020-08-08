import Papa from 'papaparse';

const defaultConfig = {
    header: true,
    skipEmptyLines: true,
    complete: (results: Array<string>) => {
        console.log(results);
    },
};

function csv(file: File, config = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const merged: object = { ...defaultConfig, ...config };
    Papa.parse(file, merged);
}

export default {
    csv,
};
