import React from 'react';
import PropTypes from 'prop-types';
import PasswordReset from './PasswordReset';
import PasswordUpdate from './PasswordUpdate';

const variants = {
    update: PasswordUpdate,
    reset: PasswordReset,
};
export default function Password({ variant }) {
    const Variant = variants[variant];

    return <Variant />;
}

Password.propTypes = {
    variant: PropTypes.oneOf(['update', 'reset']).isRequired,
};
