import * as React from 'react';
import { Switch } from '@material-ui/core';

import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';

import text from './help-text';
import { Props, areEqual } from './utils';

const QuestionFeedSettings = ({ onChange, value }: Props<'questionQueue'>) => {
    const handleChange = (key: keyof typeof value) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem helpText={text.questionQueue.transparent} name='Transparent'>
                <Switch checked={value.transparent} onChange={handleChange('transparent')} />
            </SettingsItem>
            <SettingsItem name='Automated' helpText={text.questionQueue.automated}>
                <Switch checked={value.automated} onChange={handleChange('automated')} />
            </SettingsItem>
        </SettingsList>
    );
};

export const MemoizedQuestionFeedSettings = React.memo(QuestionFeedSettings, areEqual);
