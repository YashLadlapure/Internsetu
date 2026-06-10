

export const timeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const divisions = [
        { amount: 60, name: 'second' },
        { amount: 60, name: 'minute' },
        { amount: 24, name: 'hour' },
        { amount: 7, name: 'day' },
        { amount: 4.34524, name: 'week' },
        { amount: 12, name: 'month' },
        { amount: Number.POSITIVE_INFINITY, name: 'year' } 
    ]


    let duration = seconds;

    for (let i = 0; i < divisions.length; i++) {
        if (duration < divisions[i].amount) {
            const rounded = Math.floor(duration);
            return `${rounded} ${divisions[i].name}${rounded !== 1 ? 's' : ''} ago`;
        }
        duration /= divisions[i].amount;
    }

}