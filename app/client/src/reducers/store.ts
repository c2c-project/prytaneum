import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';

let STORE;

function initStore(preloadedState) {
    return createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware()));
}

export const initializeStore = (preloadedState?: any) => {
    let _store = STORE ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && STORE) {
        _store = initStore({
            ...STORE.getState(),
            ...preloadedState,
        });
        // Reset the current store
        STORE = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!STORE) STORE = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
