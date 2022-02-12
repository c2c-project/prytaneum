import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';

const typeDefsArr = loadFilesSync(join(__dirname, '../features/**/*.graphql'));
const typeDefs = mergeTypeDefs(typeDefsArr);
// TODO: use glob or some other method to grab relevent files
const resolverArr = loadFilesSync([
    join(__dirname, '../features/**/resolvers.ts'),
    join(__dirname, '../features/type-parsers.ts'),
    join(__dirname, '../features/type-parsers.js'),
    join(__dirname, '../features/**/resolvers.js'),
]);

const resolvers = mergeResolvers(resolverArr);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
