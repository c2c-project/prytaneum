import * as React from 'react';
import { Switch, Collapse } from '@material-ui/core';

import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';

import text from './help-text';
import { Props, areEqual, useStyles } from './utils';

const ChatSettings = ({ onChange, value }: Props<'chat'>) => {
    const classes = useStyles();
    const ref = React.useRef(value);
    const handleChange = (key: keyof typeof value) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (key === 'enabled') {
            if (ref.current.enabled === checked) onChange(ref.current);
            else
                onChange({
                    enabled: checked,
                    automated: checked && value.automated,
                });
        } else onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem helpText={text.breakout.enabled} name='Enabled'>
                <Switch checked={value.enabled} onChange={handleChange('enabled')} />
            </SettingsItem>
            <Collapse in={value.enabled} className={classes.fullWidth}>
                <SettingsItem helpText={text.breakout.automated} name='Automated'>
                    <Switch checked={value.automated} onChange={handleChange('automated')} />
                </SettingsItem>
            </Collapse>
        </SettingsList>
    );
};

export const MemoizedChatSettings = React.memo(ChatSettings, areEqual);
