import React from 'react';
import PropTypes from 'prop-types';

const { NODE_ENV } = process.env;

interface Props {
    active: boolean;
    children: JSX.Element | JSX.Element[];
    direction: 'top' | 'bottom';
}

/** Scrolls to the top|bottom of the current page
 * @category Component
 * @constructor ScrollTo
 * @param props
 * @param {boolean} props.active tells whether or not the button is active to be used
 * @param {JSX.Element | JSX.Element[]} props.children returns to the bottom of children
 */
export default function ScrollTo({ active, children, direction }: Props) {
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const topRef = React.useRef<HTMLDivElement>(null);
    const firstRender = React.useRef(true);
    const scrollTo = () => {
        const ref = direction === 'top' ? topRef : bottomRef;
        // this is needed for testing as window is null and there is no scrollIntoView fcn
        if (NODE_ENV === 'test') {
            window.HTMLElement.prototype.scrollIntoView = function() {};
        }
        if (active && ref.current) {
            ref.current.scrollIntoView({
                behavior: firstRender.current ? 'smooth' : 'auto',
            });
        }
    };
    React.useEffect(scrollTo);
    React.useEffect(() => {
        firstRender.current = false;
    }, []);
    return (
        <>
            <div ref={topRef} />
            {children}
            <div ref={bottomRef} />
        </>
    );
}

ScrollTo.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
