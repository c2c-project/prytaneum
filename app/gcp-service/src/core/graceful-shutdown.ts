import type { FastifyLoggerInstance } from 'fastify';

// TODO: make this much more robust.
export function initGracefulShutdown(logger: FastifyLoggerInstance) {
    const cleanup = () => {};

    process.on('exit', cleanup);
    process.on('uncaughtException', cleanup);
}
