import Papa, { ParseConfig, ParseResult } from 'papaparse';

const defaultConfig: ParseConfig = {
    header: true,
    skipEmptyLines: true,
    complete: (results: ParseResult<Array<string>>) => {
        console.log(results);
    },
};

function csv(file: File, config = {}) {
    const merged: ParseConfig = { ...defaultConfig, ...config };
    Papa.parse(file, merged);
}

export default {
    csv,
};
