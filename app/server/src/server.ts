/* eslint-disable @typescript-eslint/indent */
import fastify from 'fastify';
import { v4 as uuidv4 } from 'uuid';

export default function build() {
    const server = fastify({
        genReqId() {
            return uuidv4();
        },
        logger: {
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            serializers: {
                req(request) {
                    const { headers } = request;
                    return {
                        url: request.url,
                        headers: {
                            host: headers.host,
                            origin: headers.origin,
                            location: headers.location,
                            'user-agent': headers['user-agent'],
                            connection: headers.connection,
                            upgrade: headers.upgrade,
                            referer: headers.referer,
                        },
                    };
                },
                res(reply) {
                    return { statusCode: reply.statusCode };
                },
            },
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
