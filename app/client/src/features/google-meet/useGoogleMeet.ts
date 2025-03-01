// @ts-nocheck
import React from 'react';
import { useRefetchableFragment } from 'react-relay';
import { graphql } from 'relay-runtime';

import { useGoogleMeetFragment$key } from '@local/__generated__/useGoogleMeetFragment.graphql';
import { useUser } from '../accounts';
import { useSnack } from '@local/core';

export const USE_GOOGLE_MEET_FRAGMENT = graphql`
    fragment useGoogleMeetFragment on Event @refetchable(queryName: "useGoogleMeetRefresh") {
        googleMeetUrl
    }
`;

interface GoogleMeetProps {
    fragmentRef: useGoogleMeetFragment$key;
}

// TODO: Find a way to refresh (so if a google meet is set up while a mod is waiting in the event it would still show up)
export function useGoogleMeet({ fragmentRef }: GoogleMeetProps) {
    const [data] = useRefetchableFragment(USE_GOOGLE_MEET_FRAGMENT, fragmentRef);
    const builder = window.meet();
    const { user } = useUser();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [isCallEnded, setIsCallEnded] = React.useState<boolean>(false);
    const { displaySnack } = useSnack();

    const displayReloadButton = React.useMemo(() => {
        return !isLoading && !isConnected && !isError && isCallEnded;
    }, [isCallEnded, isConnected, isError, isLoading]);

    const buildMeetApp = React.useCallback(() => {
        setIsLoading(true);
        const PARENT_ELEMENT = document.getElementById('google-meet');
        const DIALOG_ELEMENT = document.getElementById('meet-frame-dialog');
        const DOCKED_ELEMENT = document.getElementById('meet-frame-docked');
        const PIP_ELEMENT = document.getElementById('meet-frame-pip');

        try {
            if (!PARENT_ELEMENT) throw new Error('Parent element not found');
            if (!DIALOG_ELEMENT) throw new Error('Dialog element not found');
            if (!DOCKED_ELEMENT) throw new Error('Docked element not found');
            if (!PIP_ELEMENT) throw new Error('Pip element not found');
        } catch (error) {
            console.error(error);
            displaySnack('Error building meet app, please try refreshing the page.', { variant: 'error' });
            return undefined;
        }

        // Configure event handlers
        builder.on('showToast', ({ message }) => {
            console.log('Toast:', message);
            displaySnack(message, { variant: 'info' });
        });
        builder.on('linkClicked', ({ url: _url }) => {
            console.log(_url);
        });
        builder.on('callStarted', () => {
            console.log('callStarted');
            setIsCallEnded(false);
        });
        builder.on('callEnded', () => {
            console.log('callEnded');
            setIsCallEnded(true);
            setIsConnected(false);
        });
        builder.on('error', (error) => {
            console.log('ERROR has occurred');
            console.error(error);
        });

        // Configure builder
        builder.setHideChatWhenDisabled(true);
        builder.setPreferredAnonymousUserName(user ? user.firstName + ' ' + user.lastName : 'Anonymous Participant');
        builder.setHostUrlSharing(true);
        builder.setIgnoreBrowserCompatibilityChecks(true);
        // TODO: Add option to toggle theme (or use site theme to determine)
        builder.setTheme('light');
        // builder.setAuthUser('');
        // builder.setOidcIdToken('');
        // builder.setShowMeetingInfo(false);
        // builder.setEnableEndCallRating(false);
        // TODO: Allow this to be configurable by moderator/organizer
        const enum PresentationSupport {
            UNKNOWN,
            NONE,
            THIS_TAB,
            ANYTHING,
        }
        builder.setPresentationSupport(PresentationSupport.ANYTHING);

        const frameSet = {
            dialog: {
                element: DIALOG_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-dialog',
                },
            },
            docked: {
                element: DOCKED_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-docked',
                },
            },
            pip: {
                element: PIP_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-pip',
                },
            },
        };
        builder.useFrameSet(frameSet);
        builder.useRetryOptions({
            onDialogRequest: () => {
                console.log('Dialog request');
                setIsLoading(true);
            },
            onDialogSuccess: () => {
                console.log('Dialog success');
                setIsConnected(true);
                setIsLoading(false);
            },
            onDialogTimeout: () => {
                console.log('Dialog timeout');
                setIsConnected(false);
                setIsLoading(false);
                setIsError(true);
            },
            onPipSuccess: () => {
                console.log('Pip success');
                setIsConnected(true);
                setIsLoading(false);
            },
            onPipTimeout: () => {
                console.log('Pip timeout');
                setIsConnected(false);
                setIsLoading(false);
                setIsError(true);
            },
            pipRetryIntervalsMs: [2000, 4000, 8000],
        });

        try {
            const app = builder.build({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MEET_API_KEY as string,
                parentElement: PARENT_ELEMENT,
            });
            return app;
        } catch (error) {
            console.error(error);
            displaySnack('Error building meet app, please try refreshing the page.', { variant: 'error' });
        }
    }, [builder, displaySnack, user]);

    const connectToMeeting = React.useCallback(
        (url?: string = data.googleMeetUrl) => {
            const meetApp = buildMeetApp();
            if (!meetApp) return;
            meetApp
                .init()
                .then(() => {
                    console.log('Joining call...');
                    if (!url) throw new Error('Google Meet Url Not Found');
                    meetApp
                        .joinCallFromUrl(url)
                        .then((result) => {
                            if (result === 1) {
                                console.log('Successfully joined call');
                            } else {
                                console.error('Failed to join call');
                                displaySnack('Error joining call', { variant: 'error' });
                                setIsError(true);
                            }
                            setIsLoading(false);
                        })
                        .catch((err) => {
                            console.error(err);
                            displaySnack('Error joining call', { variant: 'error' });
                            setIsError(true);
                            setIsLoading(false);
                        });
                })
                .catch((err) => {
                    console.error(err);
                    setIsError(true);
                    setIsLoading(false);
                    // TODO: Report error
                    displaySnack('Meet app error, try refreshing the page.', { variant: 'error' });
                });
        },
        [buildMeetApp, data.googleMeetUrl, displaySnack]
    );

    return { connectToMeeting, displayReloadButton, isLoading, isConnected, isCallEnded, isError };
}
