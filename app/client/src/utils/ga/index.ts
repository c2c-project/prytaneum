// log the pageview with their URL
declare const window: any;
export const pageview = (url: URL) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url
    });
};
type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};
// log specific events happening.
export const event = ({ action, category, label, value }: GTagEvent) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
    });
};