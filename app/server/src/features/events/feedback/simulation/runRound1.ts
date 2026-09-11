import { spawn } from 'child_process';
import { constants, rmSync } from 'fs';
import { access, mkdtemp, readFile, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import type { PrismaClient } from '@local/__generated__/prisma';
import { parseRound1Output, persistRound1Responses, preflightRound1Import, Round1Output } from './importRound1';
import { prepareRound1Input, Round1Input } from './prepareRound1';

export type RunRound1Options = {
    eventId: string;
    promptId: string;
    participantCount: number;
    topic: string;
    background: string;
    simulatorDir: string;
    model: string;
    force: boolean;
    python: string;
    keepFiles: boolean;
    dryRun: boolean;
};

export type RunRound1Summary = {
    runId: string;
    eventId: string;
    promptId: string;
    participantCount: number;
    insertedCount: number;
    dryRun: boolean;
    tempDirectory?: string;
};

export class Round1RunError extends Error {
    tempDirectory?: string;

    constructor(message: string, tempDirectory?: string) {
        super(message);
        this.name = 'Round1RunError';
        this.tempDirectory = tempDirectory;
    }
}

type Dependencies = {
    prepare: typeof prepareRound1Input;
    parse: typeof parseRound1Output;
    preflight: typeof preflightRound1Import;
    persistResponses: typeof persistRound1Responses;
    spawnProcess: typeof spawn;
};

const defaultDependencies: Dependencies = {
    prepare: prepareRound1Input,
    parse: parseRound1Output,
    preflight: preflightRound1Import,
    persistResponses: persistRound1Responses,
    spawnProcess: spawn,
};

function assertEqual(actual: string, expected: string, fieldName: string): void {
    if (actual !== expected) {
        throw new Round1RunError(`Simulator output ${fieldName} does not match prepared input.`);
    }
}

/** Ensure simulator output belongs to the exact input prepared for this run. */
export function validateRound1OutputCorrelation(input: Round1Input, output: Round1Output): void {
    assertEqual(output.runId, input.runId, 'runId');
    assertEqual(output.eventId, input.eventId, 'eventId');
    assertEqual(output.promptId, input.promptId, 'promptId');

    if (
        output.options.length !== input.options.length ||
        output.options.some((option, index) => option !== input.options[index])
    ) {
        throw new Round1RunError('Simulator output options do not match prepared input in value and order.');
    }

    if (output.responses.length !== input.participants.length) {
        throw new Round1RunError('Simulator output participant count does not match prepared input.');
    }

    const expectedUserByParticipantKey = new Map(
        input.participants.map(({ participantKey, userId }) => [participantKey, userId])
    );
    for (const response of output.responses) {
        const expectedUserId = expectedUserByParticipantKey.get(response.participantKey);
        if (expectedUserId === undefined) {
            throw new Round1RunError(
                `Simulator output participantKey "${response.participantKey}" does not match prepared input.`
            );
        }
        if (response.userId !== expectedUserId) {
            throw new Round1RunError(
                `Simulator output userId for participantKey "${response.participantKey}" does not match prepared input.`
            );
        }
    }
}

async function validateSimulator(simulatorDir: string): Promise<string> {
    let directoryStats;
    try {
        directoryStats = await stat(simulatorDir);
    } catch {
        throw new Round1RunError(`Simulator directory does not exist: ${simulatorDir}`);
    }
    if (!directoryStats.isDirectory()) {
        throw new Round1RunError(`Simulator path is not a directory: ${simulatorDir}`);
    }

    const scriptPath = path.join(simulatorDir, 'Round1_frequencies.py');
    try {
        await access(scriptPath, constants.R_OK);
    } catch {
        throw new Round1RunError(`Simulator script does not exist or is not readable: ${scriptPath}`);
    }
    return scriptPath;
}

async function runSimulator(
    spawnProcess: typeof spawn,
    python: string,
    simulatorDir: string,
    scriptPath: string,
    inputPath: string,
    outputPath: string
): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        const child = spawnProcess(python, [scriptPath, '--input', inputPath, '--output', outputPath], {
            cwd: simulatorDir,
            stdio: 'inherit',
        });
        let completed = false;
        child.once('error', (error) => {
            if (completed) return;
            completed = true;
            reject(new Round1RunError(`Could not start Python executable "${python}": ${error.message}`));
        });
        child.once('close', (code, signal) => {
            if (completed) return;
            completed = true;
            if (code === 0) {
                resolve();
                return;
            }
            const detail = signal ? `signal ${signal}` : `exit code ${code}`;
            reject(new Round1RunError(`FGDT simulator failed with ${detail}.`));
        });
    });
}

/** Coordinate the existing Round 1 prepare, validation, and transactional import services. */
export async function runRound1(
    prisma: PrismaClient,
    options: RunRound1Options,
    dependencyOverrides: Partial<Dependencies> = {}
): Promise<RunRound1Summary> {
    const dependencies = { ...defaultDependencies, ...dependencyOverrides };
    const scriptPath = await validateSimulator(options.simulatorDir);
    const input = await dependencies.prepare(prisma, options);
    const tempDirectory = await mkdtemp(path.join(tmpdir(), 'prytaneum-fgdt-round1-'));
    const inputPath = path.join(tempDirectory, 'input.json');
    const outputPath = path.join(tempDirectory, 'output.json');

    try {
        await writeFile(inputPath, `${JSON.stringify(input, null, 2)}\n`, 'utf-8');
        await runSimulator(
            dependencies.spawnProcess,
            options.python,
            options.simulatorDir,
            scriptPath,
            inputPath,
            outputPath
        );

        try {
            await access(outputPath, constants.R_OK);
        } catch {
            throw new Round1RunError(`FGDT simulator did not create output file: ${outputPath}`);
        }

        let json: unknown;
        try {
            json = JSON.parse(await readFile(outputPath, 'utf-8')) as unknown;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Round1RunError(`Could not parse simulator output JSON: ${message}`);
        }
        const output = dependencies.parse(json);
        validateRound1OutputCorrelation(input, output);
        const preflight = await dependencies.preflight(prisma, output);

        let insertedCount = 0;
        if (!options.dryRun) {
            const importSummary = await dependencies.persistResponses(prisma, output);
            insertedCount = importSummary.insertedCount;
        }

        return {
            runId: preflight.runId,
            eventId: preflight.eventId,
            promptId: preflight.promptId,
            participantCount: preflight.responseCount,
            insertedCount,
            dryRun: options.dryRun,
            ...(options.keepFiles ? { tempDirectory } : {}),
        };
    } catch (error) {
        if (options.keepFiles) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Round1RunError(message, tempDirectory);
        }
        throw error;
    } finally {
        if (!options.keepFiles) rmSync(tempDirectory, { recursive: true, force: true });
    }
}
