export function formatDate(date: Date | number | string, formatString = 'MM/dd/yyyy hh:mm a'): string {
    let _date = date;
    if (typeof _date === 'string') _date = new Date(_date);
    if (_date instanceof Date && isNaN(_date.getTime())) {
        return 'Invalid Date';
    }

    // Convert common format strings to Intl.DateTimeFormat options
    const options: Intl.DateTimeFormatOptions = {};

    if (formatString.includes('MM/dd/yyyy')) {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
    }

    if (formatString.includes('hh:mm')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    if (formatString.includes('a')) {
        options.hour12 = true;
    }

    // Use Intl.DateTimeFormat for consistent formatting across browsers
    return new Intl.DateTimeFormat('en-US', options).format(_date as Date);
}

interface DistanceOptions {
    includeSeconds: boolean;
    addSuffix: boolean;
    // this has a locale option too for other languages, but omitting for now
}

export function formatDistanceToNow(
    date: Date | number | string,
    options: DistanceOptions = { includeSeconds: true, addSuffix: true }
): string {
    let _date = date;
    if (typeof _date === 'string') _date = new Date(_date);
    if (_date instanceof Date && isNaN(_date.getTime())) {
        return 'Invalid Date';
    }

    const now = new Date();
    const diffMs = now.getTime() - (_date as Date).getTime();
    const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    let result = '';
    const isPast = diffMs > 0;
    const suffix = options.addSuffix ? (isPast ? ' ago' : ' from now') : '';

    if (options.includeSeconds && diffSeconds < 60) {
        result = diffSeconds === 1 ? '1 second' : `${diffSeconds} seconds`;
    } else if (diffMinutes < 60) {
        result = diffMinutes === 1 ? '1 minute' : `${diffMinutes} minutes`;
    } else if (diffHours < 24) {
        result = diffHours === 1 ? '1 hour' : `${diffHours} hours`;
    } else if (diffDays < 7) {
        result = diffDays === 1 ? '1 day' : `${diffDays} days`;
    } else if (diffWeeks < 4) {
        result = diffWeeks === 1 ? '1 week' : `${diffWeeks} weeks`;
    } else if (diffMonths < 12) {
        result = diffMonths === 1 ? '1 month' : `${diffMonths} months`;
    } else {
        result = diffYears === 1 ? '1 year' : `${diffYears} years`;
    }

    return result + suffix;
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
