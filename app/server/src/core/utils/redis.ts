import type { FastifyLoggerInstance } from 'fastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

// Redis client must be a singleton
let _redis: RedisClientType | null = null;

export async function getRedisClient(logger: FastifyLoggerInstance) {
    const redis =
        _redis ??
        createClient({
            socket: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
        });
    if (!_redis) {
        logger.info('Instantiating new redis client.');
        _redis = redis;
        _redis.on('error', (err) => logger.error(err));
        if (process.env.NODE_ENV !== 'test') {
            await _redis.connect();
            logger.info('Redis client connected.');
        }
    }

    return redis;
}
