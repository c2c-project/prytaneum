import { getOrCreateServer } from './server';
import { checkEnv } from './check-env';
import { initGracefulShutdown } from './graceful-shutdown';
import { setupMetaRoutes } from './meta-routes';
import { getPrismaClient, getRedisClient } from './utils';
import * as plugins from './plugins';
import * as hooks from './hooks';

export function startup() {
    const server = getOrCreateServer();
    server.log.info('Performing setup checks...');
    checkEnv();
    initGracefulShutdown(server.log);
    setupMetaRoutes(server);
    // Init prisma client
    getPrismaClient(server.log);
    // Intit redis client
    getRedisClient(server.log);

    server.log.info('Attaching plugins...');
    plugins.attachAltairTo(server);
    plugins.attachCookieTo(server);
    plugins.attachCorsTo(server);
    plugins.attachMercuriusTo(server);
    plugins.attachMulterTo(server);

    server.log.info('Attaching hooks...');
    hooks.attachPreHandlerTo(server);

    server.log.info('Attaching routes...');
    require('@local/features/accounts/account');

    server.log.info('Finished server setup.');

    server.listen({ port: parseInt(process.env.PORT), host: process.env.HOST }, (err, address) => {
        if (err) {
            server.log.error(err);
            server.log.fatal('Failed to start server, exiting.');
            process.exit(1);
        } else {
            server.log.info(`Listening on ${address}`);
        }
    });
}
