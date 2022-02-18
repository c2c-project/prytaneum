import { FastifyLoggerInstance } from 'fastify';

/**
 * Extremely simple and naive in memory cache.
 */
export class InMemoryCache<T = unknown> {
    private cache: Record<string, T>;

    private logger: FastifyLoggerInstance;

    constructor(logger: FastifyLoggerInstance) {
        this.cache = {};
        this.logger = logger.child({ module: 'InMemoryCache' });
    }

    /**
     * Adds an item with the given id and value to the cache
     */
    add(id: string, value: T) {
        if (this.has(id)) {
            this.logger.debug(`Item with ${id} already exists in the cache`);
            return;
        }
        this.logger.debug(`Item with ${id} added to cache.`);
        this.cache[id] = value;
    }

    /**
     * Check for existence of item with `id` in the cache.
     */
    has(id: string) {
        const isCacheHit = Boolean(this.cache[id]);
        this.logger.debug(isCacheHit ? `Cache hit for id: ${id}` : `Cache miss for id: ${id}`);
        return isCacheHit;
    }

    /**
     * Retrieve the item with `id` from the cache.  Returns false if the id does not exist in the cache.
     */
    get(id: string) {
        if (!this.has(id)) {
            this.logger.debug(`Cannot retrieve item that does not exist in cache with id: ${id}`);
            return false;
        }
        this.logger.debug(`Retrieving item from cache with id: ${id}`);
        return this.cache[id];
    }

    /**
     * Delete the item with `id` from the cache.
     */
    delete(id: string) {
        if (!this.has(id)) {
            this.logger.debug(`Cannot delete item that does not exist in cache with id: ${id}`);
            return false;
        }
        delete this.cache[id];
        return true;
    }
}
