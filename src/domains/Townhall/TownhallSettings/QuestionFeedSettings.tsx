import React from 'react';
import { Switch } from '@material-ui/core';

import SettingsList from 'components/SettingsList';
import SettingsItem from 'components/SettingsItem';

import text from './help-text';
import { Props, areEqual } from './utils';

export default React.memo(function QuestionFeedSettings({
    onChange,
    value,
}: Props<'questionQueue'>) {
    const handleChange = (key: keyof typeof value) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem
                helpText={text.questionQueue.transparent}
                name='Transparent'
            >
                <Switch
                    checked={value.transparent}
                    onChange={handleChange('transparent')}
                />
            </SettingsItem>
            <SettingsItem
                name='Automated'
                helpText={text.questionQueue.automated}
            >
                <Switch
                    checked={value.automated}
                    onChange={handleChange('automated')}
                />
            </SettingsItem>
        </SettingsList>
    );
},
areEqual);
