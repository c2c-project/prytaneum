/* eslint-disable react/require-default-props */
import * as React from 'react';

import history from '@local/utils/history';

interface Props {
    href: string;
    replace?: boolean;
}

export default function Redirect({ href, replace }: Props) {
    React.useEffect(() => {
        if (replace) {
            history.replace(href);
        } else {
            history.push(href);
        }
    }, [href, replace]);
    return <div />;
}
