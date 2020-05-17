import React from 'react';
import PropTypes from 'prop-types';

export default function ScrollToBottom({ active, children }) {
    const bottomRef = React.useRef();
    const scrollToBottom = () => {
        if (active) {
            bottomRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };
    React.useEffect(scrollToBottom, [active]);
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
