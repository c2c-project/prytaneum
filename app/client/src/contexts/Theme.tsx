import * as React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

import themes, { Themes } from '@local/theme';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const ThemeSelector = React.createContext<(() => void)[]>([() => {}]);

export default function ThemeProvider({ children }: Props) {
    const [state, setState] = React.useState<keyof Themes>('dark');
    return (
        <ThemeSelector.Provider
            value={[() => setState(state === 'light' ? 'dark' : 'light')]}
        >
            <MUIThemeProvider theme={themes[state]}>
                {children}
            </MUIThemeProvider>
        </ThemeSelector.Provider>
    );
}
