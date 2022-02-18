import type { FastifyInstance } from 'fastify';

export function setupMetaRoutes(server: FastifyInstance) {
    server.log.debug('Setting up meta routes.');

    // Routes for kubernetes health checks.
    server.get('/', async () => ({ status: 'Healthy' }));
    server.get('/healthz', async () => ({ status: 'Healthy' }));
}
