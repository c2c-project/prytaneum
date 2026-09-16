import type { PrismaClient } from '@local/__generated__/prisma';
import { Round1Output } from './importRound1';
import { Round1Input, Round1PrepareError } from './prepareRound1';
import { runRound1, RunRound1Options, validateRound1OutputCorrelation } from './runRound1';
import { simulateRound1 } from './simulateRound1';

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
    generation: { force: false },
    participants: [
        {
            participantKey: 'fgdt-demo-01',
            userId: USER_ID,
            persona: { covariates: { gender: 'female', education: 'Bachelor\'s degree', politics: 'liberal' } },
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
    force: false,
    dryRun: false,
};

function makeDependencies() {
    return {
        prepare: jest.fn().mockResolvedValue(input),
        simulate: jest.fn().mockResolvedValue(output),
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
    };
}

describe('runRound1', () => {
    test('runs the internal simulator, validates, and imports once', async () => {
        const dependencies = makeDependencies();
        const summary = await runRound1({} as PrismaClient, options, dependencies as Parameters<typeof runRound1>[2]);

        expect(summary).toEqual({
            runId: output.runId,
            eventId: EVENT_ID,
            promptId: PROMPT_ID,
            participantCount: 1,
            insertedCount: 1,
            dryRun: false,
        });
        expect(dependencies.prepare).toHaveBeenCalledWith({} as PrismaClient, options);
        expect(dependencies.simulate).toHaveBeenCalledWith(input);
        expect(dependencies.parse).toHaveBeenCalledWith(output);
        expect(dependencies.preflight).toHaveBeenCalledTimes(1);
        expect(dependencies.persistResponses).toHaveBeenCalledTimes(1);
    });

    test('dry-run performs simulation and preflight but skips import', async () => {
        const dependencies = makeDependencies();
        const summary = await runRound1(
            {} as PrismaClient,
            { ...options, dryRun: true },
            dependencies as Parameters<typeof runRound1>[2]
        );

        expect(summary).toMatchObject({ insertedCount: 0, participantCount: 1, dryRun: true });
        expect(dependencies.simulate).toHaveBeenCalledTimes(1);
        expect(dependencies.preflight).toHaveBeenCalledTimes(1);
        expect(dependencies.persistResponses).not.toHaveBeenCalled();
    });

    test('runs the mocked end-to-end internal simulation flow', async () => {
        const dependencies = makeDependencies();
        const askGemini = jest.fn().mockResolvedValue('{"Standpoint 2":"Mocked Gemini reasoning."}');
        dependencies.simulate.mockImplementation((preparedInput: Round1Input) =>
            simulateRound1(preparedInput, askGemini)
        );
        dependencies.parse.mockImplementation((rawOutput: Round1Output) => rawOutput);

        await expect(
            runRound1({} as PrismaClient, options, dependencies as Parameters<typeof runRound1>[2])
        ).resolves.toMatchObject({ participantCount: 1, insertedCount: 1 });

        const simulatedOutput = dependencies.preflight.mock.calls[0][1] as Round1Output;
        expect(simulatedOutput.responses).toEqual([
            {
                participantKey: 'fgdt-demo-01',
                userId: USER_ID,
                standpointNum: 2,
                selectedOption: 'No',
                reasoning: 'Mocked Gemini reasoning.',
            },
        ]);
        expect(dependencies.persistResponses).toHaveBeenCalledWith(expect.anything(), simulatedOutput);
    });

    test('does not call Gemini or import when too few unused participants remain', async () => {
        const dependencies = makeDependencies();
        dependencies.prepare.mockRejectedValue(
            new Round1PrepareError('Only 1 unused simulated participants remain for this survey, but 2 were requested.')
        );

        await expect(
            runRound1({} as PrismaClient, options, dependencies as Parameters<typeof runRound1>[2])
        ).rejects.toThrow('Only 1 unused simulated participants remain');
        expect(dependencies.simulate).not.toHaveBeenCalled();
        expect(dependencies.preflight).not.toHaveBeenCalled();
        expect(dependencies.persistResponses).not.toHaveBeenCalled();
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
    ])('rejects mismatched %s', (_description, mismatchedOptions) => {
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ options: mismatchedOptions }))).toThrow(
            'Simulator output options do not match prepared input in value and order'
        );
    });

    test('rejects a mismatched participant count', () => {
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses: [] }))).toThrow(
            'Simulator output participant count does not match prepared input'
        );
    });

    test('rejects mismatched participant identity', () => {
        const wrongKey = [{ ...output.responses[0], participantKey: 'another-participant' }];
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses: wrongKey }))).toThrow(
            'Simulator output participantKey "another-participant" does not match prepared input'
        );

        const wrongUser = [{ ...output.responses[0], userId: '33333333-3333-3333-3333-333333333333' }];
        expect(() => validateRound1OutputCorrelation(input, changedOutput({ responses: wrongUser }))).toThrow(
            'Simulator output userId for participantKey "fgdt-demo-01" does not match prepared input'
        );
    });

    test('does not preflight or persist after a correlation failure', async () => {
        const dependencies = makeDependencies();
        dependencies.parse.mockReturnValue(changedOutput({ runId: 'another-run' }));

        await expect(
            runRound1({} as PrismaClient, options, dependencies as Parameters<typeof runRound1>[2])
        ).rejects.toThrow('Simulator output runId does not match prepared input');
        expect(dependencies.preflight).not.toHaveBeenCalled();
        expect(dependencies.persistResponses).not.toHaveBeenCalled();
    });
});
