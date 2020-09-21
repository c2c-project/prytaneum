import React, { useState } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './component';

const sliderStyle = {
    position: 'relative' as const,
    width: '100%',
    touchAction: 'none',
};

export interface DataEntry {
    label: string;
    value: number;
}

interface Props {
    currentVal: number;
    timeline: DataEntry[];
}

export default function Progress({ currentVal, timeline }: Props) {
    const maxValue = timeline[timeline.length - 1].value;
    const minValue = timeline[0].value;
    const domain = [minValue, maxValue];
    const defaultValues = [currentVal];
    const [values] = useState(defaultValues.slice());

    return (
        <div style={{ height: 120, width: '100%' }}>
            <p>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Current Label:{' '}
                {timeline.filter((el) => el.value === currentVal)[0].label}
            </p>
            <Slider
                mode={1}
                step={1}
                disabled
                domain={domain}
                rootStyle={sliderStyle}
                values={values}
            >
                <Rail>
                    {({ getRailProps }) => (
                        <SliderRail getRailProps={getRailProps} />
                    )}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className='slider-handles'>
                            {handles.map((handle) => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={domain}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div className='slider-tracks'>
                            {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <Ticks count={timeline.length - 1}>
                    {({ ticks }) => (
                        <div className='slider-ticks'>
                            {ticks.map((tick) => (
                                <Tick
                                    key={tick.id}
                                    tick={tick}
                                    count={ticks.length}
                                />
                            ))}
                        </div>
                    )}
                </Ticks>
            </Slider>
        </div>
    );
}
