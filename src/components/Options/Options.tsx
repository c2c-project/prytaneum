import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';

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
                        <button
                            type='button'
                            onClick={() => {}} 
                        >
                            Notify me about upcoming Townhalls
                        </button>
                    </span>
                ),
            },
            {
                text: 'Appearance',
                component: (
                    <span>
                        Dark mode
                        Color Scheme
                    </span>
                ),
            },
        ],
    };
}
