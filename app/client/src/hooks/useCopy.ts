import * as React from 'react';
import { useSnack } from './useSnack';

// NOTE: may be use useClipboard in the future, but no use case for read --  only write
export default function useCopy() {
    const [data, setData] = React.useState<string>('');
    const [dummy, forceUpdate] = React.useReducer((x: number) => x + 1, 0);
    const [snack] = useSnack();

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let isMounted = true;

        const write = async () => {
            try {
                await navigator.clipboard.writeText(data);
                if (isMounted) {
                    snack('Copied!');
                }
            } catch (e) {
                if (isMounted) {
                    snack('Unable to copy :(');
                }
            }
        };
        // eslint-disable-next-line no-void
        if (data) void write();

        return () => {
            isMounted = false;
        };
    }, [data, dummy, snack]);
    // NOTE: snack should technically never change as long as the context doesn't, which it won't

    const copy = (str: string) => {
        setData(str);
        /**
         * NOTE: if react sees that the previous str = the new str, then it will
         * optimize away the update and the useEffect will never run, so we must force
         * the useEffect to run every time even if the string is the same
         */
        forceUpdate();
    };

    return [copy];
}
