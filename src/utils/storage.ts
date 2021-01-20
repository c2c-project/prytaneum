/*
 * This file is a webstorage backed mini-api for caching things the app needs to know
 */

export interface Storage {
    isLoggedIn: boolean;
}

const defaults: Storage = {
    isLoggedIn: false,
};

/**
 * in case of private mode on safari, it won't actually store stuff
 * this data is lost on page refresh, which is fine if they're private browsing
 * which I don't imageine most safari users are doing
 */
const miniStorage: Storage = {
    isLoggedIn: false,
};

/**
 * takes the value from localStorage and puts it into miniStorage in a type-safe (ish) way
 * TODO: reset all stored values if github sha stored is different from the current one
 */
function loadValue<T extends keyof Storage>(key: T, value: string) {
    const parsedValue = JSON.parse(value) as Storage[T];
    miniStorage[key] = parsedValue;
}

/**
 * loads all values from localStorage to miniStorage if there are any
 */
export function init() {
    // load all values available from local storage
    const keys = Object.keys(miniStorage) as (keyof Storage)[];
    for (let i = 0; i < keys.length; i += 1) {
        const value = localStorage.getItem(keys[i]);
        if (value !== null) loadValue(keys[i], value);
    }
}

/**
 * only returns from miniStorage
 */
export function get<T extends keyof Storage>(key: T): Storage[T] {
    return miniStorage[key];
}

/**
 * saves the values to both the miniStorage and localStorage
 */
export function set<T extends keyof Storage>(key: T, value: Storage[T]) {
    miniStorage[key] = value;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // do nothing for now
        // TODO: log this to the server
    }
}

export function clear() {
    localStorage.clear();
    const keys = Object.keys(miniStorage);
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i] as keyof Storage;
        miniStorage[key] = defaults[key];
    }
    init();
}
