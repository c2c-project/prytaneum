import * as React from 'react';
import { Button, Switch, TextField, Typography } from '@mui/material';
import { graphql, useFragment, useMutation } from 'react-relay';

import type { SimulationEventSettingsFragment$key } from '@local/__generated__/SimulationEventSettingsFragment.graphql';
import type { SimulationEventSettingsMutation } from '@local/__generated__/SimulationEventSettingsMutation.graphql';
import SettingsItem from '@local/components/SettingsItem';
import SettingsList from '@local/components/SettingsList';
import { useSnack } from '@local/core';

const SIMULATION_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment SimulationEventSettingsFragment on Event {
        id
        simulationEnabled
        simulationParticipantCount
        simulationTopic
        simulationBackground
    }
`;

const SIMULATION_EVENT_SETTINGS_MUTATION = graphql`
    mutation SimulationEventSettingsMutation($input: UpdateEvent!) {
        updateEvent(event: $input) {
            isError
            message
            body {
                ...SimulationEventSettingsFragment
            }
        }
    }
`;

type Props = {
    fragmentRef: SimulationEventSettingsFragment$key;
};

export function SimulationEventSettings({ fragmentRef }: Props) {
    const settings = useFragment(SIMULATION_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const { displaySnack } = useSnack();
    const [commit, isSaving] = useMutation<SimulationEventSettingsMutation>(SIMULATION_EVENT_SETTINGS_MUTATION);
    const [enabled, setEnabled] = React.useState(Boolean(settings.simulationEnabled));
    const [participantCount, setParticipantCount] = React.useState(settings.simulationParticipantCount ?? 10);
    const [topic, setTopic] = React.useState(settings.simulationTopic ?? '');
    const [background, setBackground] = React.useState(settings.simulationBackground ?? '');

    const validationMessage = React.useMemo(() => {
        if (!Number.isInteger(participantCount) || participantCount < 1 || participantCount > 20) {
            return 'Number of simulated participants must be between 1 and 20.';
        }
        if (enabled && topic.trim().length === 0) return 'Topic is required when Simulation is enabled.';
        if (enabled && background.trim().length === 0) return 'Background is required when Simulation is enabled.';
        return '';
    }, [background, enabled, participantCount, topic]);

    const save = () => {
        if (validationMessage) {
            displaySnack(validationMessage, { variant: 'error' });
            return;
        }
        commit({
            variables: {
                input: {
                    eventId: settings.id,
                    simulationEnabled: enabled,
                    simulationParticipantCount: participantCount,
                    simulationTopic: topic.trim(),
                    simulationBackground: background.trim(),
                },
            },
            onCompleted(payload) {
                if (payload.updateEvent.isError) {
                    displaySnack(payload.updateEvent.message, { variant: 'error' });
                    return;
                }
                displaySnack('Simulation settings saved.', { variant: 'success' });
            },
            onError() {
                displaySnack('Simulation settings failed to save.', { variant: 'error' });
            },
        });
    };

    return (
        <SettingsList>
            <SettingsItem
                name='Enable Simulation'
                helpText='Allow organizers and moderators to generate simulated responses for eligible surveys.'
            >
                <Switch
                    name='simulation-enabled-switch'
                    checked={enabled}
                    onChange={(event) => setEnabled(event.target.checked)}
                />
            </SettingsItem>
            <SettingsItem name='Number of Simulated Participants' helpText='Choose between 1 and 20 participants.'>
                <TextField
                    name='simulation-participant-count'
                    type='number'
                    value={participantCount}
                    onChange={(event) => setParticipantCount(Number(event.target.value))}
                    inputProps={{ min: 1, max: 20, step: 1 }}
                    error={!Number.isInteger(participantCount) || participantCount < 1 || participantCount > 20}
                    helperText={
                        !Number.isInteger(participantCount) || participantCount < 1 || participantCount > 20
                            ? 'Enter a whole number from 1 to 20.'
                            : undefined
                    }
                    size='small'
                />
            </SettingsItem>
            <SettingsItem name='Topic' helpText='Simulation-specific subject shown to simulated participants.'>
                <TextField
                    name='simulation-topic'
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    required={enabled}
                    error={enabled && topic.trim().length === 0}
                    helperText={enabled && topic.trim().length === 0 ? 'Topic is required.' : undefined}
                    fullWidth
                    sx={{ maxWidth: 500 }}
                />
            </SettingsItem>
            <SettingsItem name='Background' helpText='Additional simulation-specific context for participants.'>
                <TextField
                    name='simulation-background'
                    value={background}
                    onChange={(event) => setBackground(event.target.value)}
                    required={enabled}
                    error={enabled && background.trim().length === 0}
                    helperText={enabled && background.trim().length === 0 ? 'Background is required.' : undefined}
                    multiline
                    minRows={4}
                    fullWidth
                    sx={{ maxWidth: 500 }}
                />
            </SettingsItem>
            <SettingsItem name='Model' helpText='Round 1 simulations use the configured Gemini model.'>
                <Typography>Gemini</Typography>
            </SettingsItem>
            <SettingsItem name='Save Simulation Settings'>
                <Button variant='contained' onClick={save} disabled={isSaving || Boolean(validationMessage)}>
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </SettingsItem>
        </SettingsList>
    );
}
