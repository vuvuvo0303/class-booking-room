export function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function areDatesEqual(date1: Date, date2: Date) {
    const normalizeDate = (date: Date) => date.setHours(0, 0, 0, 0);
    return normalizeDate(date1) == normalizeDate(date2);
}

export function isDateNotInPast(date: Date) {
    const currentDate = new Date();
    return date.getTime() >= currentDate.getTime();
}