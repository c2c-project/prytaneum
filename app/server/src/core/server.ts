/* eslint-disable @typescript-eslint/indent */
import fastify, { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

// Server should be a singleton.
let _server: FastifyInstance | null = null;

const makeProductionServer = () =>
    fastify({
        genReqId: () => uuidv4(),
        logger: {
            level: process.env.LOG_LEVEL ?? 'info',
            serializers: {
                req: ({ headers, url }) => ({
                    url,
                    headers: {
                        host: headers.host,
                        origin: headers.origin,
                        location: headers.location,
                        'user-agent': headers['user-agent'],
                        connection: headers.connection,
                        upgrade: headers.upgrade,
                        referer: headers.referer,
                    },
                }),
                res: ({ statusCode }) => ({ statusCode }),
            },
        },
        trustProxy: true,
    });

const makeDevelopmentServer = () =>
    fastify({
        genReqId: () => uuidv4(),
        logger: {
            level: process.env.LOG_LEVEL ?? 'debug',
            prettyPrint: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname,res,reqId,req',
            },
        },
    });

const makeServer = process.env.NODE_ENV === 'production' ? makeProductionServer : makeDevelopmentServer;

export function getOrCreateServer() {
    const server = _server ?? makeServer();
    if (!_server) _server = server;
    return server;
}
