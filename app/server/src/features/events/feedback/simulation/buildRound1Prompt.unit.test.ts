import { buildRound1Prompt, pythonCapitalize } from './buildRound1Prompt';

describe('buildRound1Prompt', () => {
    test('preserves the FGDT persona and standpoint wording', () => {
        expect(
            buildRound1Prompt(
                { education: 'Bachelor\u0027s degree', gender: 'female', politics: 'liberal' },
                'nuclear power',
                'Which option do you support?',
                'Background facts.',
                {
                    questionType: 'MULTIPLE_CHOICE',
                    options: ['KEEP NASA Funding', 'reduce TAXES'],
                    reasoningType: 'REQUIRED',
                }
            )
        ).toBe(
            'You will adopt the personality of a Bachelor\u0027s degree-educated, female, liberal-leaning ' +
                'focus group participant discussing nuclear power. ' +
                'You must select from one of the following possible standpoints on nuclear power. ' +
                'Briefly provide your reasoning for doing so in 1-2 sentences. ' +
                'The possible standpoints are:\n' +
                'Standpoint 1: Keep nasa funding. Standpoint 2: Reduce taxes. ' +
                '\nPolling question: Which option do you support?\nBackground facts.\n' +
                'Format your response in JSON format such as {"Standpoint 2": "your reasoning"}:\n\n'
        );
    });

    test('matches Python capitalize behavior for option casing', () => {
        expect(pythonCapitalize('mIXED Case NASA')).toBe('Mixed case nasa');
    });

    test('renders selected demographic blocks in canonical FGDT order', () => {
        const prompt = buildRound1Prompt(
            {
                employstatus: 'Student',
                uscitizen: 'Yes',
                region: 'South',
                age: '18-29',
                race: 'Other',
            },
            'transit',
            'Choose?',
            'Context.',
            { questionType: 'MULTIPLE_CHOICE', options: ['Yes', 'No'], reasoningType: 'REQUIRED' }
        );

        expect(prompt).toContain(
            'Non-White, focus group participant discussing transit. ' +
                'You come from the South region of the United States. ' +
                'You are 18-29 years old. You are a citizen of the United States. ' +
                'Your employment status is Student. '
        );
        expect(prompt).not.toContain('education');
        expect(prompt).not.toContain('political');
    });

    test('supports an empty covariate selection', () => {
        expect(
            buildRound1Prompt({}, 'transit', 'Choose?', 'Context.', {
                questionType: 'MULTIPLE_CHOICE',
                options: ['Yes', 'No'],
                reasoningType: 'REQUIRED',
            }).startsWith('You will adopt the personality of a focus group participant discussing transit')
        ).toBe(true);
    });

    test('does not request reasoning when it is disabled', () => {
        const prompt = buildRound1Prompt({}, 'transit', 'Choose?', 'Context.', {
            questionType: 'MULTIPLE_CHOICE',
            options: ['Yes', 'No'],
            reasoningType: 'DISABLED',
        });

        expect(prompt).not.toContain('provide your reasoning');
        expect(prompt).toContain('{"Standpoint 2": ""}');
    });

    test('makes reasoning optional when configured as optional', () => {
        const prompt = buildRound1Prompt({}, 'transit', 'Choose?', 'Context.', {
            questionType: 'MULTIPLE_CHOICE',
            options: ['Yes', 'No'],
            reasoningType: 'OPTIONAL',
        });

        expect(prompt).toContain('You may briefly provide your reasoning');
    });

    test.each(['DISABLED', 'OPTIONAL', 'REQUIRED'] as const)(
        'builds a vote prompt for %s reasoning',
        (reasoningType) => {
            const prompt = buildRound1Prompt({}, 'transit', 'Support the plan?', 'Context.', {
                questionType: 'VOTE',
                reasoningType,
            });

            expect(prompt).toContain('vote exactly FOR, AGAINST, or CONFLICTED');
            expect(prompt).toContain('{"vote": "<SELECTED_OPTION>"');
            expect(prompt).not.toContain('Standpoint 1');
        }
    );

    test('builds an open-ended prompt without standpoint or reasoning language', () => {
        const prompt = buildRound1Prompt({}, 'transit', 'What should change?', 'Context.', {
            questionType: 'OPEN_ENDED',
        });

        expect(prompt).toContain('concise, direct free-text response');
        expect(prompt).toContain('approximately 400 characters or fewer');
        expect(prompt).toContain('{"response": "your response"}');
        expect(prompt).not.toContain('standpoint');
        expect(prompt).not.toContain('reasoning');
    });
});
