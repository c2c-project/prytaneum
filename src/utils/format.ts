/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';

export function formatDate(
    date: Date | number | string,
    formatString = 'MM/dd/yyyy'
) {
    let _date = date;
    if (typeof _date === 'string') _date = new Date(_date);
    return format(_date, formatString);
}

export function pluralize(count: number, str: string): string {
    return count === 1 ? str : `${str}s`;
}
