import type { FastifyLoggerInstance } from 'fastify';
import { Redis, Cluster } from 'ioredis';
// @ts-ignore - MockRedis is not typed
import MockRedis from 'ioredis-mock';

// Redis client must be a singleton
let _redis: Redis | Cluster | null = null;

function generateNewRedisClient(logger: FastifyLoggerInstance) {
    if (process.env.NODE_ENV === 'test') {
        logger.info('Using mock redis client.');
        return new MockRedis() as Redis;
    }
    logger.debug('DEBUG DNS lookup');
    const dns = require('dns');
    const res = dns.lookup(process.env.REDIS_HOST, console.log);
    console.log(res);
    logger.info('Generating new redis client.');
    if (process.env.NODE_ENV === 'production') {
        logger.info('Using production redis client.');
        return new Redis.Cluster(
            [
                {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                },
            ],
            {
                slotsRefreshTimeout: 10000, // 10 seconds
                redisOptions: {
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
                },
            }
        );
    }
    return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
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
