import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import List from 'domains/Townhall/TownhallList';
import Fab from 'components/Fab';
import history, { makeRelativeLink } from 'utils/history';

interface Props {
    currentUser?: boolean;
}

export default function TownhallList({ currentUser }: Props) {
    return (
        <div>
            <List
                currentUser={currentUser}
                onClickTownhall={(id) =>
                    history.push(makeRelativeLink(`/${id}`))
                }
            />
            <Fab onClick={() => history.push(makeRelativeLink('/create'))}>
                <AddIcon />
            </Fab>
        </div>
    );
}

TownhallList.defaultProps = {
    currentUser: false,
};
