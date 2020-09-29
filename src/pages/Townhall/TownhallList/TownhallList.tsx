import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import List from 'domains/Townhall/TownhallList';
import Fab from 'components/Fab';
import history from 'utils/history';

interface Props {
    currentUser?: boolean;
}

export default function TownhallList({ currentUser }: Props) {
    return (
        <div>
            <List
                currentUser={currentUser}
                onClickTownhall={(id) => history.push(`/user/townhalls/${id}`)}
            />
            <Fab onClick={() => history.push('/user/townhalls/create')}>
                <AddIcon />
            </Fab>
        </div>
    );
}

TownhallList.defaultProps = {
    currentUser: false,
};
