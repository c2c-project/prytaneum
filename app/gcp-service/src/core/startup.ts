import { getOrCreateServer } from './server';
import { checkEnv } from './check-env';
import { initGracefulShutdown } from './graceful-shutdown';
import { setupMetaRoutes } from './meta-routes';
import * as plugins from './plugins';
import * as hooks from './hooks';

require('@local/routes/upload-file');

export function startup() {
    const server = getOrCreateServer();
    server.log.info('Performing setup checks...');
    checkEnv();
    initGracefulShutdown();
    setupMetaRoutes(server);

    server.log.info('Attaching plugins...');
    plugins.attachCorsTo(server);
    plugins.attachMulterTo(server);

    server.log.info('Attaching hooks...');
    hooks.attachPreHandlerTo(server);

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
