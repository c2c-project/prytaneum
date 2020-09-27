interface Storage {
    isLoggedIn: boolean;
}

const KEY = 'storage';
export function init() {
    // initalize
    if (!localStorage.getItem(KEY))
        localStorage.setItem(
            KEY,
            JSON.stringify({ isLoggedIn: false } as Storage)
        );
}

export function get(key: keyof Storage) {
    // init will always be called before get
    const storage = JSON.parse(localStorage.getItem(KEY) as string) as Storage;
    return storage[key];
}

export function set(newValues: Partial<Storage>) {
    const oldStorage = JSON.parse(
        localStorage.getItem(KEY) as string
    ) as Storage;
    const newStorage = { ...oldStorage, ...newValues };
    localStorage.setItem(KEY, JSON.stringify(newStorage));
}

export function clear() {
    localStorage.clear();
    init();
}
