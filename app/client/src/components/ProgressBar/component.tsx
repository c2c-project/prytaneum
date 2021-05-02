import * as React from 'react';
// original code here: https://github.com/sghall/react-compound-slider/blob/master/docs/src/demos/horizontal/components.tsx
import {
    GetRailProps,
    GetHandleProps,
    GetTrackProps,
    SliderItem,
} from 'react-compound-slider';
import PropTypes from 'prop-types';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
    position: 'absolute' as const,
    width: '100%',
    height: 42,
    transform: 'translate(0%, -50%)',
    borderRadius: 7,
    cursor: 'pointer',
};

const railInnerStyle = {
    position: 'absolute' as const,
    width: '100%',
    height: 14,
    transform: 'translate(0%, -50%)',
    borderRadius: 7,
    pointerEvents: 'none' as const,
    backgroundColor: 'rgb(155,155,155)',
};

interface SliderRailProps {
    getRailProps: GetRailProps;
}

// eslint-disable-next-line react/prop-types
export const SliderRail = ({ getRailProps }: SliderRailProps) => {
    return (
        <>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div style={railOuterStyle} {...getRailProps()} />
            <div style={railInnerStyle} />
        </>
    );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
    domain: number[];
    handle: SliderItem;
    getHandleProps: GetHandleProps;
    disabled?: boolean;
}

export const Handle = ({
    domain: [min, max],
    // eslint-disable-next-line react/prop-types
    handle: { id, value, percent },
    disabled = false,
    // eslint-disable-next-line react/prop-types
    getHandleProps,
}: HandleProps) => {
    return (
        <>
            <div
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                    zIndex: 5,
                    width: 28,
                    height: 42,
                    cursor: 'pointer',
                    backgroundColor: 'none',
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getHandleProps(id)}
            />
            <div
                role='slider'
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-label='slider'
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
                    backgroundColor: disabled ? '#666' : '#9BBFD4',
                }}
            />
        </>
    );
};

Handle.propTypes = {
    domain: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
};

Handle.defaultProps = {
    disabled: false,
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle = ({
    domain: [min, max],
    // eslint-disable-next-line react/prop-types
    handle: { id, value, percent },
    disabled = false,
    // eslint-disable-next-line react/prop-types
    getHandleProps,
}: HandleProps) => {
    return (
        // eslint-disable-next-line react/button-has-type
        <button
            role='slider'
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{
                left: `${percent}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                width: 24,
                height: 24,
                borderRadius: '50%',
                boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
                backgroundColor: disabled ? '#666' : '#9BBFD4',
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getHandleProps(id)}
        />
    );
};
KeyboardHandle.propTypes = {
    domain: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
};

KeyboardHandle.defaultProps = {
    disabled: false,
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
    source: SliderItem;
    target: SliderItem;
    getTrackProps: GetTrackProps;
    disabled?: boolean;
}

export const Track = ({
    // eslint-disable-next-line react/prop-types
    source,
    // eslint-disable-next-line react/prop-types
    target,
    // eslint-disable-next-line react/prop-types
    getTrackProps,
    disabled = false,
}: TrackProps) => {
    return (
        <div
            style={{
                position: 'absolute',
                transform: 'translate(0%, -50%)',
                height: 14,
                zIndex: 1,
                backgroundColor: disabled ? '#999' : '#607E9E',
                borderRadius: 7,
                cursor: 'pointer',
                // eslint-disable-next-line react/prop-types
                left: `${source.percent}%`,
                // eslint-disable-next-line react/prop-types
                width: `${target.percent - source.percent}%`,
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getTrackProps()}
        />
    );
};
Track.propTypes = {
    disabled: PropTypes.bool,
};

Track.defaultProps = {
    disabled: false,
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
    tick: SliderItem;
    count: number;
    format?: (val: number) => string;
}

export const Tick = ({
    // eslint-disable-next-line react/prop-types
    tick,
    count,
    // TODO: what is this even for?
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format = (num) => num.toString(),
}: TickProps) => {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    marginTop: -20,
                    width: 1,
                    height: 40,
                    backgroundColor: 'rgb(200,200,200)',
                    // eslint-disable-next-line react/prop-types
                    left: `${tick.percent}%`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    marginTop: 22,
                    fontSize: 10,
                    textAlign: 'center',
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    // eslint-disable-next-line react/prop-types
                    left: `${tick.percent}%`,
                }}
            />
        </div>
    );
};
Tick.propTypes = {
    count: PropTypes.number.isRequired,
    format: PropTypes.func,
};

Tick.defaultProps = {
    format: undefined,
};
