/* eslint-disable import/prefer-default-export */
// src/mocks/browser.js
import { setupWorker } from 'msw';
import handlers from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
