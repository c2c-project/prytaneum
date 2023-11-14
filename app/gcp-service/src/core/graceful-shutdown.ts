// TODO: make this much more robust.
export function initGracefulShutdown() {
    const cleanup = () => {};

    process.on('exit', cleanup);
    process.on('uncaughtException', cleanup);
}
