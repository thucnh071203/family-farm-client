const formatTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now - messageDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    // Under 1 day
    if (diffDay < 1) {
        if (diffSec < 60) return `${diffSec} secs ago`;
        if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
        return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
    ) {
        return "Yesterday";
    }

    // Under 1 week
    if (diffDay < 7) {
        return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    }

    // Over 1 week
    return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default formatTime;