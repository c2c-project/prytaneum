import type { FastifyInstance } from 'fastify';

export function attachPreHandlerTo(server: FastifyInstance) {
    server.log.debug('Attaching preHandler');
    server.addHook('preHandler', (req, reply, next) => {
        if (req.body && process.env.NODE_ENV !== 'production') {
            req.log.info({ msg: 'Parsed body', body: req.body });
        }
        next();
    });
}