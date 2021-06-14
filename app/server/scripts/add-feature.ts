/**
 * Script that initializes a feature folder in the format required by the project
 */

import { join } from 'path';
import fs from 'fs';

const [featureName, parentFeat] = process.argv.slice(2);

function toKebabCase(str: string) {
    return str.trim().replace(/[A-Z]/g, (chunk) => `-${chunk.toLowerCase()}`);
}

// idk what else to call it, but it does this -- kebab-case -> Kebab Case
function toRegularCase(str: string) {
    return (
        str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (chunk) => ' ' + chunk.slice(1).toUpperCase())
    );
}

// assumes from kebab case
function toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (chunk) => chunk.slice(1).toUpperCase());
}

if (!featureName) throw new Error('No feature name provided');

const DIR = join(__dirname, '../src/features');
const kebabFeatureName = toKebabCase(featureName);
const folder = parentFeat ? `${DIR}/${toKebabCase(parentFeat)}/${kebabFeatureName}` : `${DIR}/${kebabFeatureName}`;
const isSubFeature = Boolean(parentFeat);

const readme = `${isSubFeature ? '\n###' : '#'} ${toRegularCase(kebabFeatureName)} Features \n`;
const schema = `type ${toPascalCase(kebabFeatureName)} {\n\n}`;
const resolvers = `import { Resolvers } from '@local/features/utils';\nimport * as ${toPascalCase(kebabFeatureName)} from './methods';\n\nexport const resolvers: Resolvers = {};`;
const methods = `import { PrismaClient } from '@app/prisma';\nimport { Maybe, errors } from '@local/features/utils';`;

if (fs.existsSync(folder)) throw new Error("Folder already exists. Double check what you're doing");

fs.mkdirSync(folder);

if (isSubFeature) fs.writeFileSync(`${DIR}/${toKebabCase(parentFeat)}/README.md`, readme, { flag: 'a+' });
else fs.writeFileSync(`${folder}/README.md`, readme, { flag: 'w+' });

fs.writeFileSync(`${folder}/schema.graphql`, schema, { flag: 'w+' });
fs.writeFileSync(`${folder}/resolvers.ts`, resolvers, { flag: 'w+' });
fs.writeFileSync(`${folder}/methods.ts`, methods, { flag: 'w+' });

console.log('Successfully added feature files');
