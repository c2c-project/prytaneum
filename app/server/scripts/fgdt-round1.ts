/* eslint-disable no-console */
import fs from 'fs';
import { PrismaClient } from '../src/__generated__/prisma';
import {
    importRound1Responses,
    parseRound1Output,
    preflightRound1Import,
} from '../src/features/events/feedback/simulation/importRound1';

type CliOptions = {
    file: string;
    dryRun: boolean;
};

function parseCliOptions(args: string[]): CliOptions {
    let file = '';
    let dryRun = false;
    for (let index = 0; index < args.length; index++) {
        const argument = args[index];
        if (argument === '--dry-run') {
            dryRun = true;
        } else if (argument === '--file') {
            file = args[index + 1] || '';
            index++;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }
    if (!file) throw new Error('Usage: fgdt-round1 --file <path> [--dry-run]');
    return { file, dryRun };
}

async function main() {
    const { file, dryRun } = parseCliOptions(process.argv.slice(2));
    const json = JSON.parse(fs.readFileSync(file, 'utf-8')) as unknown;
    const output = parseRound1Output(json);
    const prisma = new PrismaClient();
    try {
        if (dryRun) {
            const preflight = await preflightRound1Import(prisma, output);
            console.log(JSON.stringify({ dryRun: true, ...preflight }, null, 2));
            return;
        }
        const summary = await importRound1Responses(prisma, output);
        console.log(JSON.stringify(summary, null, 2));
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
    });
}
