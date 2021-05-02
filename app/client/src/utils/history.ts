import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;

export function makeRelativeLink(path: string) {
    return `${history.location.pathname}${path}`;
}

export function handleNavigation(path: string) {
    return () => {
        history.push(path);
    };
}
