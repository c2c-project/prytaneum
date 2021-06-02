import * as React from 'react';
import { Switch } from '@material-ui/core';
import { graphql, useFragment, useMutation } from 'react-relay';

import type {
    GenericSettingsFragment$key,
    GenericSettingsFragment,
} from '@local/__generated__/GenericSettingsFragment.graphql';
import type { GenericSettingsMutation } from '@local/__generated__/GenericSettingsMutation.graphql';

import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';
import { useSnack } from '@local/hooks';

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

export interface EventSettingsProps {
    className?: string;
    fragmentRef: GenericSettingsFragment$key;
}

export const GENERIC_SETTINGS_FRAGMENT = graphql`
    fragment GenericSettingsFragment on Event {
        id
        isQuestionFeedVisible
        isCollectRatingsEnabled
        isForumEnabled
        isPrivate
    }
`;

export const GENERIC_SETTINGS_MUTATION = graphql`
    mutation GenericSettingsMutation($input: UpdateEvent!) {
        updateEvent(event: $input) {
            isError
            message
            body {
                ...GenericSettingsFragment
            }
        }
    }
`;

export const GenericSettings = ({ className, fragmentRef }: EventSettingsProps) => {
    const [snack] = useSnack();
    const { isQuestionFeedVisible, isCollectRatingsEnabled, isForumEnabled, isPrivate, id } = useFragment(
        GENERIC_SETTINGS_FRAGMENT,
        fragmentRef
    );

    const [commit] = useMutation<GenericSettingsMutation>(GENERIC_SETTINGS_MUTATION);

    function handleChange(key: keyof GenericSettingsFragment) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = e.target;
            commit({
                variables: { input: { [key]: checked, eventId: id } },
                onError() {
                    snack('Something went wrong :(');
                },
            });
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
