/**
 * This script is used to setup a development environment.
 */

import concurrently from 'concurrently';
import { join } from 'path';

const projectRoot = join(__dirname, '..');

const { result } = concurrently([
    { command: 'yarn workspace @app/client dev', name: 'client', prefixColor: 'bgMagenta.bold' },
    { command: 'yarn workspace @app/server dev', name: 'server', prefixColor: 'bgBlue.bold' },
    { command: 'yarn workspace @app/proxy dev', name: 'proxy', prefixColor: 'black.bgYellow.bold' },
    { command: 'yarn workspace @app/client relay', name: 'relay', prefixColor: 'black.bgCyan' },
    { command: 'graphql-codegen --config codegen.yml', name: 'graphql-codegen', prefixColor: 'bgCyan.bold' },
    {
        command: `yarn exec ${projectRoot}/db/start-db.sh && yarn workspace @app/server prisma-db-push`,
        name: 'db',
        prefixColor: 'bgGreen.bold',
    },
]);

const noOp = () => {};

// We don't need to do anything here, most likely control + c was pressed to end the dev environment.
result.then(noOp, noOp);
