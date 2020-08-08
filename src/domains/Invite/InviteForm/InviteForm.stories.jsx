import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';

import FixtureContext, {
    makeSuccessFixture,
    makeFailureFixture,
} from 'contexts/Fixtures';
import { DeviceContext } from 'contexts/Device';

import InviteForm from '.';

export default { title: 'Invite', decorators: [withKnobs] };

export function InviteFormDefault() {
    return (
        <DeviceContext.Provider
            value={select('DeviceType', ['desktop', 'mobile'], 'desktop')}
        >
            <FixtureContext.Provider
                value={select('Response Status', {
                    success: makeSuccessFixture({ response: 'success' }),
                    failure: makeFailureFixture({ response: 'fail' }),
                })}
            >
                <InviteForm />
            </FixtureContext.Provider>
        </DeviceContext.Provider>
    );
}
