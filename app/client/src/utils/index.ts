/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

// this is an okay usage of any, cause it could really be anything and ts will infer it
export type Callback = (...params: any[]) => void;
export function debounce<T extends Callback>(cb: T, timeout: number): Callback {
    let isAllowed = true;
    return (...args) => {
        if (!isAllowed) return;
        isAllowed = false;
        cb(...args);
        setTimeout(() => {
            isAllowed = true;
        }, timeout);
    };
}
