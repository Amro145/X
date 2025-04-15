
export const timeSince = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const seconds = Math.floor((now - createdAt) / 1000);

    if (seconds < 60) return `since ${seconds} seconed`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `since ${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `since ${hours} hour`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `since ${days} days`;
    const months = Math.floor(days / 30);
    if (months < 12) return `since ${months} month`;
    const years = Math.floor(months / 12);
    return `since ${years} سنة`;
}
