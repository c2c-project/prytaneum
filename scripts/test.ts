/**
 * This script is used to setup a minimal development server intended for e2e tests.
 */

import concurrently from 'concurrently';
import { join } from 'path';

const projectRoot = join(__dirname, '..');

const { result } = concurrently([
    { command: 'yarn workspace @app/client dev', name: 'client', prefixColor: 'bgMagenta.bold' },
    { command: 'yarn workspace @app/server dev', name: 'server', prefixColor: 'bgBlue.bold' },
    { command: 'yarn workspace @app/proxy dev', name: 'proxy', prefixColor: 'black.bgYellow.bold' },
    { command: `yarn exec ${projectRoot}/db/start-test-db.sh`, name: 'db', prefixColor: 'bgGreen.bold' },
    { command: `yarn exec ${projectRoot}/redis/start-redis.sh`, name: 'redis', prefixColor: 'bgRed.bold' },
]);

const noOp = () => {};

// No need to do anything here. Means the tests ended.
result.then(noOp, noOp);
