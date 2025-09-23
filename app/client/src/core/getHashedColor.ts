/* https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j */
import { useEffect } from 'react';

let colorCache = new Map<string, string>();

/**
 * @description Clear the color cache when the component is unmounted
 * Should be used in a parent component if the color cache is used in a child component that is unmounted often
 * like a question card in a virtualized list
 */
export function clearColorCache() {
    colorCache.clear();
}

type HSL = [number, number, number];

export const getHashOfString = (str: string) => {
    const charArray = Array.from(str);
    return charArray.reduce((total, _char, index) => {
        return (total += str.charCodeAt(index) * index);
    }, 0);
};

export const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
};

// Used to ensure that the generated colors are not too dark or too light
const hRange = [0, 360];
const sRange = [65, 75];
const lRange = [45, 65];

export const generateHSL = (name: string): HSL => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
};

export const HSLtoString = (hsl: HSL) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

/**
 * @description Generate a hsl color based on the input string hash
 * @param str input string
 * @returns hsl color string
 * Uses a cache to store the generated colors to avoid regenerating the same color
 */
export function getHashedColor(str: string) {
    if (colorCache.has(str)) {
        return colorCache.get(str) as string;
    } else {
        const hsl = generateHSL(str);
        const hslColorString = HSLtoString(hsl);
        colorCache.set(str, hslColorString);

        return hslColorString;
    }
}

export function getHashedColorGradient(str: string) {
    const startColor = getHashedColor(str);
    const endColor = getHashedColor(str + '%');
    return `linear-gradient(to right bottom, ${startColor}, ${endColor})`;
}

/**
 * @description Hook to clear the color cache when the component is unmounted, should be used on any component that uses getHashedColor
 */
export function useHashedColor() {
    useEffect(() => {
        colorCache = new Map<string, string>();
        return clearColorCache;
    }, []);
}

export const darkenHslColor = (hslString: string, amount = 10) => {
    // Use a regular expression to capture the H, S, and L values.
    const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const match = hslString.match(regex);

    // If the string isn't a valid HSL string, return the original.
    if (!match) {
        return hslString;
    }

    const [, h, s, l] = match;

    // Decrease the lightness, ensuring it doesn't go below 0.
    const newLightness = Math.max(0, parseInt(l, 10) - amount);

    // Rebuild and return the new HSL string.
    return `hsl(${h}, ${s}%, ${newLightness}%)`;
};

export const hslToHex = (hslString: string): string | null => {
    const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const match = hslString.match(regex);

    if (!match) {
        return null;
    }

    let [, h, s, l] = match.map(Number);

    s /= 100;
    l /= 100;

    const c: number = (1 - Math.abs(2 * l - 1)) * s;
    const x: number = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m: number = l - c / 2;

    let r: number = 0,
        g: number = 0,
        b: number = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (_val: number): string => {
        const hex = _val.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getTextColorForBackground = (hslColor: string) => {
    const hexColor = hslToHex(hslColor);
    if (!hexColor) {
        return '#000000'; // Default to black if conversion fails
    }
    // 1. Remove the '#' if it exists
    const color = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;

    // 2. Convert hex to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // 3. Calculate the perceptive luminance (brightness)
    // This formula is based on the W3C accessibility guidelines
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // 4. Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
