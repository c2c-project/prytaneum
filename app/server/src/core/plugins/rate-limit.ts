// import type { FastifyInstance } from 'fastify';
// import { getRedisClient } from '../utils/redis';

// export function attachRateLimitTo(server: FastifyInstance) {
//     const redis = getRedisClient(server.log);
//     const MAX_REQUESTS = 50;
//     const TIME_WINDOW_IN_MS = 10000; // 10 seconds
//     server.log.debug('Attaching fastify rate-limit.');
//     server.register(import('@fastify/rate-limit'), {
//         max: process.env.MAX_REQUESTS ?? MAX_REQUESTS,
//         timeWindow: process.env.TIME_WINDOW_IN_MS ?? TIME_WINDOW_IN_MS,
//         redis,
//     });
// }
