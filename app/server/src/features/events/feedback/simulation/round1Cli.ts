export type Round1ImportCliOptions = {
    command: 'import';
    file: string;
    dryRun: boolean;
};

export type Round1PrepareCliOptions = {
    command: 'prepare';
    eventId?: string;
    eventTitle?: string;
    promptId?: string;
    promptText?: string;
    participantCount: number;
    topic: string;
    background: string;
    output: string;
    force: boolean;
};

export type Round1RunCliOptions = {
    command: 'run';
    eventId?: string;
    eventTitle?: string;
    promptId?: string;
    promptText?: string;
    participantCount: number;
    topic: string;
    background: string;
    force: boolean;
    dryRun: boolean;
};

export type Round1CliOptions = Round1ImportCliOptions | Round1PrepareCliOptions | Round1RunCliOptions;

function requireFlagValue(args: string[], index: number, flag: string): string {
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
    return value;
}

function validateTargetIdentifiers(values: Record<string, string>): void {
    if (values['--event'] && values['--event-title']) {
        throw new Error('--event and --event-title cannot be used together.');
    }
    if (!values['--event'] && !values['--event-title']) {
        throw new Error('One of --event or --event-title is required.');
    }
    if (values['--prompt'] && values['--prompt-text']) {
        throw new Error('--prompt and --prompt-text cannot be used together.');
    }
    if (!values['--prompt'] && !values['--prompt-text']) {
        throw new Error('One of --prompt or --prompt-text is required.');
    }
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
            [
                '--event',
                '--event-title',
                '--prompt',
                '--prompt-text',
                '--participants',
                '--topic',
                '--background',
                '--output',
            ].includes(argument)
        ) {
            values[argument] = requireFlagValue(args, index, argument);
            index++;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }

    const requiredFlags = ['--participants', '--topic', '--background', '--output'];
    const missingFlags = requiredFlags.filter((flag) => !values[flag]);
    if (missingFlags.length > 0) {
        throw new Error(`Missing required argument(s): ${missingFlags.join(', ')}.`);
    }
    validateTargetIdentifiers(values);
    if (!/^\d+$/.test(values['--participants'])) {
        throw new Error('--participants must be an integer.');
    }

    return {
        command: 'prepare',
        ...(values['--event'] ? { eventId: values['--event'] } : {}),
        ...(values['--event-title'] ? { eventTitle: values['--event-title'] } : {}),
        ...(values['--prompt'] ? { promptId: values['--prompt'] } : {}),
        ...(values['--prompt-text'] ? { promptText: values['--prompt-text'] } : {}),
        participantCount: Number(values['--participants']),
        topic: values['--topic'],
        background: values['--background'],
        output: values['--output'],
        force,
    };
}

function parseRunOptions(args: string[]): Round1RunCliOptions {
    const values: Record<string, string> = {};
    let force = false;
    let dryRun = false;
    for (let index = 0; index < args.length; index++) {
        const argument = args[index];
        if (argument === '--force') {
            force = true;
        } else if (argument === '--dry-run') {
            dryRun = true;
        } else if (
            [
                '--event',
                '--event-title',
                '--prompt',
                '--prompt-text',
                '--participants',
                '--topic',
                '--background',
            ].includes(argument)
        ) {
            values[argument] = requireFlagValue(args, index, argument);
            index++;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }

    const requiredFlags = ['--participants', '--topic', '--background'];
    const missingFlags = requiredFlags.filter((flag) => !values[flag]);
    if (missingFlags.length > 0) {
        throw new Error(`Missing required argument(s): ${missingFlags.join(', ')}.`);
    }
    validateTargetIdentifiers(values);
    if (!/^\d+$/.test(values['--participants'])) {
        throw new Error('--participants must be an integer.');
    }

    return {
        command: 'run',
        ...(values['--event'] ? { eventId: values['--event'] } : {}),
        ...(values['--event-title'] ? { eventTitle: values['--event-title'] } : {}),
        ...(values['--prompt'] ? { promptId: values['--prompt'] } : {}),
        ...(values['--prompt-text'] ? { promptText: values['--prompt-text'] } : {}),
        participantCount: Number(values['--participants']),
        topic: values['--topic'],
        background: values['--background'],
        force,
        dryRun,
    };
}

export function parseRound1CliOptions(args: string[]): Round1CliOptions {
    if (args[0] === 'prepare') return parsePrepareOptions(args.slice(1));
    if (args[0] === 'run') return parseRunOptions(args.slice(1));
    return parseImportOptions(args);
}
