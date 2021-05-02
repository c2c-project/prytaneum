import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function makeRelativeLink(path: string) {
    return `${history.location.pathname}${path}`;
}

export function handleNavigation(path: string) {
    return () => {
        history.push(path);
    };
}
