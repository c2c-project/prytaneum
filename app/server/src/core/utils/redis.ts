import type { FastifyLoggerInstance } from 'fastify';
import Redis from 'ioredis';
// @ts-ignore - MockRedis is not typed
import MockRedis from 'ioredis-mock';

// Redis client must be a singleton
let _redis: Redis | null = null;

function generateNewRedisClient(logger: FastifyLoggerInstance) {
    console.log(
        'ENV: ',
        process.env.REDIS_HOST,
        process.env.REDIS_PORT,
        process.env.REDIS_USERNAME,
        process.env.REDIS_PASSWORD
    );
    if (process.env.NODE_ENV === 'test') {
        logger.info('Using mock redis client.');
        return new MockRedis() as Redis;
    }
    logger.info('Generating new redis client.');
    return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 10000, // 10 seconds
        reconnectOnError(err) {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
                // Only reconnect when the error contains "READONLY"
                return true; // or `return 1;`
            }
            return false;
        },
    });
}

export function getRedisClient(logger: FastifyLoggerInstance) {
    const redis = _redis ?? generateNewRedisClient(logger);

    if (!_redis) {
        logger.info('Instantiating new redis client.');
        _redis = redis;
        redis.on('connect', () => logger.info('Redis client connected.'));
        redis.on('close', () => logger.info('Redis client closed.'));
        redis.on('ready', () => logger.info('Redis client ready.'));
        redis.on('reconnecting', () => logger.info('Redis client reconnecting.'));
        redis.on('error', (err) => logger.error(err));
    }

    return redis;
}
