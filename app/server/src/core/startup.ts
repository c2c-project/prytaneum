import { getServer } from './server';
import { checkEnv } from './check-env';
import { initGracefulShutdown } from './graceful-shutdown';
import { setupMetaRoutes } from './meta-routes';
import * as plugins from './plugins';
import * as hooks from './hooks';

export function startup() {
    const server = getServer();
    server.log.info('Performing setup checks...');
    checkEnv();
    initGracefulShutdown();
    setupMetaRoutes(server);

    server.log.info('Attaching plugins...');
    plugins.attachAltairTo(server);
    plugins.attachCookieTo(server);
    plugins.attachCorsTo(server);
    plugins.attachMercuriusTo(server);

    server.log.info('Attaching hooks...');
    hooks.attachPreHandlerTo(server);

    server.log.info('Finished server setup.');

    server
        .listen(process.env.PORT, process.env.HOST)
        .then((address) => {
            server.log.info(`Listening on ${address}`);
        })
        .catch((err) => {
            server.log.error(err);
            server.log.fatal('Failed to start server, exiting.');
            process.exit(1);
        });
}
