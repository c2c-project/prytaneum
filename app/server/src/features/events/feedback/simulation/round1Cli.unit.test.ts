import { parseRound1CliOptions } from './round1Cli';

const runArgs = [
    'run',
    '--event',
    'event-uuid',
    '--prompt',
    'prompt-uuid',
    '--participants',
    '5',
    '--topic',
    'topic',
    '--background',
    'background',
];

describe('parseRound1CliOptions', () => {
    test('preserves standalone import behavior', () => {
        expect(parseRound1CliOptions(['--file', '/tmp/output.json', '--dry-run'])).toEqual({
            command: 'import',
            file: '/tmp/output.json',
            dryRun: true,
        });
    });

    test('parses prepare without model selection', () => {
        expect(
            parseRound1CliOptions([
                'prepare',
                '--event',
                'event-uuid',
                '--prompt',
                'prompt-uuid',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--output',
                '/tmp/input.json',
                '--force',
            ])
        ).toEqual({
            command: 'prepare',
            eventId: 'event-uuid',
            promptId: 'prompt-uuid',
            participantCount: 5,
            topic: 'topic',
            background: 'background',
            output: '/tmp/input.json',
            force: true,
        });
    });

    test('parses an internal run with defaults', () => {
        expect(parseRound1CliOptions(runArgs)).toEqual({
            command: 'run',
            eventId: 'event-uuid',
            promptId: 'prompt-uuid',
            participantCount: 5,
            topic: 'topic',
            background: 'background',
            force: false,
            dryRun: false,
        });
    });

    test('parses force, dry-run, and human-readable identifiers', () => {
        expect(
            parseRound1CliOptions([
                'run',
                '--event-title',
                'Event',
                '--prompt-text',
                'Prompt',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--force',
                '--dry-run',
            ])
        ).toMatchObject({ command: 'run', eventTitle: 'Event', promptText: 'Prompt', force: true, dryRun: true });
    });

    test.each(['--simulator-dir', '--python', '--keep-files', '--model'])(
        'rejects obsolete argument %s',
        (obsoleteArgument) => {
            const args = [...runArgs, obsoleteArgument];
            if (obsoleteArgument !== '--keep-files') args.push('value');
            expect(() => parseRound1CliOptions(args)).toThrow(`Unknown argument: ${obsoleteArgument}`);
        }
    );

    test('requires an event and prompt identifier form', () => {
        expect(() =>
            parseRound1CliOptions(['run', '--participants', '5', '--topic', 'topic', '--background', 'background'])
        ).toThrow('One of --event or --event-title is required');
    });

    test('rejects a non-integer participant count', () => {
        const args = [...runArgs];
        args[args.indexOf('5')] = '5.5';
        expect(() => parseRound1CliOptions(args)).toThrow('--participants must be an integer');
    });
});
