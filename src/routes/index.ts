import history from 'utils/history';

export { default } from './App';

// in case if you need single page application
window.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (target && target.tagName === 'A') {
        event.preventDefault();
        const anchor = target as HTMLAnchorElement;
        const state = null;
        const url = `${anchor.pathname}${anchor.search}${anchor.hash}`;
        history.push(url, state);
    }
});
