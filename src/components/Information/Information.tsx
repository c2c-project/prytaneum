import React from 'react';

export default function Information() {
    return {
        title: 'Information',
        dialogData: [
            {
                title: 'Feedback',
                component: <span> hows our driving </span>,
            },
            {
                title: 'About Us',
                component: (
                    <span>
                        <h1>this was made somehow by some people</h1>
                    </span>
                ),
            },
            {
                title: 'Privacy Policy',
                component: (
                    <span>
                        <h1>Information is important.</h1>
                    </span>
                ),
            },
            {
                title: 'TOS',
                component: <span>plz no hurt us we no hurt u</span>,
            },
        ],
    };
}
