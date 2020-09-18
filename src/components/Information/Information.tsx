import React from 'react';

/**
 * Template/config for displaying Information/AboutUs section on user settings page
 * contains dialogs for Feedback, AboutUs, PrivacyPolicy, and Terms of Service
 * @category Component
 * @constructor Information
 */

export default function Information() {
    return {
        title: 'Information',
        dialogData: [
            {
                text: 'Feedback',
                component: <span> hows our driving </span>,
            },
            {
                text: 'About Us',
                component: (
                    <span>
                        <h1>this was made somehow by some people</h1>
                    </span>
                ),
            },
            {
                text: 'Privacy Policy',
                component: (
                    <span>
                        <h1>Information is important.</h1>
                    </span>
                ),
            },
            {
                text: 'TOS',
                component: <span>plz no hurt us we no hurt u</span>,
            },
        ],
    };
}
