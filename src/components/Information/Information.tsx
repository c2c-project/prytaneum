import React from 'react';

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
