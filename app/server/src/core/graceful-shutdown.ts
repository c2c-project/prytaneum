import type { GcpPubSub } from '@local/lib/GcpPubSub';

// TODO: make this much more robust.
export function initGracefulShutdown(emitter?: GcpPubSub) {
    const cleanup = () => {
        if (emitter) emitter.close();
    };

    process.on('exit', cleanup);
    process.on('uncaughtException', cleanup);
}
