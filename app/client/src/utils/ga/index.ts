// log the pageview with their URL
declare const window: any;
export const pageview = (url: URL, title: string) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
        page_title: title,
    });
};
type questionSubmission = {
    action: string;
    category: string;
    label: string;
    value: string;
};
// log specific events happening.
export const event = ({ action, category, label, value }: questionSubmission) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
    });
};