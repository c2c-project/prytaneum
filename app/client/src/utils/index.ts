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
// source link for Regex https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
export function isURL(str: string) {
    const pattern = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    );
    return !!pattern.test(str);
}
