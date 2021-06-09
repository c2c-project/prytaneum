import { useContext } from 'react';
import { EventContext } from './EventContext';

export function useEvent() {
    const ctxValue = useContext(EventContext);
    if (ctxValue === null) throw new Error('`EventContext` must be in the tree to use `useEvent`');
    return ctxValue;
}