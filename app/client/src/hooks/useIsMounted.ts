import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any) => void;
type Return = [
    () => boolean,
    <T extends AnyFunc>(fn: T) => (...args: Parameters<T>) => void
];

export default function useIsMounted(): Return {
    const isMountedRef = React.useRef(true);
    const wrapper = React.useCallback(<T extends AnyFunc>(fn: T) => {
        return (...args: Parameters<T>) => {
            if (!isMountedRef.current) return;
            fn(...args);
        };
    }, []);
    React.useEffect(
        () => () => {
            isMountedRef.current = false;
        },
        []
    );
    return [() => isMountedRef.current, wrapper];
}
