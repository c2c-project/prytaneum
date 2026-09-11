import { parseRound1CliOptions } from './round1Cli';

describe('parseRound1CliOptions', () => {
    test('preserves the existing import CLI behavior', () => {
        expect(parseRound1CliOptions(['--file', '/tmp/output.json', '--dry-run'])).toEqual({
            command: 'import',
            file: '/tmp/output.json',
            dryRun: true,
        });
        expect(parseRound1CliOptions(['--file', '/tmp/output.json'])).toEqual({
            command: 'import',
            file: '/tmp/output.json',
            dryRun: false,
        });
    });

    test('parses the prepare command', () => {
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
                'the adoption of nuclear power',
                '--background',
                'Background text',
                '--output',
                '/tmp/input.json',
                '--model',
                'gemini-test',
                '--force',
            ])
        ).toEqual({
            command: 'prepare',
            eventId: 'event-uuid',
            promptId: 'prompt-uuid',
            participantCount: 5,
            topic: 'the adoption of nuclear power',
            background: 'Background text',
            output: '/tmp/input.json',
            model: 'gemini-test',
            force: true,
        });
    });

    test('parses the run command with defaults', () => {
        expect(
            parseRound1CliOptions([
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
                '--simulator-dir',
                '/opt/FGDT-simulator',
            ])
        ).toEqual({
            command: 'run',
            eventId: 'event-uuid',
            promptId: 'prompt-uuid',
            participantCount: 5,
            topic: 'topic',
            background: 'background',
            simulatorDir: '/opt/FGDT-simulator',
            model: 'gemini-3.5-flash',
            force: false,
            python: 'python',
            keepFiles: false,
            dryRun: false,
        });
    });

    test('parses all optional run arguments', () => {
        const options = parseRound1CliOptions([
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
            '--simulator-dir',
            '/opt/FGDT-simulator',
            '--model',
            'gemini-test',
            '--python',
            '/opt/conda/bin/python',
            '--force',
            '--keep-files',
            '--dry-run',
        ]);

        expect(options).toMatchObject({
            command: 'run',
            model: 'gemini-test',
            python: '/opt/conda/bin/python',
            force: true,
            keepFiles: true,
            dryRun: true,
        });
    });

    test('parses human-readable identifiers for prepare', () => {
        expect(
            parseRound1CliOptions([
                'prepare',
                '--event-title',
                'Nuclear Energy Forum',
                '--prompt-text',
                'Should nuclear power be expanded?',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--output',
                'input.json',
            ])
        ).toMatchObject({
            command: 'prepare',
            eventTitle: 'Nuclear Energy Forum',
            promptText: 'Should nuclear power be expanded?',
        });
    });

    test('accepts mixed identifier modes for run', () => {
        expect(
            parseRound1CliOptions([
                'run',
                '--event',
                'event-uuid',
                '--prompt-text',
                'Prompt text',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--simulator-dir',
                '/opt/FGDT-simulator',
            ])
        ).toMatchObject({ command: 'run', eventId: 'event-uuid', promptText: 'Prompt text' });
    });

    test('requires an event and prompt identifier form', () => {
        const base = [
            'run',
            '--participants',
            '5',
            '--topic',
            'topic',
            '--background',
            'background',
            '--simulator-dir',
            '/opt/FGDT-simulator',
        ];
        expect(() => parseRound1CliOptions(base)).toThrow('One of --event or --event-title is required');
        expect(() => parseRound1CliOptions([...base, '--event-title', 'Event'])).toThrow(
            'One of --prompt or --prompt-text is required'
        );
    });

    test('rejects both event identifier forms', () => {
        expect(() =>
            parseRound1CliOptions([
                'prepare',
                '--event',
                'event-uuid',
                '--event-title',
                'Event',
                '--prompt',
                'prompt-uuid',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--output',
                'input.json',
            ])
        ).toThrow('--event and --event-title cannot be used together');
    });

    test('rejects both prompt identifier forms', () => {
        expect(() =>
            parseRound1CliOptions([
                'run',
                '--event',
                'event-uuid',
                '--prompt',
                'prompt-uuid',
                '--prompt-text',
                'Prompt',
                '--participants',
                '5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--simulator-dir',
                '/opt/FGDT-simulator',
            ])
        ).toThrow('--prompt and --prompt-text cannot be used together');
    });

    test('requires all prepare arguments', () => {
        expect(() => parseRound1CliOptions(['prepare', '--participants', '5'])).toThrow('Missing required argument(s)');
    });

    test('rejects a non-integer participant count', () => {
        expect(() =>
            parseRound1CliOptions([
                'prepare',
                '--event',
                'event-uuid',
                '--prompt',
                'prompt-uuid',
                '--participants',
                '5.5',
                '--topic',
                'topic',
                '--background',
                'background',
                '--output',
                'input.json',
            ])
        ).toThrow('--participants must be an integer');
    });
});
