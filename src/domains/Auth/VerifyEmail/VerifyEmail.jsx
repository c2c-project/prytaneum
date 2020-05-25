import React from 'react';
import PropTypes from 'prop-types';

import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import Loader from 'components/Loader';

import API from '../api';

export default function VerifyEmail({ onSuccess, onFailure, userId }) {
    const _request = React.useCallback(() => API.verifyEmail(userId), [userId]);
    const [snack] = useSnack();
    const [request] = useEndpoint(_request, {
        onSuccess: () => {
            snack('Successfully validated your email', 'success');
            onSuccess();
        },
        onFailure,
    });

    React.useEffect(() => {
        request(userId);
    }, []);

    return <Loader />;
}

VerifyEmail.defaultProps = {
    onFailure: null,
};

VerifyEmail.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
    userId: PropTypes.string.isRequired,
};
