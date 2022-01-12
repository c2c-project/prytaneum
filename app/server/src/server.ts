import fastify from 'fastify';
import logger from '@local/lib/logger';

export default function build() {
    const server = fastify({
        logger: {
            prettyPrint:
                process.env.NODE_ENV === 'development'
                    ? {
                          translateTime: 'HH:MM:ss Z',
                          ignore: 'pid,hostname',
                      }
                    : false,
        },
        trustProxy: true,
    });
    return server;
}
