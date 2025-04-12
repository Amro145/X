
export const timeSince = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const seconds = Math.floor((now - createdAt) / 1000);

    if (seconds < 60) return `منذ ${seconds} ثانية`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `منذ ${days} يوم`;
    const months = Math.floor(days / 30);
    if (months < 12) return `منذ ${months} شهر`;
    const years = Math.floor(months / 12);
    return `منذ ${years} سنة`;
}
