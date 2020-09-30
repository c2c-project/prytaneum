import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core';

import { formatDate } from 'utils/format';
import { TownhallContext } from '../Contexts/Townhall';

export default function WaitingRoom() {
    const { form, settings } = React.useContext(TownhallContext);
    const time = formatDate(form.date, 'p');
    return (
        <Card>
            <CardHeader title='Waiting Room' />
            <CardContent>
                <CardMedia
                    component='img'
                    src={settings.general.speaker.picture}
                />
                <Typography>
                    {`The townhall is scheduled to start at ${time}.`}
                </Typography>
            </CardContent>
        </Card>
    );
}
