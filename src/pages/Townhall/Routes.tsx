import React from 'react';
import { Route } from 'react-router-dom';
import { Fade } from '@material-ui/core';

import TownhallList from './TownhallList';

export default function Townhalls() {
    return (
        <Route path='/townhalls/list'>
            {({ match }) => (
                <Fade in={Boolean(match)}>
                    <div>
                        <TownhallList />
                    </div>
                </Fade>
            )}
        </Route>
    );
}
