export function getTimeOfDayKey(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 || hour < 5) return "evening";
    console.log(hour, 'hour');

    return '';
}

export const getTimeFormatter = (options?: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(undefined, options);
