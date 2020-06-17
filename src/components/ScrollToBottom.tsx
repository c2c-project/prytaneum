import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    active: boolean;
    children: JSX.Element | JSX.Element[];
}

export default function ScrollToBottom({ active, children }: Props) {
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const firstRender = React.useRef(true);
    const scrollToBottom = () => {
        if (active && bottomRef.current) {
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
