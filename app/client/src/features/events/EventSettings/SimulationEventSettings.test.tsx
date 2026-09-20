/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { useFragment, useMutation } from 'react-relay';

import { SimulationEventSettings } from './SimulationEventSettings';

jest.mock('react-relay', () => ({
    graphql: jest.fn(() => ({})),
    useFragment: jest.fn(),
    useMutation: jest.fn(),
}));
jest.mock('@local/core', () => ({ useSnack: () => ({ displaySnack: jest.fn() }) }));

const mockUseFragment = useFragment as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;

describe('SimulationEventSettings covariates', function () {
    let container: HTMLDivElement;
    const commit = jest.fn();

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        mockUseFragment.mockReturnValue({
            id: 'event-id',
            simulationEnabled: true,
            simulationParticipantCount: 3,
            simulationTopic: 'Transit',
            simulationBackground: 'Background',
            simulationCovariates: ['region', 'politics'],
        });
        mockUseMutation.mockReturnValue([commit, false]);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        jest.clearAllMocks();
    });

    function renderSettings() {
        ReactTestUtils.act(() => {
            render(<SimulationEventSettings fragmentRef={{} as never} />, container);
        });
    }

    test('shows persisted checkbox state and saves updated keys', () => {
        renderSettings();

        const region = container.querySelector<HTMLInputElement>('input[name="simulation-covariate-region"]')!;
        const politics = container.querySelector<HTMLInputElement>('input[name="simulation-covariate-politics"]')!;
        const age = container.querySelector<HTMLInputElement>('input[name="simulation-covariate-age"]')!;
        expect(region.checked).toBe(true);
        expect(politics.checked).toBe(true);
        expect(age.checked).toBe(false);

        ReactTestUtils.act(() => age.click());
        ReactTestUtils.act(() => {
            Array.from(container.querySelectorAll('button'))
                .find((button) => button.textContent === 'Save')!
                .click();
        });

        expect(commit).toHaveBeenCalledWith(
            expect.objectContaining({
                variables: {
                    input: expect.objectContaining({ simulationCovariates: ['region', 'politics', 'age'] }),
                },
            })
        );
    });

    test('requires at least one selected covariate', () => {
        renderSettings();

        const region = container.querySelector<HTMLInputElement>('input[name="simulation-covariate-region"]')!;
        ReactTestUtils.act(() => region.click());
        expect(container.querySelector<HTMLInputElement>('input[name="simulation-covariate-region"]')!.checked).toBe(
            false
        );

        const politics = container.querySelector<HTMLInputElement>('input[name="simulation-covariate-politics"]')!;
        ReactTestUtils.act(() =>
            ReactTestUtils.Simulate.change(politics, {
                target: { checked: false } as unknown as EventTarget,
            })
        );
        expect(container.querySelector<HTMLInputElement>('input[name="simulation-covariate-politics"]')!.checked).toBe(
            false
        );

        expect(container.textContent).toContain('Select at least one persona covariate.');
        expect(
            Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Save')!.disabled
        ).toBe(true);
    });

    test('allows participant count to be temporarily empty and normalizes it on blur', () => {
        renderSettings();
        let input = container.querySelector<HTMLInputElement>('input[name="simulation-participant-count"]')!;

        ReactTestUtils.act(() => {
            input.value = '';
            ReactTestUtils.Simulate.change(input, { target: input });
        });
        input = container.querySelector<HTMLInputElement>('input[name="simulation-participant-count"]')!;
        expect(input.value).toBe('');
        expect(
            Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Save')!.disabled
        ).toBe(true);

        ReactTestUtils.act(() => {
            input.value = '03';
            ReactTestUtils.Simulate.change(input, { target: input });
        });
        input = container.querySelector<HTMLInputElement>('input[name="simulation-participant-count"]')!;
        ReactTestUtils.act(() => ReactTestUtils.Simulate.blur(input));
        input = container.querySelector<HTMLInputElement>('input[name="simulation-participant-count"]')!;
        expect(input.value).toBe('3');
    });
});
