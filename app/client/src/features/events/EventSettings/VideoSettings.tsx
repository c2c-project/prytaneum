import * as React from 'react';

import SettingsList from '@local/components/SettingsList';
import EditableText from '@local/components/EditableText';

import { Props, areEqual } from './utils';

export const VideoSettings = ({ onChange, value: _value }: Props<'videos'>) => {
    const value = React.useMemo(
        () =>
            _value || {
                url: '',
            },
        [_value]
    );
    const handleChange = (idx: number) => (newValue: string) => {
        onChange((prev) => {
            const copy = [...prev];
            copy[idx].url = newValue;
            return copy;
        });
    };

    return (
        <SettingsList>
            {_value.map(({ url, lang }, idx) => (
                <EditableText value={url} onChange={handleChange(idx)} label='Video URL' />
            ))}
        </SettingsList>
    );
};

export const MemoizedVideoSettings = React.memo(VideoSettings, areEqual);
