/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { SnackbarProvider } from 'notistack';

import type { Prompt } from '../useLiveFeedbackPrompt';
import { LiveFeedbackPromptResponseForm } from './LiveFeedbackPromptResponseForm';

function makePrompt(reasoningType: string, overrides: Partial<Prompt> = {}): Prompt {
    return {
        id: 'prompt-id',
        prompt: 'Choose an option',
        isVote: false,
        isOpenEnded: false,
        isMultipleChoice: true,
        multipleChoiceOptions: ['Option A', 'Option B'],
        reasoningType,
        ...overrides,
    };
}

describe('LiveFeedbackPromptResponseForm reasoning validation', function () {
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
    });

    function renderForm(prompt: Prompt, response: string) {
        ReactTestUtils.act(() => {
            render(
                <SnackbarProvider>
                    <LiveFeedbackPromptResponseForm
                        prompt={prompt}
                        initialState={{
                            promptId: prompt.id,
                            response,
                            vote: '',
                            multipleChoiceResponse: 'Option A',
                        }}
                    />
                </SnackbarProvider>,
                container
            );
        });

        const submit = container?.querySelector('button[type="submit"]');
        if (!(submit instanceof HTMLButtonElement)) throw new Error('Submit button not found.');
        return submit;
    }

    test.each(['', '   \t\n'])('disables submission for REQUIRED multiple choice with reasoning %p', (response) => {
        expect(renderForm(makePrompt('REQUIRED'), response).disabled).toBe(true);
    });

    test('enables submission for REQUIRED multiple choice with valid reasoning', () => {
        expect(renderForm(makePrompt('REQUIRED'), 'A substantive reason.').disabled).toBe(false);
    });

    test('enables submission for OPTIONAL multiple choice without reasoning', () => {
        expect(renderForm(makePrompt('OPTIONAL'), '').disabled).toBe(false);
    });

    test('enables submission for DISABLED multiple choice without reasoning', () => {
        expect(renderForm(makePrompt('DISABLED'), '').disabled).toBe(false);
        expect(container?.querySelector('#feedback-prompt-response-field')).toBeNull();
    });

    test('preserves maximum-length validation for multiple choice', () => {
        expect(renderForm(makePrompt('OPTIONAL'), 'x'.repeat(501)).disabled).toBe(true);
    });

    test('keeps open-ended non-multiple-choice reasoning required', () => {
        const prompt = makePrompt('OPTIONAL', { isOpenEnded: true, isMultipleChoice: false });

        expect(renderForm(prompt, '   ').disabled).toBe(true);
    });
});
