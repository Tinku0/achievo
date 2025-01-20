const calculateNextDueDate = (currentDueDate, recurrenceType) => {
    const currentDate = new Date(currentDueDate);
    let nextDueDate;

    switch (recurrenceType.toLowerCase()) {
        case 'daily':
            nextDueDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
            break;
        case 'weekly':
            nextDueDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
            break;
        case 'monthly':
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
            break;
        default:
            throw new Error('Invalid recurrence type');
    }

    return nextDueDate.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

module.exports = calculateNextDueDate;