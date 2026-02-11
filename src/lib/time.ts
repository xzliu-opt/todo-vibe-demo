/**
 * Format a timestamp into a short clock time (e.g. "10:30 AM").
 */
export function formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(timestamp));
}

/**
 * Format a duration in ms into a readable string.
 * Examples: "< 1m", "5m", "2h 15m", "1d 2h"
 */
export function formatDuration(ms: number): string {
    const totalMinutes = Math.floor(ms / 60_000);
    if (totalMinutes < 1) return "< 1m";

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 && days === 0) parts.push(`${minutes}m`);

    return parts.join(" ") || "< 1m";
}
