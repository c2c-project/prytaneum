/* eslint-disable */ // FIXME:
import React from 'react';
import { Button } from '@material-ui/core';

import useSnack from './useSnack';
import useIsMounted from './useIsMounted';

interface Options {
    fn: () => void;
    onUndo: () => void;
    message: string;
}

export default function useUndo({ fn, onUndo, message }: Options) {
    const [isMounted] = useIsMounted();
    const [snack, close] = useSnack();

    // whether or not the user has clicked undo
    const isStopped = React.useRef(false);

    // whether or not the action has "sent"
    const hasSent = React.useRef(false);

    /**
     * can be triggered in 2 ways
     * 1. user navigating away from the page
     * 2. snack times out
     */
    const triggerFn = React.useCallback(() => {
        if (!isStopped.current && !hasSent.current) {
            hasSent.current = true;
            fn();
        }
    }, [fn]);

    /**
     * displays a snack with an "undo" request
     * TODO: may still need onbeforeunload -- research/ask karan
     */
    const triggerSnack = React.useCallback(() => {
        snack(message, {
            action: React.createElement(
                Button,
                {
                    onClick: () => {
                        if (!isMounted) return;
                        close();
                        onUndo();
                        isStopped.current = true;
                    },
                    variant: 'text',
                    color: 'inherit',
                },
                'Undo'
            ),
            onExited: triggerFn,
        });
    }, [triggerFn, onUndo]);

    // attempt to run the fn on unmount
    // scenario: user clicks an undoable action and immediately navigates away from or closes page
    // as a result, the triggered action should not be something that just changes the state
    // it should be something that performs some sort of external request
    React.useEffect(() => triggerFn, []);

    return triggerSnack;
}
