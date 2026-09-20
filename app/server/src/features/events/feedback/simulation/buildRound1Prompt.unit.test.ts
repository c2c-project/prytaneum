import { buildRound1Prompt, pythonCapitalize } from './buildRound1Prompt';

describe('buildRound1Prompt', () => {
    test('preserves the FGDT persona and standpoint wording', () => {
        expect(
            buildRound1Prompt(
                { education: 'Bachelor\'s degree', gender: 'female', politics: 'liberal' },
                'nuclear power',
                'Which option do you support?',
                'Background facts.',
                ['KEEP NASA Funding', 'reduce TAXES']
            )
        ).toBe(
            'You will adopt the personality of a Bachelor\'s degree-educated, female, liberal-leaning ' +
                'focus group participant discussing nuclear power. ' +
                'You must select from one of the following possible standpoints on nuclear power ' +
                'and briefly provide your reasoning for doing so in 1-2 sentences. ' +
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
            ['Yes', 'No']
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
            buildRound1Prompt({}, 'transit', 'Choose?', 'Context.', ['Yes', 'No']).startsWith(
                'You will adopt the personality of a focus group participant discussing transit'
            )
        ).toBe(true);
    });
});
