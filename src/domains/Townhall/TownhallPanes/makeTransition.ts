export default (idx: number) => ({
    delay: (idx + 1) * 0.1,
    type: 'spring',
    damping: 12,
    stiffness: 150,
});
