import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';
import mercurius from 'mercurius';
import mercuriusCodgen from 'mercurius-codegen';

import { context } from './context';
import server from './server';

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
    context,
    subscription: true,
});

async function start() {
    // does not run in production -- https://github.com/mercurius-js/mercurius-typescript/tree/master/packages/mercurius-codegen
    mercuriusCodgen(server, {
        targetPath: join(__dirname, './graphql-types.ts'),
        watchOptions: {
            // enabled: true,
        },
    });

    await server.listen(4000);

    // TODO: don't hard code port and host
    console.log('🚀  Server ready at http://localhost:4000');
}

void start();