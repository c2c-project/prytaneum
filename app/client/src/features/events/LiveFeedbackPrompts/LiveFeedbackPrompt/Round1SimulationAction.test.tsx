/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { Round1SimulationAction } from './Round1SimulationAction';

jest.mock('@mui/material/useMediaQuery', () => () => true);

function findButton(label: string): HTMLButtonElement {
    const button = Array.from(document.querySelectorAll('button')).find((item) => item.textContent === label);
    if (!button) throw new Error(`Could not find button "${label}".`);
    return button;
}

describe('Round1SimulationAction', function () {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    function renderAction(hasResponses: boolean, onRun: () => Promise<void>) {
        ReactTestUtils.act(() => {
            render(
                <Round1SimulationAction
                    hasResponses={hasResponses}
                    configurationError={false}
                    isRunning={false}
                    onRun={onRun}
                />,
                container
            );
        });
    }

    test('runs the first simulation directly without showing confirmation', async () => {
        const onRun = jest.fn().mockResolvedValue(undefined);
        renderAction(false, onRun);

        expect(document.body.textContent).not.toContain('Are you sure you would like to run the simulation again?');
        await ReactTestUtils.act(async () => {
            findButton('Run Simulation').click();
            await Promise.resolve();
        });

        expect(onRun).toHaveBeenCalledTimes(1);
    });

    test('opens confirmation before a repeated run without invoking it', () => {
        const onRun = jest.fn().mockResolvedValue(undefined);
        renderAction(true, onRun);

        ReactTestUtils.act(() => findButton('Run Simulation Again').click());

        expect(document.body.textContent).toContain('Are you sure you would like to run the simulation again?');
        expect(onRun).not.toHaveBeenCalled();
    });

    test('cancel closes confirmation without invoking simulation', async () => {
        const onRun = jest.fn().mockResolvedValue(undefined);
        renderAction(true, onRun);
        ReactTestUtils.act(() => findButton('Run Simulation Again').click());

        await ReactTestUtils.act(async () => {
            findButton('Cancel').click();
            await new Promise((resolve) => setTimeout(resolve, 300));
        });

        expect(document.body.textContent).not.toContain('Are you sure you would like to run the simulation again?');
        expect(onRun).not.toHaveBeenCalled();
    });

    test('confirm invokes simulation exactly once and duplicate clicks cannot start another run', async () => {
        let finishRun: () => void = () => {};
        const onRun = jest.fn().mockReturnValue(
            new Promise<void>((resolve) => {
                finishRun = resolve;
            })
        );
        renderAction(true, onRun);
        ReactTestUtils.act(() => findButton('Run Simulation Again').click());

        await ReactTestUtils.act(async () => {
            const confirm = findButton('Run Simulation');
            confirm.click();
            confirm.click();
            await Promise.resolve();
        });

        expect(onRun).toHaveBeenCalledTimes(1);

        await ReactTestUtils.act(async () => {
            finishRun();
            await Promise.resolve();
        });
    });
});
