import * as React from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Switch, TextField, Typography } from '@mui/material';
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
        simulationCovariates
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

const COVARIATE_OPTIONS = [
    ['region', 'Region'],
    ['gender', 'Gender'],
    ['age', 'Age'],
    ['education', 'Education'],
    ['race', 'Race'],
    ['uscitizen', 'U.S. citizenship'],
    ['maritalstatus', 'Marital status'],
    ['religion', 'Religion'],
    ['religionattend', 'Religious attendance'],
    ['partyid', 'Political affiliation'],
    ['income', 'Income'],
    ['politics', 'Political views'],
    ['hhsize', 'Household size'],
    ['employstatus', 'Employment status'],
] as const;

export function SimulationEventSettings({ fragmentRef }: Props) {
    const settings = useFragment(SIMULATION_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const { displaySnack } = useSnack();
    const [commit, isSaving] = useMutation<SimulationEventSettingsMutation>(SIMULATION_EVENT_SETTINGS_MUTATION);
    const [enabled, setEnabled] = React.useState(Boolean(settings.simulationEnabled));
    const [participantCount, setParticipantCount] = React.useState(String(settings.simulationParticipantCount ?? 10));
    const [topic, setTopic] = React.useState(settings.simulationTopic ?? '');
    const [background, setBackground] = React.useState(settings.simulationBackground ?? '');
    const [covariates, setCovariates] = React.useState<readonly string[]>(settings.simulationCovariates ?? ['gender']);
    const parsedParticipantCount = participantCount.trim() === '' ? null : Number(participantCount);
    const participantCountIsValid =
        parsedParticipantCount !== null &&
        Number.isInteger(parsedParticipantCount) &&
        parsedParticipantCount >= 1 &&
        parsedParticipantCount <= 20;

    const validationMessage = React.useMemo(() => {
        if (!participantCountIsValid) {
            return 'Number of simulated participants must be between 1 and 20.';
        }
        if (covariates.length === 0) return 'Select at least one persona covariate.';
        if (enabled && topic.trim().length === 0) return 'Topic is required when Simulation is enabled.';
        if (enabled && background.trim().length === 0) return 'Background is required when Simulation is enabled.';
        return '';
    }, [background, covariates.length, enabled, participantCountIsValid, topic]);

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
                    simulationParticipantCount: parsedParticipantCount!,
                    simulationTopic: topic.trim(),
                    simulationBackground: background.trim(),
                    simulationCovariates: [...covariates],
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
                    onChange={(event) => setParticipantCount(event.target.value)}
                    onBlur={() => {
                        if (participantCountIsValid) setParticipantCount(String(parsedParticipantCount));
                    }}
                    inputProps={{ min: 1, max: 20, step: 1 }}
                    error={!participantCountIsValid}
                    helperText={!participantCountIsValid ? 'Enter a whole number from 1 to 20.' : undefined}
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
            <SettingsItem
                name='Persona Covariates'
                helpText='Choose which demographic fields from each fixed simulated persona are included.'
            >
                <div>
                    <FormGroup
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                            columnGap: 3,
                        }}
                    >
                        {COVARIATE_OPTIONS.map(([key, label]) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        name={`simulation-covariate-${key}`}
                                        checked={covariates.includes(key)}
                                        onChange={(event) =>
                                            setCovariates((current) =>
                                                event.target.checked
                                                    ? [...current, key]
                                                    : current.filter((value) => value !== key)
                                            )
                                        }
                                    />
                                }
                                label={label}
                            />
                        ))}
                    </FormGroup>
                    {covariates.length === 0 && (
                        <Typography color='error' variant='caption'>
                            Select at least one persona covariate.
                        </Typography>
                    )}
                </div>
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
