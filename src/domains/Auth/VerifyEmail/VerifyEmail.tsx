import React from 'react';
import PropTypes from 'prop-types';

import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import Loader from 'components/Loader';

import API from '../api';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    userId: string;
}

export default function VerifyEmail({ onSuccess, onFailure, userId }: Props) {
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
        request();
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
