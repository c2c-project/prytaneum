// eslint-disable-next-line import/prefer-default-export
export function parseTitle(str) {
    return str
        .split('-')
        .map((word) => {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
