export const distinctAccessiblePalette = {
    maroon: '#800000',
    darkGreen: '#004d00',
    navy: '#000080',
    teal: '#008080',
    purple: '#4b0082',
    darkRed: '#8b0000',
    indigo: '#483d8b',
    crimson: '#dc143c',
    steelBlue: '#4682b4',
    olive: '#556b2f',
    royalBlue: '#4169e1',
    saddleBrown: '#8b4513',
    darkSlateGray: '#2f4f4f',
    firebrick: '#b22222',
    midnightBlue: '#191970',
    darkMagenta: '#8b008b',
    forestGreen: '#228b22',
    sienna: '#a0522d',
    darkCyan: '#008b8b',
    darkOrchid: '#9932cc',
};

export const getColorPalette = (): string[] => {
    return Object.values(distinctAccessiblePalette);
};
export const getColorPaletteMap = (): Record<string, string> => {
    return Object.entries(distinctAccessiblePalette).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);
};
export const getColorPaletteKeys = (): string[] => {
    return Object.keys(distinctAccessiblePalette);
};
export const getColorPaletteValues = (): string[] => {
    return Object.values(distinctAccessiblePalette);
};
