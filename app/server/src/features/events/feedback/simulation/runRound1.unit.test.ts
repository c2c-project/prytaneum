import { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import type { PrismaClient } from '@local/__generated__/prisma';
import { Round1Output } from './importRound1';
import { Round1Input } from './prepareRound1';
import { runRound1, RunRound1Options, validateRound1OutputCorrelation } from './runRound1';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const PROMPT_ID = '90990f38-1855-4aaa-a417-fd4227fdbf7a';
const USER_ID = '00000000-0000-0000-0000-000000000001';

const input: Round1Input = {
    schemaVersion: 1,
    runId: 'fgdt-test-run',
    eventId: EVENT_ID,
    promptId: PROMPT_ID,
    question: 'Question?',
    topic: 'topic',
    background: 'background',
    options: ['Yes', 'No'],
    generation: { model: 'gemini-3.5-flash', force: false },
    participants: [
        {
            participantKey: 'fgdt-demo-01',
            userId: USER_ID,
            persona: { covariates: { gender: 'female', education: 'Bachelor\u0027s degree', politics: 'liberal' } },
        },
    ],
};

const output: Round1Output = {
    schemaVersion: 1,
    runId: input.runId,
    eventId: EVENT_ID,
    promptId: PROMPT_ID,
    model: 'gemini-3.5-flash',
    generatedAt: '2026-09-02T00:00:00.000Z',
    options: input.options,
    responses: [
        {
            participantKey: 'fgdt-demo-01',
            userId: USER_ID,
            standpointNum: 1,
            selectedOption: 'Yes',
            reasoning: 'Reason',
        },
    ],
};

const options: RunRound1Options = {
    eventId: EVENT_ID,
    promptId: PROMPT_ID,
    participantCount: 1,
    topic: 'topic',
    background: 'background',
    simulatorDir: '',
    model: 'gemini-3.5-flash',
    force: false,
    python: 'python',
    keepFiles: false,
    dryRun: false,
};

function makeSimulatorDirectory(): string {
    const directory = path.join(tmpdir(), `prytaneum-fgdt-test-${Date.now()}-${Math.random()}`);
    mkdirSync(directory);
    writeFileSync(path.join(directory, 'Round1_frequencies.py'), '# test\n');
    return directory;
}

function makeChild(code: number): ChildProcess {
    const child = new EventEmitter() as ChildProcess;
    setImmediate(() => child.emit('close', code, null));
    return child;
}

function makeDependencies(spawnProcess: jest.Mock) {
    return {
        prepare: jest.fn().mockResolvedValue(input),
        parse: jest.fn().mockReturnValue(output),
        preflight: jest.fn().mockResolvedValue({
            runId: output.runId,
            eventId: output.eventId,
            promptId: output.promptId,
            responseCount: output.responses.length,
            participantKeys: ['fgdt-demo-01'],
        }),
        persistResponses: jest.fn().mockResolvedValue({
            runId: output.runId,
            promptId: output.promptId,
            insertedCount: 1,
            participantKeys: ['fgdt-demo-01'],
        }),
        spawnProcess,
    };
}

function successfulSpawn(capturedTempDirectory?: { value?: string }): jest.Mock {
    return jest.fn((_python: string, args: string[]) => {
        const inputPath = args[2];
        const outputPath = args[4];
        expect(JSON.parse(readFileSync(inputPath, 'utf-8'))).toEqual(input);
        if (capturedTempDirectory) capturedTempDirectory.value = path.dirname(inputPath);
        writeFileSync(outputPath, JSON.stringify(output));
        return makeChild(0);
    });
}

describe('runRound1', () => {
    let simulatorDir: string;

    beforeEach(() => {
        simulatorDir = makeSimulatorDirectory();
    });

    afterEach(() => {
        rmSync(simulatorDir, { recursive: true, force: true });
    });

    test('orchestrates a successful run, imports once, and cleans temporary files by default', async () => {
        const captured = {} as { value?: string };
        const spawnProcess = successfulSpawn(captured);
        const dependencies = makeDependencies(spawnProcess);

        const summary = await runRound1(
            {} as PrismaClient,
            { ...options, simulatorDir },
            dependencies as Parameters<typeof runRound1>[2]
        );

        expect(summary).toEqual({
            runId: output.runId,
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 1,
            insertedCount: 1,
            dryRun: false,
        });
        expect(dependencies.preflight).toHaveBeenCalledTimes(1);
        expect(dependencies.persistResponses).toHaveBeenCalledTimes(1);
        expect(spawnProcess).toHaveBeenCalledWith(
            'python',
            [
                path.join(simulatorDir, 'Round1_frequencies.py'),
                '--input',
                expect.any(String),
                '--output',
                expect.any(String),
            ],
            { cwd: simulatorDir, stdio: 'inherit' }
        );
        expect(captured.value).toBeDefined();
        expect(existsSync(captured.value!)).toBe(false);
    });

    test('fails clearly on a nonzero Python exit and cleans temporary files', async () => {
        let tempDirectory = '';
        const spawnProcess = jest.fn((_python: string, args: string[]) => {
            tempDirectory = path.dirname(args[2]);
            return makeChild(2);
        });

        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir },
                makeDependencies(spawnProcess) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('FGDT simulator failed with exit code 2');
        expect(existsSync(tempDirectory)).toBe(false);
    });

    test('fails clearly when the child process emits an error', async () => {
        const spawnProcess = jest.fn(() => {
            const child = new EventEmitter() as ChildProcess;
            setImmediate(() => child.emit('error', new Error('spawn failed')));
            return child;
        });

        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir },
                makeDependencies(spawnProcess) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('Could not start Python executable "python": spawn failed');
    });

    test('fails when the simulator does not create its output file', async () => {
        const spawnProcess = jest.fn(() => makeChild(0));

        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir },
                makeDependencies(spawnProcess) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('FGDT simulator did not create output file');
    });

    test('fails clearly when simulator output is invalid JSON', async () => {
        const spawnProcess = jest.fn((_python: string, args: string[]) => {
            writeFileSync(args[4], '{invalid json');
            return makeChild(0);
        });

        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir },
                makeDependencies(spawnProcess) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('Could not parse simulator output JSON');
    });

    test('dry-run performs preflight but skips import', async () => {
        const dependencies = makeDependencies(successfulSpawn());

        const summary = await runRound1(
            {} as PrismaClient,
            { ...options, simulatorDir, dryRun: true },
            dependencies as Parameters<typeof runRound1>[2]
        );

        expect(summary).toMatchObject({ insertedCount: 0, participantCount: 1, dryRun: true });
        expect(dependencies.preflight).toHaveBeenCalledTimes(1);
        expect(dependencies.persistResponses).not.toHaveBeenCalled();
    });

    test('--keep-files preserves and reports the temporary directory', async () => {
        const dependencies = makeDependencies(successfulSpawn());
        const summary = await runRound1(
            {} as PrismaClient,
            { ...options, simulatorDir, keepFiles: true },
            dependencies as Parameters<typeof runRound1>[2]
        );

        expect(summary.tempDirectory).toBeDefined();
        expect(existsSync(path.join(summary.tempDirectory!, 'input.json'))).toBe(true);
        expect(existsSync(path.join(summary.tempDirectory!, 'output.json'))).toBe(true);
        rmSync(summary.tempDirectory!, { recursive: true, force: true });
    });

    test('--keep-files preserves and reports files after a failure', async () => {
        const spawnProcess = jest.fn(() => makeChild(2));

        let error: unknown;
        try {
            await runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir, keepFiles: true },
                makeDependencies(spawnProcess) as Parameters<typeof runRound1>[2]
            );
        } catch (caught) {
            error = caught;
        }

        expect(error).toMatchObject({
            message: 'FGDT simulator failed with exit code 2.',
            tempDirectory: expect.any(String),
        });
        const tempDirectory = (error as { tempDirectory: string }).tempDirectory;
        expect(existsSync(path.join(tempDirectory, 'input.json'))).toBe(true);
        rmSync(tempDirectory, { recursive: true, force: true });
    });

    test('rejects a missing simulator directory', async () => {
        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir: path.join(tmpdir(), 'missing-fgdt-simulator-directory') },
                makeDependencies(jest.fn()) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('Simulator directory does not exist');
    });

    test('rejects a simulator path that is not a directory', async () => {
        const filePath = path.join(simulatorDir, 'not-a-directory');
        writeFileSync(filePath, 'test');

        await expect(
            runRound1(
                {} as PrismaClient,
                { ...options, simulatorDir: filePath },
                makeDependencies(jest.fn()) as Parameters<typeof runRound1>[2]
            )
        ).rejects.toThrow('Simulator path is not a directory');
    });
});

describe('validateRound1OutputCorrelation', () => {
    function changedOutput(change: Partial<Round1Output>): Round1Output {
        return { ...output, ...change };
    }

    test.each([
        ['runId', changedOutput({ runId: 'another-run' })],
        ['eventId', changedOutput({ eventId: '11111111-1111-1111-1111-111111111111' })],
        ['promptId', changedOutput({ promptId: '22222222-2222-2222-2222-222222222222' })],
    ])('rejects a mismatched %s', (fieldName, mismatchedOutput) => {
        expect(() => validateRound1OutputCorrelation(input, mismatchedOutput)).toThrow(
            `Simulator output ${fieldName} does not match prepared input`
        );
    });

    test.each([
        ['option values', ['Maybe', 'No']],
        ['option order', ['No', 'Yes']],
    ])('rejects mismatched %s', (_description, options) => {
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ options }))).toThrow(
            'Simulator output options do not match prepared input in value and order'
        );
    });

    test('rejects a mismatched participant count', () => {
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses: [] }))).toThrow(
            'Simulator output participant count does not match prepared input'
        );
    });

    test('rejects a mismatched participantKey', () => {
        const responses = [{ ...output.responses[0], participantKey: 'another-participant' }];
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses }))).toThrow(
            'Simulator output participantKey "another-participant" does not match prepared input'
        );
    });

    test('rejects a mismatched userId', () => {
        const responses = [{ ...output.responses[0], userId: '33333333-3333-3333-3333-333333333333' }];
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses }))).toThrow(
            'Simulator output userId for participantKey "fgdt-demo-01" does not match prepared input'
        );
    });

    test('does not preflight or persist after a correlation failure', async () => {
        const dependencies = makeDependencies(successfulSpawn());
        dependencies.parse.mockReturnValue(changedOutput({ runId: 'another-run' }));
        const simulatorDir = makeSimulatorDirectory();

        try {
            await expect(
                runRound1(
                    {} as PrismaClient,
                    { ...options, simulatorDir },
                    dependencies as Parameters<typeof runRound1>[2]
                )
            ).rejects.toThrow('Simulator output runId does not match prepared input');
            expect(dependencies.preflight).not.toHaveBeenCalled();
            expect(dependencies.persistResponses).not.toHaveBeenCalled();
        } finally {
            rmSync(simulatorDir, { recursive: true, force: true });
        }
    });
});
