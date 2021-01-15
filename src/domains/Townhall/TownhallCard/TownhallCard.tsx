import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';

import { formatDate } from 'utils/format';
import useTownhall from 'hooks/useTownhall';

export default function TownhallCard() {
    const [townhall] = useTownhall();
    return (
        <Card>
            <CardHeader
                title={townhall.form.title}
                subheader={townhall.form.topic}
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemText disableTypography>
                                    <Typography variant='overline'>
                                        When
                                    </Typography>
                                    <Typography>
                                        {formatDate(townhall.form.date, 'P p')}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText disableTypography>
                                    <Typography variant='overline'>
                                        Description
                                    </Typography>
                                    <Typography>
                                        {townhall.form.description}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
