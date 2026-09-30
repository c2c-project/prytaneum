import type { FastifyBaseLogger } from 'fastify';
import { Redis } from 'ioredis';
// @ts-ignore - MockRedis is not typed
import MockRedis from 'ioredis-mock';
import { getOrCreateServer } from '../server';

const server = getOrCreateServer();

// Redis client must be a singleton
let _redis: Redis | null = null;

function generateNewRedisClient(logger: FastifyBaseLogger = server.log): Redis {
    if (process.env.NODE_ENV === 'test') {
        logger.info('Using mock redis client.');
        return new MockRedis() as Redis;
    }
    logger.debug('DEBUG DNS lookup');
    const dns = require('dns');
    const res = dns.lookup(process.env.REDIS_HOST, console.log);
    logger.info('DNS lookup result:', res);
    logger.info('Generating new redis client.');
    if (process.env.NODE_ENV === 'production') {
        logger.info('Using production redis client.');
        return new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            connectTimeout: 10000, // 10 seconds
            retryStrategy(times) {
                if (times > 20) return null; // End reconnecting after 20 attempts
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
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
    return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 10000, // 10 seconds
        retryStrategy(times) {
            if (times > 20) return null; // End reconnecting after 20 attempts
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
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

export function getRedisClient(logger: FastifyBaseLogger = server.log): Redis {
    const redis = _redis ?? generateNewRedisClient();

    if (!_redis) {
        logger.info('Instantiating new redis client.');
        _redis = redis;
        redis.on('connect', () => logger.info('Redis client connected.'));
        redis.on('close', () => logger.info('Redis client closed.'));
        redis.on('ready', () => logger.info('Redis client ready.'));
        redis.on('reconnecting', () => logger.info('Redis client reconnecting.'));
        redis.on('error', (err) => logger.error(err));
        redis.on('end', () => logger.info('Redis client ended.'));
    }

    return redis;
}

// Release the singleton from one-shot scripts without creating a new connection
export function disconnectRedisClientIfCreated(): void {
    if (!_redis) return;
    _redis.disconnect();
    _redis = null;
}
