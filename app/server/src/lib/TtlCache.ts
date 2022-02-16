import { FastifyLoggerInstance } from 'fastify';

/**
 * Cache where each item has a given time to live (ttl).
 * TODO: A future optimization would be batch deleting
 * items that are older than N every M seconds rather
 * than assigning a NodeJS timeout to each item.
 */
export class TtlCache {
    private cache: Set<string>;

    private ttlSeconds: number;

    private logger: FastifyLoggerInstance;

    private timeoutHandlers: Set<NodeJS.Timeout>;

    constructor(logger: FastifyLoggerInstance, ttlSeconds = 60) {
        this.cache = new Set();
        this.ttlSeconds = ttlSeconds;
        this.logger = logger.child({ module: 'TtlCache' });
        this.timeoutHandlers = new Set();
    }

    private removeTimeoutHandler(handler: NodeJS.Timeout) {
        this.logger.trace(`Removing timeout handler ${handler}`);
        this.timeoutHandlers.delete(handler);
    }

    /**
     * Adds a given id to the cache.
     * Callback is invoked once the item has been remove from the cache.
     */
    add(id: string, onDelete?: () => void) {
        if (this.has(id)) {
            this.logger.debug(`Cannot add item with id ${id}; already exists.`);
            return;
        }
        this.cache.add(id);
        this.logger.debug(`Added item with id ${id} to cache.`);
        const handler = setTimeout(() => {
            this.cache.delete(id);
            this.logger.debug(`Deleted item with id ${id} from cache.`);
            this.removeTimeoutHandler(handler);
            if (onDelete) onDelete();
        }, this.ttlSeconds * 1000);
        this.timeoutHandlers.add(handler);
    }

    /**
     * Checks if the cache contains an item with the given id.
     */
    has(id: string) {
        const isCacheHit = this.cache.has(id);
        this.logger.debug(isCacheHit ? `Cache hit for id: ${id}.` : `Cache miss for id: ${id}.`);
        return isCacheHit;
    }

    /**
     * Cleanup function for extreme cases such as server crash.
     */
    destroy() {
        this.logger.debug('Destroying TtlCache.');
        this.timeoutHandlers.forEach((handler) => clearTimeout(handler));
    }
}
