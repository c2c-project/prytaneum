import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Stats from '../../../components/Stats';


// TODO: contact joseph about this component?
export default function SessionData() {
    const location = useLocation();

    return (
        <Grid container justify-center>
            <Stats
                sessionId={location.state.sessionId}
                sent={location.state.sent}
                asked={location.state.asked}
                unanswered={location.state.unanswered}
                duration={location.state.duration}
                speaker={location.state.speaker}
            />
        </Grid>
    );
}

// SessionData.propTypes = {
//     sessionId: PropTypes.string.isRequired,
//     sent: PropTypes.string.isRequired,
//     asked: PropTypes.string.isRequired,
//     unanswered: PropTypes.string.isRequired,
//     duration: PropTypes.string.isRequired,
//     speaker: PropTypes.string.isRequired,
// };
