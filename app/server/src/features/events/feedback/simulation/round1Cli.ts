export type Round1ImportCliOptions = {
    command: 'import';
    file: string;
    dryRun: boolean;
};

export type Round1PrepareCliOptions = {
    command: 'prepare';
    eventId: string;
    promptId: string;
    participantCount: number;
    topic: string;
    background: string;
    output: string;
    model?: string;
    force: boolean;
};

export type Round1CliOptions = Round1ImportCliOptions | Round1PrepareCliOptions;

function requireFlagValue(args: string[], index: number, flag: string): string {
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
    return value;
}

function parseImportOptions(args: string[]): Round1ImportCliOptions {
    let file = '';
    let dryRun = false;
    for (let index = 0; index < args.length; index++) {
        const argument = args[index];
        if (argument === '--dry-run') {
            dryRun = true;
        } else if (argument === '--file') {
            file = requireFlagValue(args, index, '--file');
            index++;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }
    if (!file) throw new Error('Usage: fgdt-round1 --file <path> [--dry-run]');
    return { command: 'import', file, dryRun };
}

function parsePrepareOptions(args: string[]): Round1PrepareCliOptions {
    const values: Record<string, string> = {};
    let force = false;
    for (let index = 0; index < args.length; index++) {
        const argument = args[index];
        if (argument === '--force') {
            force = true;
        } else if (
            ['--event', '--prompt', '--participants', '--topic', '--background', '--output', '--model'].includes(
                argument
            )
        ) {
            values[argument] = requireFlagValue(args, index, argument);
            index++;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }

    const requiredFlags = ['--event', '--prompt', '--participants', '--topic', '--background', '--output'];
    const missingFlags = requiredFlags.filter((flag) => !values[flag]);
    if (missingFlags.length > 0) {
        throw new Error(`Missing required argument(s): ${missingFlags.join(', ')}.`);
    }
    if (!/^\d+$/.test(values['--participants'])) {
        throw new Error('--participants must be an integer.');
    }

    return {
        command: 'prepare',
        eventId: values['--event'],
        promptId: values['--prompt'],
        participantCount: Number(values['--participants']),
        topic: values['--topic'],
        background: values['--background'],
        output: values['--output'],
        model: values['--model'],
        force,
    };
}

export function parseRound1CliOptions(args: string[]): Round1CliOptions {
    if (args[0] === 'prepare') return parsePrepareOptions(args.slice(1));
    return parseImportOptions(args);
}
