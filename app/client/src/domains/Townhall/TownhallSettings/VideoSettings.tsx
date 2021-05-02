import * as React from 'react';

import SettingsList from '@local/components/SettingsList';
import EditableText from '@local/components/EditableText';

import { Props, areEqual } from './utils';

export default React.memo(function VideoSettings({ onChange, value: _value }: Props<'video'>) {
    const value = React.useMemo(
        () =>
            _value || {
                url: '',
            },
        [_value]
    );
    function handleChange(key: keyof typeof value) {
        return (newValue: string) => {
            onChange({
                [key]: newValue,
            });
        };
    }

    return (
        <SettingsList>
            <EditableText value={value.url} onChange={handleChange('url')} label='Video URL' />
        </SettingsList>
    );
}, areEqual);
