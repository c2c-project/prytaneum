/* eslint-disable no-console */
/**
 * Script that initializes a feature folder in the format required by the project
 */

import { join } from 'path';
import fs from 'fs';

const [featureName, parentFeat] = process.argv.slice(2);
const TEMPLATE_DIR = `${__dirname}/../templates`;
const SCHEMA_FILE_PATH = `${TEMPLATE_DIR}/schema.template.graphql`;
const METHODS_FILE_PATH = `${TEMPLATE_DIR}/methods.template.ts`;
const RESOLVERS_FILE_PATH = `${TEMPLATE_DIR}/resolvers.template.ts`;
const README_FILE_PATH = `${TEMPLATE_DIR}/readme.template.md`;

function toKebabCase(str: string) {
    return str.trim().replace(/[A-Z]/g, (chunk) => `-${chunk.toLowerCase()}`);
}

// idk what else to call it, but it does this -- kebab-case -> Kebab Case
function toRegularCase(str: string) {
    return (
        str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (chunk) => ` ${chunk.slice(1).toUpperCase()}`)
    );
}

// assumes from kebab case
function toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (chunk) => chunk.slice(1).toUpperCase());
}

if (!featureName) throw new Error('No feature name provided');

const FEATURE_DIR = join(__dirname, '../src/features');
const kebabFeatureName = toKebabCase(featureName);
const FOLDER = parentFeat
    ? `${FEATURE_DIR}/${toKebabCase(parentFeat)}/${kebabFeatureName}`
    : `${FEATURE_DIR}/${kebabFeatureName}`;
const isSubFeature = Boolean(parentFeat);

// Methods could technically be a straight fs.copyFileSync, but leaving like this for clarity.
const methods = fs.readFileSync(METHODS_FILE_PATH).toString();
const resolvers = fs.readFileSync(RESOLVERS_FILE_PATH).toString().replace('$1', toPascalCase(kebabFeatureName));
const readme = fs
    .readFileSync(README_FILE_PATH)
    .toString()
    .replace('$1', isSubFeature ? '\n###' : '#')
    .replace('$2', toRegularCase(kebabFeatureName));
const schema = fs.readFileSync(SCHEMA_FILE_PATH).toString().replace('$1', toPascalCase(kebabFeatureName));

if (fs.existsSync(FOLDER)) throw new Error('Folder already exists. Double check the file name.');

fs.mkdirSync(FOLDER);

if (isSubFeature) fs.writeFileSync(`${FEATURE_DIR}/${toKebabCase(parentFeat)}/README.md`, readme, { flag: 'a+' });
else fs.writeFileSync(`${FOLDER}/README.md`, readme, { flag: 'w+' });

fs.writeFileSync(`${FOLDER}/schema.graphql`, schema, { flag: 'w+' });
fs.writeFileSync(`${FOLDER}/resolvers.ts`, resolvers, { flag: 'w+' });
fs.writeFileSync(`${FOLDER}/methods.ts`, methods, { flag: 'w+' });

console.log('Successfully added feature files');
