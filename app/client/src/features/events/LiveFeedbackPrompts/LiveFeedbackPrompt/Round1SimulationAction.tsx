import * as React from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Button, Tooltip } from '@mui/material';

import { ConfirmationDialog } from '@local/components/ConfirmationDialog';

type Props = {
    hasResponses: boolean;
    configurationError: boolean;
    isRunning: boolean;
    onRun: () => Promise<void>;
};

export function Round1SimulationAction({ hasResponses, configurationError, isRunning, onRun }: Props) {
    const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [hasCompletedRun, setHasCompletedRun] = React.useState(hasResponses);
    const activeRun = React.useRef<Promise<void> | null>(null);

    React.useEffect(() => {
        if (hasResponses) setHasCompletedRun(true);
    }, [hasResponses]);

    const busy = isRunning || isSubmitting;

    const runOnce = React.useCallback(() => {
        if (activeRun.current) return activeRun.current;

        setIsSubmitting(true);
        const run = Promise.resolve()
            .then(onRun)
            .then(() => setHasCompletedRun(true))
            .finally(() => {
                activeRun.current = null;
                setIsSubmitting(false);
            });
        activeRun.current = run;
        return run;
    }, [onRun]);

    const handleAction = () => {
        if (busy || configurationError) return;
        if (hasCompletedRun) {
            setIsConfirmationOpen(true);
            return;
        }
        void runOnce().catch(() => {});
    };

    const handleConfirm = () => {
        if (busy) return;
        void runOnce()
            .catch(() => {})
            .finally(() => setIsConfirmationOpen(false));
    };

    const handleClose = () => {
        if (!busy) setIsConfirmationOpen(false);
    };

    const button = (
        <span>
            <Button
                variant='contained'
                color='secondary'
                startIcon={<SmartToyIcon />}
                onClick={handleAction}
                disabled={busy || configurationError}
            >
                {busy ? 'Running Simulation...' : hasCompletedRun ? 'Run Simulation Again' : 'Run Simulation'}
            </Button>
        </span>
    );

    return (
        <React.Fragment>
            {configurationError ? (
                <Tooltip title='Complete Event Settings → Simulation before running a simulation.'>{button}</Tooltip>
            ) : (
                button
            )}
            <ConfirmationDialog
                title='Run Simulation Again'
                open={isConfirmationOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                isLoading={busy}
                confirmLabel='Run Simulation'
            >
                <React.Fragment>
                    <span>Are you sure you would like to run the simulation again?</span>
                    <span style={{ display: 'block', marginTop: '0.5rem' }}>
                        This will add new simulated responses from unused participants.
                    </span>
                </React.Fragment>
            </ConfirmationDialog>
        </React.Fragment>
    );
}
