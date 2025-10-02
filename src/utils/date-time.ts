export function formatDateTime(date: Date) {
    const formatter = new Intl.DateTimeFormat("cs-CZ", {day: "2-digit", month: "2-digit", year: "numeric",});
    return formatter.format(date);
}