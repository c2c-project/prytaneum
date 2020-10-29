import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Team from 'components/Team';
import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import { Team as TeamType } from 'types';
import { getDevTeams } from './api';

export default function DevTeam() {
    const [devTeam, setDevTeam] = React.useState<TeamType[]>([]);
    const apiRequest = React.useCallback(() => getDevTeams(), []);
    const [snack] = useSnack();
    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: (results) => {
            setDevTeam(results.data.devTeam);
        },
        onFailure: () => snack('Something went wrong, please try again'),
    });
    React.useEffect(sendRequest, [sendRequest]);

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container spacing={4}>
            <Grid container item justify='center' alignItems='center'>
                <Typography variant='h4' align='center'>
                    Lab Research Team
                </Typography>
            </Grid>
            {devTeam.map((subTeam, index) => (
                <Grid item key={index}>
                    <Divider style={{ marginBottom: 30 }} />
                    <Team team={subTeam} />
                </Grid>
            ))}
        </Grid>
    );
}
