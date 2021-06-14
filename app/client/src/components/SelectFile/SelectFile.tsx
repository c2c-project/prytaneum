import * as React from 'react';
import PropTypes from 'prop-types';

import UploadField from '@local/components/UploadField';

interface Props {
    initialState: File;
    onComplete: (f: File) => void;
}

export default function SelectFile({ initialState, onComplete }: Props) {
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
        onComplete(state);
    }, [state, onComplete]);
    return <UploadField onChange={setState} fileName={state.name} />;
}

SelectFile.defaultProps = {
    initialState: {
        name: '',
    },
} as Partial<Props>;

SelectFile.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    intialState: PropTypes.object,
    onComplete: PropTypes.func.isRequired,
};
