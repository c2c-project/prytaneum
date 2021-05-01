import fs from 'fs';

export default function writeToCSV(list: Record<string, unknown>[], filePath: string) {
    if (list.length === 0) return;

    const headers = Object.keys(list[0]);

    const formattedDataArr = list.map((item) => Object.values(item).join(','));

    const dataWithHeaders = [headers, ...formattedDataArr].join('\n');

    fs.writeFileSync(filePath, dataWithHeaders, { flag: 'w+' });
}
