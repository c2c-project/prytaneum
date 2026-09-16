/* eslint-disable no-console */
import fs from 'fs';
import { PrismaClient } from '../src/__generated__/prisma';
import { disconnectRedisClientIfCreated } from '../src/core/utils/redis';
import {
    importRound1Responses,
    parseRound1Output,
    preflightRound1Import,
} from '../src/features/events/feedback/simulation/importRound1';
import { prepareRound1Input } from '../src/features/events/feedback/simulation/prepareRound1';
import { parseRound1CliOptions } from '../src/features/events/feedback/simulation/round1Cli';
import { resolveRound1Target } from '../src/features/events/feedback/simulation/resolveRound1Target';
import { runRound1 } from '../src/features/events/feedback/simulation/runRound1';

async function main() {
    const options = parseRound1CliOptions(process.argv.slice(2));
    const prisma = new PrismaClient();
    try {
        if (options.command === 'prepare') {
            const target = await resolveRound1Target(prisma, options);
            const input = await prepareRound1Input(prisma, {
                eventId: target.eventId,
                promptId: target.promptId,
                participantCount: options.participantCount,
                topic: options.topic,
                background: options.background,
                force: options.force,
            });
            fs.writeFileSync(options.output, `${JSON.stringify(input, null, 2)}\n`, 'utf-8');
            console.log(
                JSON.stringify(
                    {
                        eventId: input.eventId,
                        promptId: input.promptId,
                        participantCount: input.participants.length,
                        participantKeys: input.participants.map(({ participantKey }) => participantKey),
                        output: options.output,
                    },
                    null,
                    2
                )
            );
            return;
        }

        if (options.command === 'run') {
            const target = await resolveRound1Target(prisma, options);
            const summary = await runRound1(prisma, { ...options, ...target });
            console.log(JSON.stringify(summary, null, 2));
            return;
        }

        const json = JSON.parse(fs.readFileSync(options.file, 'utf-8')) as unknown;
        const output = parseRound1Output(json);
        if (options.dryRun) {
            const preflight = await preflightRound1Import(prisma, output);
            console.log(JSON.stringify({ dryRun: true, ...preflight }, null, 2));
            return;
        }
        const summary = await importRound1Responses(prisma, output);
        console.log(JSON.stringify(summary, null, 2));
    } finally {
        disconnectRedisClientIfCreated();
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
    });
}
