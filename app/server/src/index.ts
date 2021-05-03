import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';
import mercurius from 'mercurius';
import mercuriusCodgen from 'mercurius-codegen';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';

import { buildContext } from './context';
import { server } from './server';

const typeDefsArr = loadFilesSync(join(__dirname, './features/**/*.graphql'));
const typeDefs = mergeTypeDefs(typeDefsArr);

const resolverArr = loadFilesSync([
    join(__dirname, './features/**/resolvers.ts'),
    join(__dirname, './features/type-parsers.ts'),
]);
const resolvers = mergeResolvers(resolverArr);

const schema = makeExecutableSchema({ typeDefs, resolvers });

server.register(mercurius, {
    schema,
    graphiql: true, // TODO: remove in prod
    context: buildContext,
    subscription: true,
});

server.register(cookie, {
    secret: 'secret', // TODO: env
} as FastifyCookieOptions);

async function start() {
    // does not run in production -- https://github.com/mercurius-js/mercurius-typescript/tree/master/packages/mercurius-codegen
    mercuriusCodgen(server, {
        targetPath: join(__dirname, './graphql-types.ts'),
        watchOptions: {
            // enabled: true,
        },
    });

    await server.listen(4000);
}

start();
