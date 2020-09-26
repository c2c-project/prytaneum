import React from 'react';

/**
 * Template/config for displaying Options section on user settings page
 * contains dialogs for Appear anonymous, Notifications, and Appearance
 * @category Component
 * @constructor Options
 */

export default function Options() {
    return {
        title: 'Options',
        dialogData: [
            {
                text: 'Appear Anonymous',
                component: (
                    <span>
                        {/* TODO: dialog text depends on if they are already anonymous */}
                        You will now appear anonymous.
                    </span>
                ),
            },
            {
                text: 'Notifications',
                component: (
                    <span>
                        <button type='button' onClick={() => {}}>
                            Notify me about upcoming Townhalls
                        </button>
                    </span>
                ),
            },
            {
                text: 'Appearance',
                component: <span>Dark mode Color Scheme</span>,
            },
        ],
    };
}
