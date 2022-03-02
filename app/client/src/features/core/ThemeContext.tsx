import * as React from 'react';
import { ThemeProvider as MUIThemeProvider, Theme } from '@mui/material/styles';

import { themes, TThemes } from './theme';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const ThemeSelector = React.createContext<(() => void)[]>([() => {}]);

export function ThemeProvider({ children }: Props) {
    const [state, setState] = React.useState<keyof TThemes>('dark');
    return (
        <ThemeSelector.Provider value={[() => setState(state === 'light' ? 'dark' : 'light')]}>
            <MUIThemeProvider theme={themes[state]}>{children}</MUIThemeProvider>
        </ThemeSelector.Provider>
    );
}
