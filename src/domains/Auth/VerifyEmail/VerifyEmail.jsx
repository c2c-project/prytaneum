import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../components/Loader';
import useEndpoint from '../../../hooks/useEndpoint';
import API from '../api';

export default function VerifyEmail({ onSuccess, onFailure, userId }) {
    const _request = React.useCallback(() => API.verifyEmail(userId), [userId]);
    const [request] = useEndpoint(_request, {
        onSuccess,
        onFailure,
    });

    React.useEffect(() => {
        request(userId);
    }, []);

    return <Loader />;
}

VerifyEmail.defaultProps = {
    onFailure: null
}

VerifyEmail.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
    userId: PropTypes.string.isRequired,
};
