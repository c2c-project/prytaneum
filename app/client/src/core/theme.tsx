import { createTheme, Theme } from '@mui/material/styles';
// TODO: implement user prefers schema for dark or light mode

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        custom: {
            creamCan: string;
            lightBlue: string;
            danger: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            creamCan?: string;
            lightBlue?: string;
            danger?: string;
        };
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            borderRadius: string;
            maxHW: {
                height: string;
                width: string;
            };
            media: {
                minHeight: string;
            };
            clipPath: {
                slope: string;
            };
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        custom: {
            borderRadius: string;
            maxHW: {
                height: string;
                width: string;
            };
            media: {
                minHeight: string;
            };
            clipPath: {
                slope: string;
            };
        };
    }
}

const easingFunc = 'cubic-bezier(0.4, 0, 0.2, 1)';

const base = createTheme({
    typography: {
        // eslint-disable-next-line quotes
        fontFamily: "'Manrope', sans-serif",
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            lineHeight: '1.75em',
            fontWeight: 600,
        },
    },
    custom: {
        borderRadius: '18px',
        maxHW: {
            height: '100%',
            width: '100%',
        },
        media: {
            minHeight: '300px',
        },
        clipPath: {
            slope: 'polygon(0 0, 100% 0%, 100% 84%, 0% 100%)',
        },
    },
    transitions: {
        easing: {
            easeIn: easingFunc,
            easeInOut: easingFunc,
            easeOut: easingFunc,
            sharp: easingFunc,
        },
    },
    shape: {
        borderRadius: 18,
    },
    components: {
        MuiInputBase: {
            defaultProps: {
                fullWidth: true,
                autoComplete: 'off',
                autoCorrect: 'off',
                autoCapitalize: 'none',
            },
        },
        MuiTextField: {
            defaultProps: {
                // For some reason, this property is not inherited from MuiInputBase
                fullWidth: true,
                variant: 'outlined',
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
    palette: {
        background: {
            default: '#f3f1ee',
        },
        custom: {
            creamCan: '#f5c64f',
            lightBlue: '#8eafff',
            danger: '#ff0000',
        },
    },
});

export interface TThemes {
    light: Theme;
    dark: Theme;
}

export const themes: TThemes = {
    dark: createTheme({
        ...base,
        palette: {
            ...base.palette,
            primary: { main: '#4056a1' },
            secondary: { main: '#f13c20' },
        },
    }),
    light: createTheme({
        ...base,
        palette: {
            ...base.palette,
            primary: { main: '#f3f1ee' },
            // primary: { main: '#fef7ec' },
            secondary: { main: '#171818' },
        },
    }),
};
