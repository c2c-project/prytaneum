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
