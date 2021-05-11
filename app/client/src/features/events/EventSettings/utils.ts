import { makeStyles } from '@material-ui/core/styles';

import { Event } from '@local/graphql-types';

export const areEqual = <
    U extends keyof Event,
    T extends { value: Event[U] }
>(
    { value: prevValue }: T,
    { value: nextValue }: T
) => JSON.stringify(prevValue) === JSON.stringify(nextValue);

export interface Props<T extends keyof Event> {
    onChange: (change: Event[T]) => void;
    value: Event[T];
    className?: string;
}

export const useStyles = makeStyles(() => ({
    fullWidth: {
        width: '100%',
    },
}));
