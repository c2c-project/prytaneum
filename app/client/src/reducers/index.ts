import { useMemo } from 'react';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as langReducer } from './language';

import feedReducer from './question-feed';
import queueReducer from './quesiton-queue';

export default combineReducers({
    questions: feedReducer,
    queue: queueReducer,
    language: langReducer,
});

export * from './quesiton-queue';
export * from './question-feed';
export * from './language';

// function initStore(preloadedState = initialState) {
//     return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware()));
// }

// export const initializeStore = (preloadedState) => {
//     let _store = store ?? initStore(preloadedState);

//     // After navigating to a page with an initial Redux state, merge that state
//     // with the current state in the store, and create a new store
//     if (preloadedState && store) {
//         _store = initStore({
//             ...store.getState(),
//             ...preloadedState,
//         });
//         // Reset the current store
//         store = undefined;
//     }

//     // For SSG and SSR always create a new store
//     if (typeof window === 'undefined') return _store;
//     // Create the store once in the client
//     if (!store) store = _store;

//     return _store;
// };

// export function useStore(initialState) {
//     const store = useMemo(() => initializeStore(initialState), [initialState]);
//     return store;
// }
