import React from 'react';
import PropTypes from 'prop-types';
import useJwt from '../hooks/useJwt';

export default function GateKeep({ permissions, children, local, elseRender }) {
    const [isLoading, setLoading] = React.useState(true);
    const [isAllowed, setAllowed] = React.useState(false);
    const [jwt, decodedJwt] = useJwt();
    React.useEffect(() => {
        if (!local) {
            fetch('/api/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${jwt}`
                },
                body: JSON.stringify(permissions)
            }).then(res => {
                res.json().then(({ allowed }) => {
                    setLoading(false);
                    setAllowed(allowed);
                });
            });
        } else {
            // only implementing requiredAny b/c that should be sufficient for the UI
            const { requiredAny } = permissions;
            const result = requiredAny.some(permission =>
                decodedJwt.roles.includes(permission)
            );
            setLoading(false);
            setAllowed(result);
        }
    }, [permissions, jwt, local, decodedJwt]);
    return !isLoading && isAllowed ? children : elseRender;
}

GateKeep.defaultProps = {
    local: false,
    elseRender: <></>
};

GateKeep.propTypes = {
    permissions: PropTypes.shape({
        requiredAny: PropTypes.arrayOf(PropTypes.string),
        requiredAll: PropTypes.arrayOf(PropTypes.string),
        requiredNot: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    local: PropTypes.bool,
    elseRender: PropTypes.node
};
