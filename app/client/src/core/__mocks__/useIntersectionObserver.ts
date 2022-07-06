export default function (
    onIntersect: IntersectionObserverCallback,
    options?: IntersectionObserverInit
): IntersectionObserver {
    return {
        disconnect: jest.fn(),
        observe: jest.fn(),
        root: null,
        rootMargin: options?.rootMargin || '',
        thresholds: [0],
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
    };
}
