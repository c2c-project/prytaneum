/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';

export function formatDate(date: Date | number, formatString = 'MM/dd/yyyy') {
    return format(date, formatString);
}
