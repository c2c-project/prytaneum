/* eslint-disable import/prefer-default-export */
import { format, formatDistanceToNow as formatDistance } from 'date-fns';

export function formatDate(date: Date | number | string, formatString = 'MM/dd/yyyy') {
    let _date = date;
    if (typeof _date === 'string') _date = new Date(_date);
    return format(_date, formatString);
}

interface DistanceOptions {
    includeSeconds: boolean;
    addSuffix: boolean;
    // this has a locale option too for other languages, but omitting for now
}
export function formatDistanceToNow(
    date: Date | number | string,
    options: DistanceOptions = { includeSeconds: true, addSuffix: true }
) {
    let _date = date;
    if (typeof _date === 'string') _date = new Date(_date);
    return formatDistance(_date, options);
}

export function pluralize(count: number, str: string): string {
    return count === 1 ? str : `${str}s`;
}

export function truncateText(text: string, limit: number): string {
    return text
        .split(' ')
        .slice(0, limit - 1)
        .concat(['...'])
        .join(' ');
}
