import * as React from 'react';
import { Switch } from '@material-ui/core';

import { Event, useUpdateEventMutation } from '@local/graphql-types';
import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';
import { useSnack, useEvent } from '@local/hooks';

const HELPT_TEXT = {
    isQuestionFeedVisible:
        'When turned on, lets Event participants view submitted questions. Useful for increasing user engagement.',
    isCollectRatingsEnabled:
        'When turned on, prompts event participants to rate their experience after the event is over. Useful for collecting feedback.',
    isPrivate: 'When turned on, the event is invite only.  Useful for if you want only want certain users to attend.',
    isForumEnabled:
        // eslint-disable-next-line quotes
        "When turned on, data from the event seeds an online forum.  Useful for coming back and answering questions speaker(s) weren't able to answer during the event.",
};

type Settings = Pick<Event, 'isQuestionFeedVisible' | 'isCollectRatingsEnabled' | 'isForumEnabled' | 'isPrivate'>;

export interface EventSettingsProps {
    className?: string;
}

export const GenericSettings = ({ className }: EventSettingsProps) => {
    const [snack] = useSnack();
    const [event, , setEvent] = useEvent();
    const { isQuestionFeedVisible, isCollectRatingsEnabled, isForumEnabled, isPrivate, eventId } = event;

    const [updateEvent] = useUpdateEventMutation({
        onCompleted(results) {
            if (results.updateEvent) {
                const newEvent = results.updateEvent;
                setEvent((prev) => ({
                    ...prev,
                    isQuestionFeedVisible: Boolean(newEvent.isQuestionFeedVisible),
                    isForumEnabled: Boolean(newEvent.isForumEnabled),
                    isPrivate: Boolean(newEvent.isPrivate),
                    isCollectRatingsEnabled: Boolean(newEvent.isCollectRatingsEnabled),
                }));
            }
        },
        onError() {
            snack('Something went wrong :(');
        },
    });

    function handleChange(key: keyof Settings) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = e.target;
            setEvent((prev) => ({ ...prev, [key]: checked }));
            updateEvent({ variables: { input: { [key]: checked, eventId } } });
        };
    }

    return (
        <SettingsList className={className}>
            <SettingsItem helpText={HELPT_TEXT.isQuestionFeedVisible} name='Question Feed Visibility'>
                <Switch checked={Boolean(isQuestionFeedVisible)} onChange={handleChange('isQuestionFeedVisible')} />
            </SettingsItem>
            <SettingsItem helpText={HELPT_TEXT.isCollectRatingsEnabled} name='Collect User Ratings'>
                <Switch checked={Boolean(isCollectRatingsEnabled)} onChange={handleChange('isCollectRatingsEnabled')} />
            </SettingsItem>
            <SettingsItem helpText={HELPT_TEXT.isForumEnabled} name='Post Event Forum'>
                <Switch checked={Boolean(isForumEnabled)} onChange={handleChange('isForumEnabled')} />
            </SettingsItem>
            <SettingsItem helpText={HELPT_TEXT.isPrivate} name='Private Event'>
                <Switch checked={Boolean(isPrivate)} onChange={handleChange('isPrivate')} />
            </SettingsItem>
        </SettingsList>
    );
};
