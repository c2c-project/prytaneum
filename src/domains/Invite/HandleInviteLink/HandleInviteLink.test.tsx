/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import HandleInviteLink, { consumeInviteToken, ErrorDialog } from './HandleInviteLink';

jest.mock('hooks/useSnack');
jest.mock('hooks/useEndpoint');

describe('Handle Invite Link', () => {
	let container: HTMLElement | null = null;
	const testValidToken = jwt.sign({ email: 'test@test.com' }, 'secret');

	beforeEach(() => {
		// setup a DOM element as a render target
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		// cleanup on exiting
		if (container) {
			unmountComponentAtNode(container);
			container.remove();
		}
		container = null;
		jest.restoreAllMocks();
	});

	// eslint-disable-next-line jest/expect-expect
	it('should render', async () => {
		ReactTestUtils.act(() => {
			render(
				<MemoryRouter initialEntries={[ `/invited/${testValidToken}` ]}>
					<Route path="/invited/:token">
						<HandleInviteLink />
					</Route>
				</MemoryRouter>,
				container
			);
		});
	});
});

describe('Error Dialog', () => {
	let container: HTMLElement | null = null;

	beforeEach(() => {
		// setup a DOM element as a render target
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		// cleanup on exiting
		if (container) {
			unmountComponentAtNode(container);
			container.remove();
		}
		container = null;
		jest.restoreAllMocks();
	});

	// eslint-disable-next-line jest/expect-expect
	it('should render', async () => {
		ReactTestUtils.act(() => {
			render(<ErrorDialog errorMessage="test" />, container);
		});
	});
});

describe('consumeInviteToken', () => {
	it('should return valid data from valid token', () => {
		const testPayload = { email: 'test@example.com', townHallId: 'test' };
		const token = jwt.sign(testPayload, 'secret');
		const result = consumeInviteToken(token);
		expect(result).toStrictEqual(testPayload);
	});

	it('should throw error if no token provided', () => {
		expect(consumeInviteToken).toThrowError(JsonWebTokenError);
	});

	it('should throw error if token does not contain email field', () => {
		const testPayload = { townHallId: 'test' };
		const token = jwt.sign(testPayload, 'secret');
		expect(() => consumeInviteToken(token)).toThrow('Undefined token data');
	});

	it('should throw error if token does not contain townHallId field', () => {
		const testPayload = { email: 'test@example.com' };
		const token = jwt.sign(testPayload, 'secret');
		expect(() => consumeInviteToken(token)).toThrow('Undefined token data');
	});

	it('should throw error with invalid token', () => {
		expect(() => consumeInviteToken('malformed')).toThrowError(JsonWebTokenError);
	});

	it('should throw error with invalid token secret', () => {
		const testPayload = {
			email: 'test@example.com',
			townHallId: 'test',
		};
		const token = jwt.sign(testPayload, 'invalid');
		expect(() => consumeInviteToken(token)).toThrowError(JsonWebTokenError);
	});
});
