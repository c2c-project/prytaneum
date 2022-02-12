import type { MQGCP } from '@local/lib/mqgcp';

export function initCleanup(emitter: MQGCP) {
    const cleanup = () => {
        emitter.close();
    };

    process.on('exit', cleanup);
    process.on('uncaughtException', cleanup);
}
