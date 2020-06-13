import { unmountComponentAtNode } from 'react-dom';

/**
 * @returns {HTMLElement}
 */
export default function setup() {
    let container: React.ReactElement = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    return container;
}
