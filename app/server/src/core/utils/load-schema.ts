import type { FastifyLoggerInstance } from 'fastify';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';

export function loadSchema(logger: FastifyLoggerInstance) {
    const typeDefsArr = loadFilesSync(join(__dirname, '../../features/**/*.graphql'));
    logger.debug(`Found ${typeDefsArr.length} type definition files.`);
    const typeDefs = mergeTypeDefs(typeDefsArr);
    // TODO: use glob or some other method to grab relevent files
    const resolverArr = loadFilesSync([
        join(__dirname, '../../features/**/resolvers.ts'),
        join(__dirname, '../../features/type-parsers.ts'),
        join(__dirname, '../../features/**/resolvers.js'),
        join(__dirname, '../../features/type-parsers.js'),
    ]);

    logger.debug(`Found ${resolverArr.length} resolver & type-parser definition files.`);
    logger.trace({ resolverArr });

    const resolvers = mergeResolvers(resolverArr);

    return makeExecutableSchema({ typeDefs, resolvers });
}
