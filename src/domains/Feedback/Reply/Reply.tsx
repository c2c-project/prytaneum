import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import type { ReportReply } from 'prytaneum-typings';

import { formatDate } from 'utils/format';

interface Props {
    reply: ReportReply;
}

export default function Reply({ reply }: Props) {
    const { first, last } = reply.meta.createdBy.name;
    return (
        <Card style={{ padding: 20 }}>
            <Grid container spacing={5}>
                <Grid item container justify='space-between' alignItems='center' spacing={3}>
                    <Grid item>
                        <Typography id='replied-by' variant='h6'>{`${first} ${last}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography id='replied-on' variant='subtitle1'>
                            {formatDate(new Date(reply.meta.createdAt))}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography id='reply-content' variant='body2' paragraph>
                        {reply.content}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}
