export function formatDateToString(date) {
    return new Date(date).toISOString().substr(0, 10).split('-').reverse().join('/');
}