import { execSync } from 'child_process';
import { writeFileSync, appendFileSync } from 'fs';

const args = process.argv.slice(2);
const [pgURI, outputDir] = args;

if (!pgURI) throw new Error('No postgres URI provided');
// if (!outputDir) throw new Error('No directory provided');

// const filePath = `${outputDir}/pg-types.ts`;
const tableBuffer = execSync(`psql ${pgURI} -c "\\d+"`);

function parseOutput(rawBuffer: Buffer) {
    // first line is just the title, so we can throw it away
    const [_title, ...rawOutput] = rawBuffer.toString().split('\n');

    // remove any blank lines
    const trimmedOutput = rawOutput.filter((s) => Boolean(s));

    // deleting separator line
    trimmedOutput.splice(-1, 1);

    // deleting # of rows output
    trimmedOutput.splice(1, 1);

    // first item are just the headers for each col
    const [headers, ...formattedOutput] = trimmedOutput.map((rawString) =>
        rawString.split('|').map((rawStrItem) => rawStrItem.trim())
    );

    // make the output of the function
    const output = formattedOutput.reduce<Record<string, string>[]>((accum, strArr) => {
        // take each header and reduce it to an object with keys that are header names and the corresponding values based on index
        // ex headers: [col1, col2, col3] , strArr: [val1, val2, val3] => { col1: val1, col2, val2, col3, val3 }
        const item = headers.reduce((accum, header, idx) => ({ ...accum, [header.toLowerCase()]: strArr[idx] }), {});
        return [...accum, item];
    }, []);

    return output;
}

function getCols(tableName: string) {
    const rawBuffer = execSync(`psql ${pgURI} -c "\\d+ ${tableName}"`);
    
    return parseOutput(rawBuffer);
}

// write header first
// writeFileSync(filePath, '/**\n*AUTO-GENERATED FILE -- DO NOT MODIFY\n**/\n');

const tables = parseOutput(tableBuffer);
for (let i = 0; i < tables.length; i += 1) {
    const { description, name, type } = tables[i];
    const colObjects = getCols(name);
    console.log(colObjects);
    // appendFileSync(filePath, `/**\n*description: ${description}\n*type: ${type}\n**/interface ${name} {\n`);
}
