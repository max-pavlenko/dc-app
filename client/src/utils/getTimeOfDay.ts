export function getTimeOfDay(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "day";
    if (hour >= 18 && hour < 22) return "evening";
    if (hour >= 22 || hour < 5) return "night";

    return '';
}
