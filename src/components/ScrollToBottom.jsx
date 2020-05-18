import React from 'react';
import PropTypes from 'prop-types';

export default function ScrollToBottom({ active, children }) {
    const bottomRef = React.useRef();
    const firstRender = React.useRef(true);
    const scrollToBottom = () => {
        if (active) {
            bottomRef.current.scrollIntoView({
                behavior: firstRender.current ? 'smooth' : 'auto',
            });
        }
    };
    React.useEffect(scrollToBottom);
    React.useEffect(() => {
        firstRender.current = false;
    }, []);
    return (
        <>
            {children}
            <div ref={bottomRef} />
        </>
    );
}

ScrollToBottom.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
