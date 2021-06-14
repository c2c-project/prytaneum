import globby from 'globby';
import { join } from 'path';
import writeToCsv from './utils/write-to-csv';

async function main() {
    const files = await globby([join(__dirname, './generators/*')]);

    const imports = files.map((filePath) => import(filePath));
    const results = await Promise.all(imports);

    const getFileName = (idx: number) => {
        const fileName = files[idx].split('/').slice(-1)[0];
        const withoutExtension = fileName.split('.')[0];

        return [join(__dirname, '../data'), `${withoutExtension}.csv`].join('/');
    };

    for (let i = 0; i < results.length; i += 1) {
        if (!results[i].gen) continue;
        const arr = new Array(10).fill(0);
        const generated = arr.map(() => results[i].gen());
        console.log(generated);
        writeToCsv(generated, getFileName(i));
    }
}

main();
