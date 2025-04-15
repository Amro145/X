
export const timeSince = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const seconds = Math.floor((now - createdAt) / 1000);

    if (seconds < 60) return ` ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return ` ${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return ` ${hours}h`;
    if (hours < 48) return ` yesterday`;
    const days = Math.floor(hours / 24);
    if (days < 30) return ` ${days}d`;
    const months = Math.floor(days / 30);
    if (months < 12) return ` ${months}month`;
    const years = Math.floor(months / 12);
    return ` ${years} سنة`;
}
