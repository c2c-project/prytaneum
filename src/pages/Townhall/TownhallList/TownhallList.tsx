import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import List from 'domains/Townhall/TownhallList';
import Fab from 'components/Fab';
import history, { makeRelativeLink } from 'utils/history';

export default function TownhallList() {
    return (
        <>
            <List
                onClickTownhall={(id) =>
                    history.push(makeRelativeLink(`/${id}`))
                }
            />
            <Fab onClick={() => history.push(makeRelativeLink('/create'))}>
                <AddIcon />
            </Fab>
        </>
    );
}
