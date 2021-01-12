import React from 'react';
import PropTypes from 'prop-types';
import { Grow, Typography, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useDebounce from 'hooks/useDebounce';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const { NODE_ENV } = process.env;

interface Props {
    children: JSX.Element | JSX.Element[];
    direction: 'top' | 'bottom';
    active: boolean;
}

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'sticky',
        bottom: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    jumpButton: {
        width: '60%',
        // marginTop: '-1em',
        height: '1.75em',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        borderRadius: theme.shape.borderRadius,
    },
    sentinel: {
        height: '1px',
        width: '1px',
        visibility: 'hidden',
    },
}));

/** Scrolls to the top|bottom of the current page
 * @category Component
 * @constructor ScrollTo
 * @param props
 * @param {boolean} props.active tells whether or not the button is active to be used
 * @param {JSX.Element | JSX.Element[]} props.children returns to the bottom of children
 * @param {'top' | 'bottom'} props.direction tells to component to scroll up or down continuously, like how twich chat updates, the window scrolls down to update it
 */
export default function ScrollTo({
    children,
    direction,
    active: activeProp,
}: Props) {
    const classes = useStyles();
    const scrollTarget = React.useRef<HTMLDivElement | null>(null);
    const [active, setActive] = React.useState(activeProp);
    type Cb = IntersectionObserverCallback;
    const onIntersect = useDebounce<Cb>(
        // there should only ever be one entry, so this is fine
        // NOTE: on firefox, sometimes there will be multiple entries for the same element when there should only be one
        // on chrome this is not an issue
        ([entry]) => setActive(entry.isIntersecting),
        []
    );
    const io = useIntersectionObserver(onIntersect);
    const firstRender = React.useRef(true);
    const scrollToRef = (behavior: 'smooth' | 'auto') => {
        if (!scrollTarget.current) return;
        scrollTarget.current.scrollIntoView({
            behavior,
        });
    };

    const handleAutoScroll = () => {
        // this is needed for testing as window is null and there is no scrollIntoView fcn
        if (NODE_ENV === 'test') {
            window.HTMLElement.prototype.scrollIntoView = function () {};
        }
        if (scrollTarget.current && active) {
            scrollToRef(firstRender.current ? 'smooth' : 'auto');
        }
    };

    React.useEffect(() => {
        firstRender.current = false;
        return () => io.disconnect();
    }, [io]);

    React.useLayoutEffect(handleAutoScroll);

    // whenever scrollTarget.current changes, disconnect and observe
    // may be optimizations I could do here
    React.useEffect(() => {
        if (!scrollTarget.current) return;
        io.disconnect();
        io.observe(scrollTarget.current);
    }, [io]);

    const jumpTo = (
        <div className={classes.container}>
            <Grow in={!active}>
                <ButtonBase
                    className={classes.jumpButton}
                    onClick={() => scrollToRef('smooth')}
                >
                    <Typography>{`Jump to ${direction}`}</Typography>
                </ButtonBase>
            </Grow>
        </div>
    );

    switch (direction) {
        case 'top':
            return (
                <>
                    <div className={classes.sentinel} ref={scrollTarget} />
                    {children}
                </>
            );
        case 'bottom':
            return (
                <>
                    {children}
                    {jumpTo}
                    <div className={classes.sentinel} ref={scrollTarget} />
                </>
            );
        default:
            return <>{children}</>;
    }
}

ScrollTo.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
