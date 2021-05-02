import type { TownhallSettings } from 'prytaneum-typings';
import { makeStyles } from '@material-ui/core/styles';

export const areEqual = <
    U extends keyof TownhallSettings,
    T extends { value: TownhallSettings[U] }
>(
    { value: prevValue }: T,
    { value: nextValue }: T
) => JSON.stringify(prevValue) === JSON.stringify(nextValue);

export interface Props<T extends keyof TownhallSettings> {
    onChange: (change: TownhallSettings[T]) => void;
    value: TownhallSettings[T];
    className?: string;
}

export const useStyles = makeStyles(() => ({
    fullWidth: {
        width: '100%',
    },
}));
